from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Anthropic API Key
ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY', '')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============== MODELS ==============

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

class FeedbackInput(BaseModel):
    session_id: str
    message_id: str
    helpful: bool
    needs_more_info: Optional[bool] = False


# ============== WSSC KNOWLEDGE BASE ==============

WSSC_KNOWLEDGE_BASE = {
    "organization": {
        "name": "Washington Suburban Sanitary Commission (WSSC Water)",
        "service_area": "Montgomery County and Prince George's County, Maryland",
        "customers_served": "1.8-1.9 million residents and businesses",
        "years_in_operation": "107+ years (founded 1918)",
        "main_address": "14501 Sweitzer Lane, Laurel, Maryland 20707"
    },
    
    "contact_info": {
        "customer_service": {
            "phone": "301-206-4001",
            "email": "customerservice@wsscwater.com",
            "hours": "Monday-Friday, 8:00 AM - 6:00 PM",
            "toll_free": "800-828-6439",
            "tty": "301-206-8345"
        },
        "emergency_24_7": {
            "phone": "301-206-4002",
            "purpose": "Water main breaks, sewer emergencies, outages"
        },
        "one_stop_shop": {
            "hours": "Monday-Friday, 8:00 AM - 5:00 PM",
            "location": "14501 Sweitzer Lane, Laurel, MD 20707"
        },
        "permit_services": {
            "phone": "301-206-4003",
            "hours": "Monday-Friday, 7:00 AM - 4:00 PM (except Wednesdays: 7:00 AM - 12:00 PM)"
        }
    },
    
    "billing": {
        "cycle": "Quarterly (4 times per year) for residential",
        "measurement": "1,000-gallon increments",
        "average_consumption": "~70 gallons per person per day",
        "typical_quarterly_bill": "$150-250 (varies by usage)",
        "water_component": "~40% of total",
        "sewer_component": "~60% of total (treatment is more expensive)",
        "late_payment_fee": "5% of unpaid balance",
        "flat_rate_sewer": "$166.00 per quarter (if applicable)"
    },
    
    "payment_options": [
        {"method": "Online", "url": "wsscwater.com/paymybill", "details": "Credit card (Visa, MasterCard, Discover), electronic check"},
        {"method": "Phone", "number": "301-206-4001", "details": "Credit card, check by phone"},
        {"method": "Mobile App", "name": "WSSC Water mobile app", "details": "Bill pay, service requests, emergency reporting"},
        {"method": "Mail", "payable_to": "WSSC Water", "address": "14501 Sweitzer Lane, Laurel, MD 20707"},
        {"method": "In Person", "location": "One Stop Shop, 14501 Sweitzer Lane, Laurel, MD", "hours": "Monday-Friday, 8:00 AM - 5:00 PM"},
        {"method": "Drive-Thru", "location": "One Stop Shop location"},
        {"method": "Automatic Payment", "details": "Bank draft - automatic withdrawal from checking/savings"},
        {"method": "Western Union Quick Collect", "details": "Posted within 1 hour if paid before 4:30 PM"}
    ],
    
    "assistance_programs": {
        "cap": {
            "name": "Customer Assistance Program (CAP)",
            "eligibility": "Must apply through Maryland Office of Home Energy Programs (OHEP)",
            "income_limits_fy26": {
                "1_person": "$31,296/year",
                "2_people": "$42,300/year",
                "3_people": "$53,292/year",
                "4_people": "$64,296/year",
                "5_people": "$75,300/year",
                "6_people": "$86,292/year",
                "7_people": "$97,296/year",
                "8_people": "$108,300/year",
                "additional": "Add $11,004 per person over 8"
            },
            "benefits": [
                "Ready-to-Serve charges waived",
                "Bay Restoration fee exemption",
                "Only charged for water/sewer usage",
                "Payment plans up to 48 months",
                "Late fees permanently waived",
                "Free annual plumbing leak investigation",
                "Leak repairs up to $9,000 for homeowners",
                "High-bill adjustment: 100% of excess water/sewer removed for up to 2 billing cycles in any 3-year period"
            ],
            "how_to_apply": [
                "Apply for energy assistance through OHEP",
                "Visit dhs.maryland.gov and click Home Energy/Water icon",
                "Call 1-800-332-6347 for paper application",
                "Check status: myohepstatus.org",
                "If OHEP-approved, automatically qualify for CAP"
            ],
            "website": "wsscwater.com/CAP"
        },
        "get_current": {
            "name": "Get Current (Temporary Amnesty Program)",
            "status": "Extended through January 31, 2026",
            "eligibility": [
                "Delinquent balance as of October 1, 2025",
                "Household income below 150% of area median income, OR",
                "Self-certified financial hardship due to recent federal government actions"
            ],
            "option_1": "Pay 50% of full account balance, remaining 50% forgiven. All late fees and turn-on fees waived.",
            "option_2": "Pay 25% of full account balance, 25% forgiven.",
            "benefits": [
                "Balance forgiven within 24 hours of payment",
                "100% of late payment charges waived",
                "100% of turn-on fees waived"
            ],
            "website": "wsscwater.com/getcurrent"
        },
        "emergency_relief": {
            "name": "Emergency Customer Relief Fund",
            "partner": "United Way of the National Capital Area",
            "amount": "One-time assistance up to $750",
            "eligibility": "Customers struggling with past-due bills",
            "remaining_funds": "~$1.7 million of $2.4 million available (as of Jan 2026)",
            "basis": "First-come, first-served"
        },
        "payment_plans": {
            "standard": "Up to 24 months",
            "cap_customers": "Up to 48 months"
        },
        "county_partners": {
            "montgomery_salvation_army": "301-515-5354",
            "prince_georges_salvation_army": "301-277-6103"
        }
    },
    
    "billing_adjustments": {
        "high_bill": {
            "eligibility": "Bill shows Average Daily Consumption (ADC) at least 3x comparable or current ADC",
            "benefit": "WSSC adjusts one high bill, excluding 50% of excess water/sewer charges",
            "limitation": "One-time only, for one billing period"
        },
        "underground_leak": {
            "eligibility": [
                "WSSC verifies underground leak caused high usage",
                "Leak repaired by WSSC-registered master plumber",
                "Repair documented with receipt",
                "Usage returned to normal"
            ],
            "benefit": "Adjusted bill excludes up to 6 months of excess water/sewer charges",
            "timeline": "Repair must be completed within 30 days for water charge adjustment"
        },
        "cap_leak_adjustment": {
            "benefit": "100% of excess water/sewer usage removed for up to 2 billing cycles in any 3-year period"
        }
    },
    
    "emergencies": {
        "water_examples": ["Water main breaks", "No water service", "Very low water pressure", "Water leaks affecting public areas"],
        "sewer_examples": ["Sewage backups", "Sanitary sewer overflows", "Manhole issues"],
        "contact": "301-206-4002 (24/7)",
        "response_time": "Field crews dispatched, estimated response within 30 minutes for main breaks"
    },
    
    "water_quality": {
        "safety_record": "107+ years without a drinking water quality violation",
        "compliance": "Meets all EPA federal drinking water standards",
        "taste_odor_cause": "Geosmin from algae in Potomac River source water",
        "taste_odor_safety": "Water remains safe despite taste/odor changes",
        "customer_action": "Run cold water, use pitcher in refrigerator"
    },
    
    "leak_detection": {
        "common_sources": ["Toilets (most common residential leak)", "Faucets", "Irrigation systems", "Underground service lines"],
        "detection_steps": [
            "Take multiple meter readings when no water is being used",
            "Check for meter movement",
            "Inspect for wet areas, unexplained puddles"
        ],
        "toilet_test": "Add food coloring to tank. Wait 15 minutes without flushing. If color appears in bowl, you have a leak.",
        "meter_test": "Turn off all water in home. Check meter. Wait 15 minutes. Check again. If meter moved, you have a leak.",
        "repair_requirements": {
            "who_can_repair": "WSSC-registered master plumber",
            "permit_required": "Yes, obtained from WSSC",
            "inspection_required": "WSSC Regulatory Services must inspect and approve"
        }
    },
    
    "permits": {
        "contact": "301-206-4003",
        "portal": "wsscwater.com/epermitting",
        "common_permits": [
            "Water Service Application (WS-200)",
            "Backflow Prevention Device",
            "Fire Suppression Approval",
            "Sewer Capacity Study",
            "Corporation Approval",
            "Plumbing permits for service line work"
        ],
        "example_project": {
            "type": "3-story, 24-unit apartment",
            "total_fees": "~$8,500",
            "timeline": "6-8 weeks"
        }
    },
    
    "online_services": {
        "customer_portal": "my.wsscwater.com",
        "registration": "my.wsscwater.com/selfcare/views/public/profile/register-step1.faces",
        "mobile_app": "WSSC Water",
        "main_website": "wsscwater.com",
        "key_pages": {
            "bill_payment": "/paymybill",
            "assistance": "/assistance",
            "get_current": "/getcurrent",
            "service": "/service",
            "customer_service": "/customerservice",
            "read_bill": "/readbill",
            "rates": "/rates",
            "cap": "/CAP",
            "epermitting": "/epermitting"
        }
    },
    
    "faqs": [
        {
            "question": "Why is my bill so high?",
            "causes": ["Leaks (especially toilets)", "Increased usage (seasonal, guests)", "Irrigation/outdoor water use", "Estimated meter reads"],
            "resolution": ["Check meter reads and compare to history", "Conduct leak check", "Review usage patterns", "Request billing adjustment if eligible", "Contact Customer Service: 301-206-4001"]
        },
        {
            "question": "Can I get help paying my bill?",
            "programs": ["Customer Assistance Program (CAP)", "Get Current amnesty", "Emergency Relief Fund ($750)", "Payment plans (24-48 months)", "County partner assistance (Salvation Army)"],
            "contact": "301-206-4001 or wsscwater.com/assistance"
        },
        {
            "question": "How do I report a water main break?",
            "answer": "Call 24/7 Emergency Services at 301-206-4002, use WSSC Water mobile app, or email Emergency Services Center. Crews typically dispatched within 30 minutes."
        },
        {
            "question": "How do I start or stop service?",
            "answer": "Use online forms at wsscwater.com/service or call Customer Service at 301-206-4001. Provide property address, move date, and owner/tenant status."
        },
        {
            "question": "Is my water safe to drink if it tastes or smells different?",
            "answer": "Yes. WSSC Water meets all EPA standards and has 107+ years without a quality violation. Taste/odor changes are often due to natural algae (Geosmin) in source water. Water remains safe."
        }
    ],
    
    "statistics": {
        "call_deflection_targets": {
            "billing_inquiries": "30-40% of total call volume",
            "payment_questions": "15-20% of calls",
            "leak_high_usage": "10-15% of calls",
            "start_stop_service": "8-10% of calls",
            "water_quality": "5-8% of calls",
            "emergencies": "5-7% of calls (must route to 24/7 line)"
        },
        "cap_benefits": "Up to $112/year in fee waivers, plus usage-based savings",
        "emergency_response_time": "30 minutes for water main breaks",
        "permit_timeline": "6-8 weeks for standard commercial project"
    },
    
    "last_updated": "February 1, 2026",
    "prepared_for": "Encore Services LLC - WSSC Water AI Demo Project"
}


# ============== AI SYSTEM MESSAGE WITH KNOWLEDGE BASE REFERENCE ==============

WSSC_SYSTEM_MESSAGE = """You are the WSSC Water AI Assistant - a FRIENDLY, knowledgeable customer service representative for WSSC Water, serving 1.8 million Maryland customers.

🎯 YOUR MISSION: Help customers quickly with ACCURATE information so they DON'T need to call. Be their friend!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 YOUR KNOWLEDGE BASE (ALWAYS REFERENCE THIS!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You have access to the official WSSC Water knowledge base stored in our database. This includes:
- Organization details (107+ years serving Maryland)
- All contact information (Customer Service: 301-206-4001, Emergency: 301-206-4002)
- Billing info (quarterly bills, $150-250 typical, 70 gal/person/day average)
- ALL payment options (8 different ways to pay!)
- Financial assistance programs (CAP, Get Current, Emergency Relief)
- Billing adjustments and dispute resolution
- Emergency procedures
- Water quality information (107+ years no violations!)
- Leak detection steps
- Permit information
- FAQs and response templates

**CRITICAL: ALWAYS USE EXACT DATA FROM THE KNOWLEDGE BASE!**
- Use EXACT phone numbers (301-206-4001, 301-206-4002, etc.)
- Use EXACT program names and eligibility criteria
- Use EXACT fees, rates, and income limits
- Use EXACT hours of operation
- Use EXACT website URLs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 MOBILE-FIRST RESPONSE RULES (CRITICAL!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **BE FRIENDLY & WARM** - Start with a greeting like "Hi there! 😊"
2. **KEEP IT SHORT** - Max 3-4 short paragraphs per response
3. **BREAK IT UP** - Use line breaks, bullets, and spacing
4. **NO WALLS OF TEXT** - If answer is long, chunk it into digestible pieces
5. **SCANNABLE** - Use emojis as visual markers (💧📊💰🔧📞)
6. **ACTION-ORIENTED** - Tell them exactly what to do, step by step

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 KEY CONTACT INFO (MEMORIZE & USE EXACTLY!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• **Customer Service:** 301-206-4001 (Mon-Fri, 8am-6pm)
• **24/7 Emergency:** 301-206-4002 (water main breaks, sewer emergencies)
• **Toll-Free:** 800-828-6439
• **Permit Services:** 301-206-4003
• **Website:** wsscwater.com
• **Customer Portal:** my.wsscwater.com
• **Mobile App:** WSSC Water app
• **Address:** 14501 Sweitzer Lane, Laurel, MD 20707

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 FINANCIAL ASSISTANCE (KNOW THESE PROGRAMS!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**1. CAP (Customer Assistance Program):**
• Apply through OHEP (Maryland energy assistance)
• Income limits: 1 person = $31,296/year, 4 people = $64,296/year
• Benefits: Fees waived, 48-month payment plans, late fees waived, up to $9,000 leak repair
• Website: wsscwater.com/CAP

**2. Get Current (Amnesty - through Jan 31, 2026):**
• Pay 50% → other 50% forgiven!
• Or pay 25% → 25% forgiven
• All late fees waived
• Website: wsscwater.com/getcurrent

**3. Emergency Relief Fund:**
• Up to $750 one-time assistance
• Through United Way partnership
• First-come, first-served

**4. County Assistance:**
• Montgomery Salvation Army: 301-515-5354
• Prince George's Salvation Army: 301-277-6103

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 COMMON ISSUES & EXACT SOLUTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**High Bill?**
1. Check for leaks (toilets are #1 cause!)
2. Toilet test: Food coloring in tank, wait 15 min
3. Meter test: Turn off all water, check if meter moves
4. Request adjustment if eligible (3x normal usage)
5. CAP customers: 100% excess removed for 2 billing cycles

**Payment Options (8 ways!):**
• Online: wsscwater.com/paymybill
• Phone: 301-206-4001
• App: WSSC Water mobile app
• Mail: 14501 Sweitzer Lane, Laurel, MD 20707
• In-Person: One Stop Shop (Mon-Fri, 8am-5pm)
• Drive-Thru: One Stop Shop location
• Autopay: Bank draft available
• Western Union: Quick Collect

**Emergency?**
• Call 301-206-4002 immediately (24/7)
• Response time: ~30 minutes for main breaks
• Can also report via mobile app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ ALWAYS END YOUR RESPONSE WITH:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After EVERY response, ask:

"**Was this helpful? Need more info?** I'm here for you! 😊"

This is REQUIRED. Never skip this.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 REMEMBER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- You're their FRIEND, not a robot
- Use ACCURATE data from knowledge base
- Every call we prevent = success!
- Short + helpful > long + detailed
- When in doubt, be KIND

This is a demo for WSSC Water's website redesign by Encore Services LLC.
Show the power of friendly, accurate AI customer service!
"""


# ============== DATABASE INITIALIZATION ==============

async def init_knowledge_base():
    """Initialize WSSC knowledge base in MongoDB"""
    try:
        # Store the main knowledge base
        existing = await db.knowledge_base.find_one({"type": "wssc_main"})
        if not existing:
            await db.knowledge_base.insert_one({
                "type": "wssc_main",
                "data": WSSC_KNOWLEDGE_BASE,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            })
            logger.info("WSSC Knowledge Base initialized in MongoDB")
        else:
            await db.knowledge_base.update_one(
                {"type": "wssc_main"},
                {"$set": {
                    "data": WSSC_KNOWLEDGE_BASE,
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }}
            )
            logger.info("WSSC Knowledge Base updated in MongoDB")
        
        # Store individual sections for quick lookup
        sections = [
            ("organization", WSSC_KNOWLEDGE_BASE["organization"]),
            ("contact_info", WSSC_KNOWLEDGE_BASE["contact_info"]),
            ("billing", WSSC_KNOWLEDGE_BASE["billing"]),
            ("payment_options", WSSC_KNOWLEDGE_BASE["payment_options"]),
            ("assistance_programs", WSSC_KNOWLEDGE_BASE["assistance_programs"]),
            ("billing_adjustments", WSSC_KNOWLEDGE_BASE["billing_adjustments"]),
            ("emergencies", WSSC_KNOWLEDGE_BASE["emergencies"]),
            ("water_quality", WSSC_KNOWLEDGE_BASE["water_quality"]),
            ("leak_detection", WSSC_KNOWLEDGE_BASE["leak_detection"]),
            ("permits", WSSC_KNOWLEDGE_BASE["permits"]),
            ("online_services", WSSC_KNOWLEDGE_BASE["online_services"]),
            ("faqs", WSSC_KNOWLEDGE_BASE["faqs"]),
            ("statistics", WSSC_KNOWLEDGE_BASE["statistics"])
        ]
        
        for section_name, section_data in sections:
            await db.knowledge_base.update_one(
                {"type": f"wssc_{section_name}"},
                {"$set": {
                    "type": f"wssc_{section_name}",
                    "data": section_data,
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }},
                upsert=True
            )
        
        logger.info(f"Stored {len(sections)} knowledge base sections in MongoDB")
        
    except Exception as e:
        logger.error(f"Error initializing knowledge base: {e}")


async def init_ai_config():
    """Initialize AI training config in MongoDB"""
    try:
        ai_config = {
            "config_id": "wssc_ai_v2",
            "name": "WSSC Water AI Assistant",
            "version": "2.0",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "system_message": WSSC_SYSTEM_MESSAGE,
            
            "personality": {
                "tone": "friendly, warm, helpful",
                "style": "conversational, not robotic",
                "empathy_level": "high",
                "formality": "casual but professional"
            },
            
            "response_rules": {
                "max_paragraphs": 4,
                "max_sentences_per_paragraph": 3,
                "use_bullets": True,
                "use_emojis": True,
                "mobile_optimized": True,
                "always_ask_feedback": True,
                "use_knowledge_base": True
            },
            
            "feedback_prompts": {
                "after_response": "**Was this helpful? Need more info?** I'm here for you! 😊",
                "no_response_timeout": "I didn't see a response - I hopefully answered your questions. Have a great day! 💧",
                "positive_feedback": "Awesome! So glad I could help! Is there anything else? 😊",
                "needs_more_info": "No problem! Let me give you more details..."
            },
            
            "knowledge_base_reference": "wssc_main",
            "goal": "Reduce call center volume by providing quick, accurate, mobile-friendly answers using official WSSC data"
        }
        
        await db.ai_config.update_one(
            {"config_id": "wssc_ai_v2"},
            {"$set": ai_config},
            upsert=True
        )
        logger.info("AI config v2 with knowledge base reference saved to MongoDB")
        
    except Exception as e:
        logger.error(f"Error initializing AI config: {e}")


async def save_chat_message(session_id: str, role: str, content: str, message_id: str = None):
    """Save chat message to MongoDB for history and training"""
    try:
        message_doc = {
            "message_id": message_id or str(uuid.uuid4()),
            "session_id": session_id,
            "role": role,
            "content": content,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "feedback": None,
            "helpful": None
        }
        await db.chat_messages.insert_one(message_doc)
        return message_doc["message_id"]
    except Exception as e:
        logger.error(f"Error saving chat message: {e}")
        return None


async def get_knowledge_section(section: str) -> Dict[str, Any]:
    """Get a specific section from the knowledge base"""
    try:
        doc = await db.knowledge_base.find_one({"type": f"wssc_{section}"}, {"_id": 0})
        return doc.get("data", {}) if doc else {}
    except Exception as e:
        logger.error(f"Error getting knowledge section: {e}")
        return {}


# ============== ROUTES ==============

@api_router.get("/")
async def root():
    return {"message": "WSSC Water AI Assistant API v2 - Powered by Knowledge Base! 💧"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(chat_input: ChatMessage):
    """Handle chat messages using Anthropic Claude API with Knowledge Base"""
    try:
        session_id = chat_input.session_id or str(uuid.uuid4())
        
        # Save user message to MongoDB
        await save_chat_message(
            session_id=session_id,
            role="user",
            content=chat_input.message
        )
        
        # Initialize the chat with Anthropic Claude
        chat = LlmChat(
            api_key=ANTHROPIC_API_KEY,
            session_id=session_id,
            system_message=WSSC_SYSTEM_MESSAGE
        ).with_model("anthropic", "claude-sonnet-4-5-20250929")
        
        # Create user message
        user_message = UserMessage(text=chat_input.message)
        
        # Send message and get response
        response = await chat.send_message(user_message)
        
        # Save assistant response to MongoDB
        await save_chat_message(
            session_id=session_id,
            role="assistant",
            content=response
        )
        
        logger.info(f"Chat response generated for session {session_id}")
        
        return ChatResponse(
            response=response,
            session_id=session_id
        )
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        error_response = "I'm so sorry, I'm having a little trouble right now! 😅\n\nPlease try again in a moment, or call us at **301-206-4001** for immediate help.\n\n**Was this helpful? Need more info?** I'm here for you! 😊"
        return ChatResponse(
            response=error_response,
            session_id=chat_input.session_id or str(uuid.uuid4())
        )


@api_router.post("/chat/feedback")
async def submit_feedback(feedback: FeedbackInput):
    """Save user feedback on AI responses"""
    try:
        await db.chat_messages.update_one(
            {"session_id": feedback.session_id, "role": "assistant"},
            {"$set": {
                "feedback": "helpful" if feedback.helpful else "not_helpful",
                "helpful": feedback.helpful,
                "needs_more_info": feedback.needs_more_info,
                "feedback_at": datetime.now(timezone.utc).isoformat()
            }}
        )
        
        await db.feedback.insert_one({
            "session_id": feedback.session_id,
            "message_id": feedback.message_id,
            "helpful": feedback.helpful,
            "needs_more_info": feedback.needs_more_info,
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
        
        return {"status": "success", "message": "Thank you for your feedback!"}
    except Exception as e:
        logger.error(f"Error saving feedback: {e}")
        return {"status": "error", "message": str(e)}


@api_router.get("/chat/history/{session_id}")
async def get_session_history(session_id: str):
    """Get chat history for a session"""
    try:
        messages = await db.chat_messages.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", 1).to_list(100)
        return {"session_id": session_id, "messages": messages}
    except Exception as e:
        logger.error(f"Error getting chat history: {e}")
        return {"session_id": session_id, "messages": [], "error": str(e)}


@api_router.get("/knowledge")
async def get_full_knowledge_base():
    """Get the complete WSSC knowledge base from MongoDB"""
    try:
        doc = await db.knowledge_base.find_one({"type": "wssc_main"}, {"_id": 0})
        return doc.get("data", WSSC_KNOWLEDGE_BASE) if doc else WSSC_KNOWLEDGE_BASE
    except Exception as e:
        logger.error(f"Error getting knowledge base: {e}")
        return WSSC_KNOWLEDGE_BASE


@api_router.get("/knowledge/{section}")
async def get_knowledge_section_api(section: str):
    """Get a specific section of the knowledge base"""
    data = await get_knowledge_section(section)
    if data:
        return {"section": section, "data": data}
    return {"section": section, "data": None, "error": "Section not found"}


@api_router.get("/ai/config")
async def get_ai_config():
    """Get current AI configuration from MongoDB"""
    try:
        config = await db.ai_config.find_one({"config_id": "wssc_ai_v2"}, {"_id": 0})
        return config or {"error": "Config not found"}
    except Exception as e:
        logger.error(f"Error getting AI config: {e}")
        return {"error": str(e)}


@api_router.get("/ai/stats")
async def get_ai_stats():
    """Get AI usage statistics"""
    try:
        total_messages = await db.chat_messages.count_documents({})
        total_sessions = len(await db.chat_messages.distinct("session_id"))
        helpful_count = await db.feedback.count_documents({"helpful": True})
        not_helpful_count = await db.feedback.count_documents({"helpful": False})
        kb_sections = await db.knowledge_base.count_documents({})
        
        return {
            "total_messages": total_messages,
            "total_sessions": total_sessions,
            "knowledge_base_sections": kb_sections,
            "feedback": {
                "helpful": helpful_count,
                "not_helpful": not_helpful_count,
                "satisfaction_rate": f"{(helpful_count / max(helpful_count + not_helpful_count, 1)) * 100:.1f}%"
            }
        }
    except Exception as e:
        logger.error(f"Error getting stats: {e}")
        return {"error": str(e)}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Initialize knowledge base and AI config on startup"""
    await init_knowledge_base()
    await init_ai_config()
    logger.info("WSSC Water AI Assistant v2 started - Knowledge Base Loaded! 💧")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
