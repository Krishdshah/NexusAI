from sqlalchemy import String, Integer, Text, Boolean, DateTime, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
import uuid
from app.db.base import Base
from app.models.enums import AgentRunStatus

class AgentRun(Base):
    __tablename__ = "agent_runs"
    __table_args__ = {"schema": "agent"}

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    user_query: Mapped[str] = mapped_column(Text, nullable=False)
    structured_query: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    plan: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    status: Mapped[AgentRunStatus] = mapped_column(
        Enum(AgentRunStatus, native_enum=False, length=50), 
        default=AgentRunStatus.RUNNING, 
        nullable=False
    )
    correction_attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    human_approved: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    completed_at: Mapped[str | None] = mapped_column(DateTime, nullable=True)
