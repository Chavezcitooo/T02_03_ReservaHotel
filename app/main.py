from fastapi import FastAPI

from app.basededatos import Base, engine
from app.models.user import Usuario

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