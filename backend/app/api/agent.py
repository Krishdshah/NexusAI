from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from app.db.database import get_db
from app.models.agent_run import AgentRun
from app.models.enums import AgentRunStatus
from app.llm.ollama import OllamaProvider
import uuid
import json

import os

router = APIRouter()
ollama_host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
llm = OllamaProvider(base_url=ollama_host)
@router.post("/chat")
async def chat_with_agent(query: str, db: AsyncSession = Depends(get_db)):
    # Create Agent Run
    new_run = AgentRun(
        user_id=uuid.uuid4(), # Dummy user for now
        user_query=query,
        status=AgentRunStatus.RUNNING
    )
    db.add(new_run)
    await db.commit()
    await db.refresh(new_run)

    # Fetch recent history for context
    history_result = await db.execute(
        select(AgentRun)
        .order_by(desc(AgentRun.created_at))
        .limit(5)
    )
    recent_runs = history_result.scalars().all()
    # Reverse to get chronological order
    recent_runs.reverse()
    
    context_prompt = "You are NexusAI, an Enterprise Business Discovery Agent. Here is the conversation history:\n"
    has_history = False
    for run in recent_runs:
        if run.status == AgentRunStatus.COMPLETED and run.plan and "response" in run.plan:
            context_prompt += f"User: {run.user_query}\nAgent: {run.plan['response']}\n"
            has_history = True
            
    if not has_history:
        context_prompt += "No previous conversation.\n"
        
    full_prompt = f"{context_prompt}\nUser: {query}\nAgent:"

    # Call LLM
    try:
        response_text = await llm.generate_text(full_prompt)
        new_run.status = AgentRunStatus.COMPLETED
        new_run.plan = {"response": response_text}
    except Exception as e:
        new_run.status = AgentRunStatus.FAILED
        new_run.plan = {"error": str(e)}

    await db.commit()
    return {"id": new_run.id, "response": new_run.plan.get("response", "Error generating response")}

@router.get("/sessions")
async def get_recent_sessions(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AgentRun).order_by(desc(AgentRun.created_at)).limit(5))
    sessions = result.scalars().all()
    return [{"id": str(s.id), "query": s.user_query, "created_at": s.created_at, "status": s.status.value} for s in sessions]
