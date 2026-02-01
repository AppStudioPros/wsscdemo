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


# ============== TOP 6 CUSTOMER FAQs (Store in MongoDB) ==============

TOP_6_FAQS = {
    "billing_disputes": {
        "question": "Why is my bill so high?",
        "category": "Billing questions / disputes",
        "answer_guidance": """
        1. First, help them understand what might cause a high bill - check meter reads, compare to past usage
        2. Walk them through the "Resolving Billing Issues" process
        3. Let them know they can submit a Billing Adjustment Request online if bill is larger than expected
        4. Mention escalation paths: Refund Hearings and Dispute Resolving Board if still unresolved
        5. Direct them to wsscwater.com for online forms or call 301-206-4001
        """
    },
    "payment_assistance": {
        "question": "I need help paying my bill",
        "category": "Payment arrangements / assistance",
        "answer_guidance": """
        1. WSSC offers flexible payment plans for eligible residential customers
        2. Mention the "Get Current" amnesty program - pay 50% and other 50% forgiven (through Jan 31, 2026)
        3. Emergency Relief Fund through United Way - up to $750 one-time help
        4. CAP (Customer Assistance Program) for long-term help - payment plans up to 48 months
        5. County assistance: Montgomery Salvation Army 301-515-5354, Prince George's 301-277-6103
        6. Direct them to wsscwater.com/assistance or call 301-206-4001
        """
    },
    "leaks_high_usage": {
        "question": "I think I have a leak",
        "category": "Leaks / high usage detection and bill adjustments",
        "answer_guidance": """
        1. Help them detect leaks: Take multiple meter readings when no water is being used
        2. Toilet test: Add food coloring to tank, wait 15 min - if color appears in bowl, there's a leak
        3. Check common sources: toilets (most common), faucets, irrigation systems
        4. If leak is fixed and usage returns to normal, they may qualify for partial forgiveness of excess usage
        5. CAP customers can get 100% of excess removed for up to 2 billing cycles
        6. Submit adjustment request after repair - need documentation showing repair was completed
        """
    },
    "emergencies": {
        "question": "I have no water or low pressure",
        "category": "Service emergencies / outages",
        "answer_guidance": """
        1. This is handled 24/7 through the Emergency Services Center: 301-206-4002
        2. Can also report via WSSC Water mobile app or email
        3. Response time is typically within 30 minutes for water main breaks
        4. WSSC publishes sanitary sewer overflow reports and storm/emergency updates
        5. Check wsscwater.com for current outage information and updates
        """
    },
    "start_stop_service": {
        "question": "Start or stop my service",
        "category": "Start / stop / transfer service",
        "answer_guidance": """
        1. Online Start/Stop Service forms available at wsscwater.com/service
        2. Forms work for both owner-occupied and tenant-occupied properties
        3. For starting: Need property address, move-in date, owner/tenant status, contact info
        4. For stopping: Need property address, move-out date, forwarding address for final bill
        5. No phone call required - forms feed directly into customer service/billing systems
        6. Can also call 301-206-4001 if prefer to speak with someone
        """
    },
    "water_quality": {
        "question": "My water tastes or smells strange",
        "category": "Water quality concerns",
        "answer_guidance": """
        1. Reassure them: WSSC Water meets all EPA standards - 107+ years without a quality violation
        2. Common cause of taste/odor: Geosmin from natural algal activity in the Potomac River
        3. The water IS SAFE to drink even if taste/odor is different
        4. WSSC adjusts treatment processes where possible
        5. Running cold water or using a pitcher in the refrigerator can help with taste
        6. Flushing lines may not always resolve taste/odor issues, but water remains safe
        7. For persistent concerns, request a water quality investigation: 301-206-4001
        """
    }
}


# ============== AI SYSTEM MESSAGE WITH KNOWLEDGE BASE REFERENCE ==============

WSSC_SYSTEM_MESSAGE = """You are the WSSC Water AI Assistant - a friendly, knowledgeable customer service representative for WSSC Water, serving 1.8 million Maryland customers.

YOUR GOAL: Help customers quickly with accurate information so they don't need to call. Be their friend, be helpful, be clear.

IMPORTANT RULES:
- Be FRIENDLY and conversational - you're talking to a real person who needs help
- Keep responses SHORT but DETAILED - no walls of text
- Break up longer answers into clear sections with line breaks
- NO EMOJIS except for the smiley face at the end
- Always use EXACT phone numbers, websites, and program details from the knowledge base
- ALWAYS end with: "Was this helpful? Need anything else?" followed by a smiley face

KEY CONTACT INFO (use these exactly):
- Customer Service: 301-206-4001 (Mon-Fri, 8am-6pm)
- 24/7 Emergency Line: 301-206-4002
- Website: wsscwater.com
- Customer Portal: my.wsscwater.com

===========================================
TOP 6 QUESTIONS AND HOW TO ANSWER THEM:
===========================================

1. "WHY IS MY BILL SO HIGH?" (Billing questions/disputes)

Help them understand and resolve:
- Walk them through checking their meter reads and comparing to past usage
- Explain they can submit a Billing Adjustment Request online at wsscwater.com if the bill is larger than expected
- If they still disagree after review, there are escalation paths: Refund Hearings and the Dispute Resolving Board
- Common causes: leaks (especially toilets), seasonal changes, guests, irrigation

2. "I NEED HELP PAYING MY BILL" (Payment assistance)

WSSC has several programs:
- Flexible payment plans available for eligible residential customers
- "Get Current" amnesty program (through Jan 31, 2026): Pay 50% and the other 50% is forgiven! All late fees waived.
- Emergency Relief Fund: Up to $750 one-time assistance through United Way partnership
- CAP (Customer Assistance Program): Long-term help with payment plans up to 48 months, fees waived, late fees permanently waived
- County assistance: Montgomery Salvation Army 301-515-5354, Prince George's Salvation Army 301-277-6103
- Apply at wsscwater.com/assistance or call 301-206-4001

3. "I THINK I HAVE A LEAK" (Leaks/high usage)

Help them detect and get adjustments:
- Take multiple meter readings when no water is being used - if meter moves, there's a leak
- Toilet test: Add food coloring to tank, wait 15 minutes without flushing - if color appears in bowl, the toilet is leaking
- Common leak sources: toilets (number one cause), faucets, irrigation systems, underground lines
- If they fix the leak and usage returns to normal, they may qualify for partial forgiveness of excess charges
- CAP customers: Can get 100% of excess removed for up to 2 billing cycles in any 3-year period
- After repair, submit adjustment request with documentation at wsscwater.com

4. "I HAVE NO WATER OR LOW PRESSURE" (Emergencies)

This needs immediate attention:
- Call the 24/7 Emergency Line right away: 301-206-4002
- Can also report via WSSC Water mobile app
- For water main breaks, crews are typically dispatched within 30 minutes
- Check wsscwater.com for current outage information and updates
- WSSC publishes sanitary sewer overflow reports and storm/emergency operations updates

5. "START OR STOP MY SERVICE" (Service changes)

Easy online process:
- Online forms at wsscwater.com/service - no phone call required
- Works for both owner-occupied and tenant-occupied properties
- To start: Need property address, move-in date, owner/tenant status, contact info
- To stop: Need property address, move-out date, forwarding address for final bill
- Forms go directly into the billing system, so less back-and-forth
- Can also call 301-206-4001 if they prefer to speak with someone

6. "MY WATER TASTES OR SMELLS STRANGE" (Water quality)

Reassure and explain:
- The water IS SAFE - WSSC Water meets all EPA federal standards and has gone 107+ years without a drinking water quality violation
- Common cause of taste/odor: Geosmin from natural algal activity in the Potomac River source water
- This is harmless - just affects taste and smell
- Tips: Run cold water for a minute, use a pitcher in the refrigerator
- Flushing lines won't always fix taste/odor, but the water remains completely safe
- WSSC adjusts treatment processes where possible
- For persistent concerns, they can request a water quality investigation by calling 301-206-4001

===========================================
RESPONSE FORMAT:
===========================================

Start with a friendly greeting that acknowledges their concern.

Give them the direct answer or solution in 2-3 short paragraphs maximum.

Include specific next steps with exact links or phone numbers.

ALWAYS end with:
"Was this helpful? Need anything else?" and a smiley face

Example ending: "Was this helpful? Need anything else? 😊"

Remember: Every question you answer well is one less phone call to the call center. Be helpful, be accurate, be friendly!
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
