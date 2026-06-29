from pydantic import BaseModel, Field
from datetime import date, datetime

from app.reserva import EstadoReserva

class ReservaBase(BaseModel):
    habitacion_id: int
    fecha_inicio: date
    fecha_fin: date

class ReservaCreate(ReservaBase):
    usuario_id: int = Field(..., description="ID del usuario que hace la reserva.")

class Reserva(ReservaBase):
    id: int
    usuario_id: int
    estado: EstadoReserva
    created_at: datetime

    class Config:
        from_attributes = True