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
## Módulos del sistema

### Usuarios

Permite registrar usuarios y validar el inicio de sesión.

### Habitaciones

Permite crear, listar, buscar, actualizar y eliminar habitaciones.

### Reservas

Permite crear reservas, cancelar reservas, confirmar reservas y evitar conflictos de fechas.

### Pagos

Permite registrar pagos asociados a una reserva existente. Al registrar un pago, la reserva cambia de estado pendiente a confirmada.

## Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/registro` | Registrar un usuario |
| POST | `/login` | Iniciar sesión |
| POST | `/habitaciones` | Crear una habitación |
| GET | `/habitaciones` | Listar habitaciones |
| GET | `/habitaciones/{id}` | Buscar habitación por ID |
| PUT | `/habitaciones/{id}` | Actualizar habitación |
| DELETE | `/habitaciones/{id}` | Eliminar habitación |
| POST | `/reservas/` | Crear una reserva |
| PATCH | `/reservas/{id}/cancelar` | Cancelar una reserva |
| PATCH | `/reservas/{id}/confirmar` | Confirmar una reserva |
| POST | `/pagos/` | Registrar un pago |

## Pruebas automáticas

Para ejecutar todas las pruebas:

```bash
python -m pytest -v
```
Para ejecutar únicamente las pruebas de habitaciones:
```bash
python -m pytest tests/test_habitacion.py -v
```
Para ejecutar únicamente las pruebas de pagos:
```bash
python -m pytest tests/test_pagos.py -v
```