from fastapi import FastAPI
from sqlalchemy.orm import Session

from app.basededatos import Base, engine, SessionLocal
from app.models.user import Usuario
from app.schemas.user_schema import UsuarioRegistro, UsuarioLogin

from app.models.habitacion import Habitacion
from app.models.pago import Pago
from app.reserva import Reserva

from app.habitaciones import router as habitaciones_router
from app.pagos import router as pagos_router
from app.reservas import router as reservas_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Sistema de Reservas de Hoteles",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(habitaciones_router)
app.include_router(pagos_router)
app.include_router(reservas_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def inicio():
    return {
        "mensaje": "Sistema de Reservas de Hoteles funcionando correctamente"
    }
@app.get("/usuarios")
def listar_usuarios():
    db: Session = SessionLocal()

    try:
        usuarios = db.query(Usuario).all()

        return [
            {
                "id": usuario.id,
                "nombre": usuario.nombre,
                "email": usuario.email,
                "rol": usuario.rol,
            }
            for usuario in usuarios
        ]
    finally:
        db.close()

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
