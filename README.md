# Sistema de Reservas de Hoteles

Backend desarrollado con FastAPI para gestionar usuarios, habitaciones, reservas y pagos de un hotel.

El sistema permite registrar usuarios, administrar habitaciones, crear reservas evitando conflictos de fechas y registrar pagos asociados a una reserva.

## Objetivos

- Desarrollar servicios REST para la gestión hotelera.
- Evitar conflictos de fechas entre reservas.
- Registrar pagos asociados a reservas existentes.
- Documentar los endpoints mediante Swagger.
- Implementar pruebas automáticas para los principales módulos.

## Tecnologías utilizadas

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Uvicorn
- Pytest
- Unittest
- Swagger/OpenAPI
- Git y GitHub

## Requisitos previos

Antes de ejecutar el proyecto se debe contar con:

- Python 3.10 o superior.
- pip instalado.
- Git instalado.
- Un editor de código como Visual Studio Code o Cursor.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Chavezcitooo/T02_03_ReservaHotel.git

## Entrar a la carpeta
cd T02_03_ReservaHotel

## Instalar dependencias
pip install fastapi sqlalchemy uvicorn pytest httpx
```
## Ejecución del servidor

Desde la raíz del proyecto ejecutar:

```bash
uvicorn app.main:app --reload

##La aplicación estará disponible en:
http://127.0.0.1:8000
```
## Documentación Swagger

FastAPI genera automáticamente la documentación de los servicios.

Swagger UI:

```text
http://127.0.0.1:8000/docs
```
Documentación alternativa:
```text
http://127.0.0.1:8000/redoc
```
