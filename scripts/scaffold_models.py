import os

MODEL_DIR = "backend/app/models"

models_to_create = {
    "certification.py": """from sqlalchemy import String, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.db.base import Base

class Certification(Base):
    __tablename__ = "certifications"
    __table_args__ = {"schema": "business"}

    name: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[str | None] = mapped_column(String, nullable=True)
    authority: Mapped[str | None] = mapped_column(String, nullable=True)

class SupplierCertification(Base):
    __tablename__ = "supplier_certifications"
    __table_args__ = {"schema": "business"}

    supplier_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("business.suppliers.id"), nullable=False)
    certification_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("business.certifications.id"), nullable=False)
    issue_date: Mapped[str | None] = mapped_column(Date, nullable=True)
    expiry_date: Mapped[str | None] = mapped_column(Date, nullable=True)
""",
    "agent_run.py": """from sqlalchemy import String, Integer, Text, Boolean, DateTime
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
    status: Mapped[AgentRunStatus] = mapped_column(default=AgentRunStatus.RUNNING, nullable=False)
    correction_attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    human_approved: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    completed_at: Mapped[str | None] = mapped_column(DateTime, nullable=True)
""",
    "__init__.py": """from app.db.base import Base
from .enums import AgentRunStatus, ApprovalStatus, ExecutionStatus, EntityStatus, OpportunityStatus
from .business import Business
from .supplier import Supplier, SupplierCapability
from .certification import Certification, SupplierCertification
from .agent_run import AgentRun
"""
}

os.makedirs(MODEL_DIR, exist_ok=True)
for filename, content in models_to_create.items():
    path = os.path.join(MODEL_DIR, filename)
    if not os.path.exists(path):
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
print("Models scaffolded successfully.")
