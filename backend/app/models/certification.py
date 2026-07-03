from sqlalchemy import String, Date, ForeignKey
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
