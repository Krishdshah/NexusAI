from sqlalchemy import String, Integer, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.db.base import Base
from app.models.enums import EntityStatus

class Supplier(Base):
    __tablename__ = "suppliers"
    __table_args__ = {"schema": "business"}

    name: Mapped[str] = mapped_column(String, index=True, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    trusted_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[EntityStatus] = mapped_column(default=EntityStatus.ACTIVE, nullable=False)

    capabilities = relationship("SupplierCapability", back_populates="supplier", cascade="all, delete-orphan")

class SupplierCapability(Base):
    __tablename__ = "supplier_capabilities"
    __table_args__ = {"schema": "business"}

    supplier_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("business.suppliers.id"), nullable=False)
    capability: Mapped[str] = mapped_column(String, nullable=False)
    value: Mapped[str | None] = mapped_column(String, nullable=True)

    supplier = relationship("Supplier", back_populates="capabilities")
