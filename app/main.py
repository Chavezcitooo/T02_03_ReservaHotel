from fastapi import FastAPI

app = FastAPI(
    title="Sistema de Reservas de Hoteles",
    description="Backend para gestión de usuarios, habitaciones, reservas y pagos.",
    version="1.0.0"
)

@app.get("/")
def inicio():
    return {"mensaje": "Sistema de Reservas de Hoteles funcionando correctamente"}