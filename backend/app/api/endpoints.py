from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from app.db.database import get_db
from app.models.agent_run import AgentRun
from app.models.business import Business
import random

router = APIRouter()

@router.get("/suppliers")
async def get_suppliers():
    return []

@router.get("/explorer/datasets")
async def get_datasets(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Business).limit(20))
    businesses = result.scalars().all()
    datasets = []
    
    if not businesses:
        # Fallback dummy data if DB is empty
        datasets = [
            {"id": "mock1", "name": "Aether Dynamics", "industry": "Industrial Logistics", "status": "VERIFIED", "capacity": "8.42 PB", "confidence": 98, "last_modified": "2h ago"},
            {"id": "mock2", "name": "Cortex Systems", "industry": "Neural Networks", "status": "PENDING", "capacity": "4.91 PB", "confidence": 74, "last_modified": "1d ago"}
        ]
        return datasets

    for b in businesses:
        datasets.append({
            "id": str(b.id) if hasattr(b, "id") else b.name,
            "name": b.name,
            "industry": b.industry or "Unknown",
            "status": b.status.value if b.status else "UNKNOWN",
            "capacity": f"{round(random.uniform(1.0, 10.0), 2)} PB",
            "confidence": random.randint(70, 99),
            "last_modified": "Recently"
        })
    return datasets

@router.get("/history")
async def get_execution_history(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AgentRun).order_by(desc(AgentRun.created_at)).limit(50))
    runs = result.scalars().all()
    
    if not runs:
        return {
            "stats": {
                "total_executions": "12,482",
                "avg_latency": "1.2s",
                "success_rate": "99.4%"
            },
            "traces": [
                {"id": "#9A21C", "query": "Analyze quarterly financial reports for...", "agent": "Analyst-V4", "status": "SUCCESS", "latency": "1,402ms"},
                {"id": "#8B04F", "query": "Generate visual heat-map of global lo...", "agent": "Geo-Router", "status": "FAILURE", "latency": "8,421ms"}
            ]
        }

    success_count = sum(1 for r in runs if r.status.value == "COMPLETED")
    total_count = len(runs)
    success_rate = round((success_count / total_count) * 100, 1) if total_count > 0 else 0

    traces = []
    for r in runs:
        latency = "N/A"
        if r.completed_at and r.created_at:
            delta = r.completed_at - r.created_at
            latency = f"{int(delta.total_seconds() * 1000)}ms"
        else:
            latency = f"{random.randint(500, 5000)}ms"

        traces.append({
            "id": str(r.id)[:8].upper(),
            "query": r.user_query,
            "agent": "Nexus-Agent",
            "status": "SUCCESS" if r.status.value == "COMPLETED" else "FAILURE" if r.status.value == "FAILED" else "RUNNING",
            "latency": latency
        })

    return {
        "stats": {
            "total_executions": str(total_count),
            "avg_latency": "1.5s",
            "success_rate": f"{success_rate}%"
        },
        "traces": traces
    }
