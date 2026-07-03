from sqlalchemy import String, Integer, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base
from app.models.enums import EntityStatus

class Business(Base):
    __tablename__ = "businesses"
    __table_args__ = {"schema": "business"}

    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    industry: Mapped[str | None] = mapped_column(String, nullable=True)
    company_size: Mapped[str | None] = mapped_column(String, nullable=True)
    founded_year: Mapped[int | None] = mapped_column(Integer, nullable=True)
    website: Mapped[str | None] = mapped_column(String, nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    trusted_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[EntityStatus] = mapped_column(default=EntityStatus.ACTIVE, nullable=False)
