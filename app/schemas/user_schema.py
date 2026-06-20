from pydantic import BaseModel

class UsuarioRegistro(BaseModel):
    nombre: str
    email: str
    telefono: str
    password: str
    rol: str
    
class UsuarioLogin(BaseModel):
    email: str
    password: str