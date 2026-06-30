from sqlalchemy import Column, Integer, String, Float, Boolean

from app.basededatos import Base
class Habitacion(Base):
    __tablename__ = "habitaciones" # SQLAlchemy exige el nombre de la tabla

    id = Column(Integer, primary_key=True, index=True)
    numero = Column(Integer, index=True)
    tipo = Column(String)
    precio = Column(Float)
    disponible = Column(Boolean, default=True)