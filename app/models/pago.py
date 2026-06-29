from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.basededatos import Base

class Pago(Base):
    __tablename__ = "pagos"

    id = Column(Integer, primary_key=True, index=True)

    reserva_id = Column(
        Integer,
        ForeignKey("reservas.id"),
        nullable=False
    )

    monto = Column(Float, nullable=False)

    metodo_pago = Column(String(50), nullable=False)

    fecha_pago = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )