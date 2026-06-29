from pydantic import BaseModel
from datetime import datetime

class PagoCreate(BaseModel):
    reserva_id: int
    monto: float
    metodo_pago: str

class Pago(BaseModel):
    id: int
    reserva_id: int
    monto: float
    metodo_pago: str
    fecha_pago: datetime

    class Config:
        from_attributes = True