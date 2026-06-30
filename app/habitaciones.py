from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

# Importamos la conexión a la bd y el modelo real de SQLAlchemy
from app.basededatos import get_db
from app.models.habitacion import Habitacion as HabitacionModel
from app.schemas.habitacion_schema import HabitacionCreate

router = APIRouter()

@router.post("/habitaciones")
def crear_habitacion(habitacion: HabitacionCreate, db: Session = Depends(get_db)):
    # instanciamos el modelo de base de datos con los datos del schema
    nueva = HabitacionModel(
        numero=habitacion.numero,
        tipo=habitacion.tipo,
        precio=habitacion.precio,
        disponible=habitacion.disponible
    )
    # lo metemos a la bd de verdad
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    
    return nueva

@router.get("/habitaciones")
def listar_habitaciones(db: Session = Depends(get_db)):
    # traemos todo de la tabla habitaciones
    return db.query(HabitacionModel).all()

@router.get("/habitaciones/{id}")
def obtener_habitacion(id: int, db: Session = Depends(get_db)):
    # buscamos por id
    h = db.query(HabitacionModel).filter(HabitacionModel.id == id).first()
    if not h:
        raise HTTPException(status_code=404, detail="No encontrada")
    return h

@router.put("/habitaciones/{id}")
def actualizar_habitacion(id: int, habitacion: HabitacionCreate, db: Session = Depends(get_db)):
    h = db.query(HabitacionModel).filter(HabitacionModel.id == id).first()
    if not h:
        raise HTTPException(status_code=404, detail="No encontrada")
    
    # actualizamos los campos manualmente
    h.numero = habitacion.numero
    h.tipo = habitacion.tipo
    h.precio = habitacion.precio
    h.disponible = habitacion.disponible
    
    db.commit()
    db.refresh(h)
    return h

@router.delete("/habitaciones/{id}")
def eliminar_habitacion(id: int, db: Session = Depends(get_db)):
    h = db.query(HabitacionModel).filter(HabitacionModel.id == id).first()
    if not h:
        raise HTTPException(status_code=404, detail="No encontrada")
    
    db.delete(h)
    db.commit()
    return {"mensaje": "Eliminada"}