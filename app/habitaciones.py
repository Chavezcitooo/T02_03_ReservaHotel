from fastapi import APIRouter, HTTPException
from app.schemas.habitacion_schema import HabitacionCreate
# Endpoint para gestionar habitacione
router = APIRouter()

habitaciones = []

@router.post("/habitaciones")
def crear_habitacion(habitacion: HabitacionCreate):
    nueva = {
        "id": len(habitaciones) + 1,
        **habitacion.model_dump()
    }
    habitaciones.append(nueva)
    return nueva

@router.get("/habitaciones")
def listar_habitaciones():
    return habitaciones

@router.get("/habitaciones/{id}")
def obtener_habitacion(id: int):
    for h in habitaciones:
        if h["id"] == id:
            return h
    raise HTTPException(status_code=404, detail="No encontrada")

@router.put("/habitaciones/{id}")
def actualizar_habitacion(id: int, habitacion: HabitacionCreate):
    for h in habitaciones:
        if h["id"] == id:
            h.update(habitacion.model_dump())
            return h
    raise HTTPException(status_code=404, detail="No encontrada")

@router.delete("/habitaciones/{id}")
def eliminar_habitacion(id: int):
    for h in habitaciones:
        if h["id"] == id:
            habitaciones.remove(h)
            return {"mensaje": "Eliminada"}
    raise HTTPException(status_code=404, detail="No encontrada")