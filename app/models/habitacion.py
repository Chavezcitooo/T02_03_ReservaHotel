from pydantic import BaseModel

class Habitacion(BaseModel):
    id: int
    numero: int
    tipo: str
    precio: float
    disponible: bool