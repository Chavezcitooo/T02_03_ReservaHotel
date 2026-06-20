from fastapi import FastAPI
from sqlalchemy.orm import Session

from app.basededatos import Base, engine, SessionLocal
from app.models.user import Usuario
from app.schemas.user_schema import UsuarioRegistro

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sistema de Reservas de Hoteles",
    version="1.0.0"
)

@app.get("/")
def inicio():
    return {
        "mensaje": "Sistema de Reservas de Hoteles funcionando correctamente"
    }

@app.post("/registro")
def registro(usuario: UsuarioRegistro):

    db: Session = SessionLocal()

    nuevo_usuario = Usuario(
        nombre=usuario.nombre,
        email=usuario.email,
        telefono=usuario.telefono,
        password=usuario.password,
        rol=usuario.rol
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return {
        "mensaje": "Usuario registrado correctamente",
        "id": nuevo_usuario.id
    }