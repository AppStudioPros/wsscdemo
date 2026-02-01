from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
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


# ============== AI TRAINING & CONFIGURATION ==============

# Mobile-optimized, friendly AI system prompt
WSSC_SYSTEM_MESSAGE = """You are the WSSC Water AI Assistant - a FRIENDLY, helpful customer service representative for WSSC Water, serving 1.8 million Maryland customers.

🎯 YOUR MISSION: Help customers quickly so they DON'T need to call. Be their friend!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 MOBILE-FIRST RESPONSE RULES (CRITICAL!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **BE FRIENDLY & WARM** - Start with a greeting, use their name if known
2. **KEEP IT SHORT** - Max 3-4 short paragraphs per response
3. **BREAK IT UP** - Use line breaks, bullets, and spacing
4. **NO WALLS OF TEXT** - If answer is long, chunk it into digestible pieces
5. **SCANNABLE** - Use emojis as visual markers (💧📊💰🔧📞)
6. **ACTION-ORIENTED** - Tell them exactly what to do, step by step

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ GOOD RESPONSE FORMAT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hi there! Happy to help! 😊

**Quick Answer:**
[1-2 sentences with the direct answer]

**What to do:**
• Step 1
• Step 2  
• Step 3

📞 Need more help? Call: 301-206-4001

---
**Was this helpful? Need more details?** Just let me know!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ BAD RESPONSE (NEVER DO THIS):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Long paragraphs that go on and on without any breaks making it impossible to read on a phone screen and causing users to give up and just call the facility instead which defeats the entire purpose of having an AI assistant in the first place because we want to reduce call volume not increase it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 TOPICS YOU HELP WITH:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• 💰 Billing questions & payments
• 💧 Water usage & conservation
• 🚨 Emergencies (water main breaks, leaks)
• 📋 Permits & construction
• 🔧 Service requests
• 📊 Account information

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ ALWAYS END YOUR RESPONSE WITH:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After EVERY response, ask:

"**Was this helpful? Need more info?** I'm here for you! 😊"

This is REQUIRED. Never skip this.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 KEY CONTACT INFO (memorize these!):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Customer Service: 301-206-4001 (Mon-Fri, 7am-8pm)
• Emergencies 24/7: 301-206-4002
• Website: wsscwater.com
• App: WSSC Water Mobile App

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 REMEMBER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- You're their FRIEND, not a robot
- Every call we prevent = success!
- Short + helpful > long + detailed
- When in doubt, be KIND

This is a demo for WSSC Water's website redesign by Encore Services LLC.
Show the power of friendly, efficient AI customer service!
"""

# AI Training data to store in MongoDB
AI_TRAINING_CONFIG = {
    "config_id": "wssc_ai_v1",
    "name": "WSSC Water AI Assistant",
    "version": "1.0",
    "created_at": datetime.now(timezone.utc).isoformat(),
    "updated_at": datetime.now(timezone.utc).isoformat(),
    
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
        "always_ask_feedback": True
    },
    
    "feedback_prompts": {
        "after_response": "**Was this helpful? Need more info?** I'm here for you! 😊",
        "no_response_timeout": "I didn't see a response - I hopefully answered your questions. Have a great day! 💧",
        "positive_feedback": "Awesome! So glad I could help! Is there anything else? 😊",
        "needs_more_info": "No problem! Let me give you more details..."
    },
    
    "contact_info": {
        "customer_service": "301-206-4001",
        "customer_service_hours": "Mon-Fri, 7am-8pm",
        "emergency_line": "301-206-4002",
        "emergency_hours": "24/7",
        "website": "wsscwater.com",
        "mobile_app": "WSSC Water Mobile App"
    },
    
    "topics": [
        {"name": "billing", "emoji": "💰", "priority": 1},
        {"name": "water_usage", "emoji": "💧", "priority": 2},
        {"name": "emergencies", "emoji": "🚨", "priority": 1},
        {"name": "permits", "emoji": "📋", "priority": 3},
        {"name": "service_requests", "emoji": "🔧", "priority": 2},
        {"name": "account_info", "emoji": "📊", "priority": 2}
    ],
    
    "goal": "Reduce call center volume by providing quick, helpful, mobile-friendly answers",
    "success_metric": "User doesn't need to call after chatting"
}


# ============== DATABASE INITIALIZATION ==============

async def init_ai_config():
    """Initialize AI training config in MongoDB if not exists"""
    try:
        existing = await db.ai_config.find_one({"config_id": "wssc_ai_v1"})
        if not existing:
            await db.ai_config.insert_one(AI_TRAINING_CONFIG)
            logger.info("AI training config initialized in MongoDB")
        else:
            # Update the config
            await db.ai_config.update_one(
                {"config_id": "wssc_ai_v1"},
                {"$set": {
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                    "system_message": WSSC_SYSTEM_MESSAGE,
                    **AI_TRAINING_CONFIG
                }}
            )
            logger.info("AI training config updated in MongoDB")
    except Exception as e:
        logger.error(f"Error initializing AI config: {e}")


async def save_chat_message(session_id: str, role: str, content: str, message_id: str = None):
    """Save chat message to MongoDB for history and training"""
    try:
        message_doc = {
            "message_id": message_id or str(uuid.uuid4()),
            "session_id": session_id,
            "role": role,  # "user" or "assistant"
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


async def get_chat_history(session_id: str, limit: int = 10):
    """Get recent chat history for a session"""
    try:
        messages = await db.chat_messages.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", -1).limit(limit).to_list(limit)
        return list(reversed(messages))
    except Exception as e:
        logger.error(f"Error getting chat history: {e}")
        return []


# ============== ROUTES ==============

@api_router.get("/")
async def root():
    return {"message": "WSSC Water AI Assistant API - Ready to help! 💧"}


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
    """Handle chat messages using Anthropic Claude API with MongoDB storage"""
    try:
        # Generate session ID if not provided
        session_id = chat_input.session_id or str(uuid.uuid4())
        
        # Save user message to MongoDB
        user_message_id = await save_chat_message(
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
        assistant_message_id = await save_chat_message(
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
        
        # Also save to feedback collection for analytics
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
    history = await get_chat_history(session_id)
    return {"session_id": session_id, "messages": history}


@api_router.get("/ai/config")
async def get_ai_config():
    """Get current AI configuration from MongoDB"""
    config = await db.ai_config.find_one({"config_id": "wssc_ai_v1"}, {"_id": 0})
    return config or AI_TRAINING_CONFIG


@api_router.get("/ai/stats")
async def get_ai_stats():
    """Get AI usage statistics"""
    try:
        total_messages = await db.chat_messages.count_documents({})
        total_sessions = len(await db.chat_messages.distinct("session_id"))
        helpful_count = await db.feedback.count_documents({"helpful": True})
        not_helpful_count = await db.feedback.count_documents({"helpful": False})
        
        return {
            "total_messages": total_messages,
            "total_sessions": total_sessions,
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
    """Initialize AI config on startup"""
    await init_ai_config()
    logger.info("WSSC Water AI Assistant started - Ready to help! 💧")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
