import enum
from sqlalchemy import Column, Integer, Date, ForeignKey, Enum as SQLAlchemyEnum, DateTime
from sqlalchemy.sql import func

from app.basededatos import Base

class EstadoReserva(str, enum.Enum):
    PENDIENTE = "pendiente"
    CONFIRMADA = "confirmada"
    CANCELADA = "cancelada"

class Reserva(Base):
    __tablename__ = "reservas"

    id = Column(Integer, primary_key=True, index=True)
    habitacion_id = Column(Integer, ForeignKey("habitaciones.id"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    fecha_inicio = Column(Date, nullable=False)
    fecha_fin = Column(Date, nullable=False)
    estado = Column(SQLAlchemyEnum(EstadoReserva), default=EstadoReserva.PENDIENTE, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())