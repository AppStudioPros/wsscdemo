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


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Chat Models
class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# WSSC Water AI Assistant Chatbot Endpoint
WSSC_SYSTEM_MESSAGE = """You are the WSSC Water AI Assistant, a helpful and knowledgeable customer service representative for WSSC Water, a Maryland utility company serving 1.8 million customers.

Your role is to help customers with:
- Billing questions and account information
- Water usage analysis and conservation tips
- Reporting water main breaks and emergencies
- Permit requirements for construction projects
- Service requests and scheduling
- General information about WSSC Water services

Guidelines:
- Be friendly, professional, and helpful
- Provide specific, actionable information when possible
- For billing questions, explain usage patterns and offer payment options
- For emergencies, prioritize safety and quick response
- For permits, provide detailed requirements and timelines
- Use emojis sparingly to make responses engaging (📊, 💧, 🔍, etc.)
- Keep responses concise but thorough
- If you don't have specific account data, explain what information you would need in a real system

Remember: This is a demo for WSSC Water's website redesign proposal by Encore Services LLC. Show the power of AI-assisted customer service!"""

@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(chat_input: ChatMessage):
    """Handle chat messages using Anthropic Claude API"""
    try:
        # Generate session ID if not provided
        session_id = chat_input.session_id or str(uuid.uuid4())
        
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
        
        logger.info(f"Chat response generated for session {session_id}")
        
        return ChatResponse(
            response=response,
            session_id=session_id
        )
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        # Fallback response if API fails
        return ChatResponse(
            response=f"I apologize, but I'm having trouble connecting right now. Please try again in a moment. (Error: {str(e)[:100]})",
            session_id=chat_input.session_id or str(uuid.uuid4())
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()