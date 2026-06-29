from pydantic import BaseModel

class HabitacionCreate(BaseModel):
    numero: int
    tipo: str
    precio: float
    disponible: bool