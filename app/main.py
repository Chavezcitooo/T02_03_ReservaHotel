from fastapi import FastAPI
from sqlalchemy.orm import Session

from app.basededatos import Base, engine, SessionLocal
from app.models.user import Usuario
from app.schemas.user_schema import UsuarioRegistro, UsuarioLogin


from app.habitaciones import router as habitaciones_router


app = FastAPI(
    title="Sistema de Reservas de Hoteles",
    version="1.0.0"
)


app.include_router(habitaciones_router)


Base.metadata.create_all(bind=engine)

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

@app.post("/login")
def login(datos: UsuarioLogin):

    db: Session = SessionLocal()

    usuario = db.query(Usuario).filter(
        Usuario.email == datos.email,
        Usuario.password == datos.password
    ).first()

    if not usuario:
        return {
            "mensaje": "Credenciales incorrectas"
        }

    return {
        "mensaje": "Inicio de sesión exitoso",
        "usuario": usuario.nombre,
        "rol": usuario.rol
    }