import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine
from app.db.base import Base
# Import all models so they are registered with Base.metadata
from app.models.agent_run import AgentRun
from app.models.business import Business
from app.models.certification import Certification
from app.models.supplier import Supplier

DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql+asyncpg://nexus_admin:nexus_password@localhost:5432/nexus_db"
)

async def init_db():
    engine = create_async_engine(DATABASE_URL, echo=True, isolation_level="AUTOCOMMIT")
    async with engine.begin() as conn:
        await conn.execute(from_sqlalchemy_text("CREATE SCHEMA IF NOT EXISTS agent"))
        await conn.execute(from_sqlalchemy_text("CREATE SCHEMA IF NOT EXISTS core"))
        await conn.execute(from_sqlalchemy_text("CREATE SCHEMA IF NOT EXISTS discovery"))
        await conn.execute(from_sqlalchemy_text("CREATE SCHEMA IF NOT EXISTS business"))
        await conn.execute(from_sqlalchemy_text("CREATE SCHEMA IF NOT EXISTS certification"))
        await conn.execute(from_sqlalchemy_text("CREATE SCHEMA IF NOT EXISTS supplier"))
        
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    await engine.dispose()
    print("Database initialized successfully.")

if __name__ == "__main__":
    from sqlalchemy.sql import text as from_sqlalchemy_text
    asyncio.run(init_db())
