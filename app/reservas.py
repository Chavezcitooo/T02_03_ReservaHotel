from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import List
from datetime import datetime, timedelta, timezone

from app.basededatos import get_db
from app.reserva_schema import Reserva as ReservaSchema, ReservaCreate
from app.reserva import Reserva as ReservaModel, EstadoReserva
from app.models.user import Usuario
from app.models.habitacion import Habitacion

router = APIRouter(
    prefix="/reservas",
    tags=["Reservas"]
)

@router.post("/", response_model=ReservaSchema, status_code=status.HTTP_201_CREATED)
def crear_reserva(reserva: ReservaCreate, db: Session = Depends(get_db)):
    # 1. Validar que la fecha de fin es posterior a la fecha de inicio.
    if reserva.fecha_inicio >= reserva.fecha_fin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La fecha de fin debe ser posterior a la fecha de inicio."
        )

    # 2. Validar que la habitación y el usuario existen.
    if not db.query(Habitacion).filter(Habitacion.id == reserva.habitacion_id).first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Habitación con id {reserva.habitacion_id} no encontrada.")

    if not db.query(Usuario).filter(Usuario.id == reserva.usuario_id).first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Usuario con id {reserva.usuario_id} no encontrado.")

    # 3. Comprobar si existe una reserva conflictiva (choque de fechas).
    # Una reserva choca si se solapa en el tiempo con otra reserva para la misma habitación
    # que no esté 'cancelada'.
    # Condición de solapamiento: (inicio1 < fin2) Y (inicio2 < fin1)
    reserva_conflictiva = db.query(ReservaModel).filter(
        and_(
            ReservaModel.habitacion_id == reserva.habitacion_id,
            ReservaModel.estado != 'cancelada',
            ReservaModel.fecha_inicio < reserva.fecha_fin,
            ReservaModel.fecha_fin > reserva.fecha_inicio
        )
    ).first()

    if reserva_conflictiva:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="La habitación ya está reservada en un período que se solapa con las fechas solicitadas."
        )

    # Si todas las validaciones pasan, se crea la reserva.
    db_reserva = ReservaModel(
        habitacion_id=reserva.habitacion_id,
        usuario_id=reserva.usuario_id,
        fecha_inicio=reserva.fecha_inicio,
        fecha_fin=reserva.fecha_fin
    )
    db.add(db_reserva)
    db.commit()
    db.refresh(db_reserva)
    return db_reserva

@router.get("/usuario/{usuario_id}", response_model=List[ReservaSchema])
def obtener_reservas_por_usuario(usuario_id: int, db: Session = Depends(get_db)):
    """
    Obtiene todas las reservas realizadas por un usuario específico.
    """
    # Primero, verificar que el usuario exista para dar un error claro.
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Usuario con id {usuario_id} no encontrado."
        )

    # Consultar y devolver todas las reservas del usuario.
    reservas = db.query(ReservaModel).filter(ReservaModel.usuario_id == usuario_id).all()
    return reservas

@router.patch("/{reserva_id}/cancelar", response_model=ReservaSchema)
def cancelar_reserva(reserva_id: int, db: Session = Depends(get_db)):
    """
    Cancela una reserva existente cambiando su estado a 'cancelada'.
    """
    # Buscar la reserva en la base de datos.
    db_reserva = db.query(ReservaModel).filter(ReservaModel.id == reserva_id).first()

    # Si no se encuentra la reserva, devolver un error 404.
    if not db_reserva:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Reserva con id {reserva_id} no encontrada."
        )

    # Verificar si la reserva ya está cancelada para evitar acciones redundantes.
    if db_reserva.estado == EstadoReserva.CANCELADA:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La reserva ya ha sido cancelada."
        )

    # Cambiar el estado a 'cancelada' y guardar los cambios.
    db_reserva.estado = EstadoReserva.CANCELADA
    db.commit()
    db.refresh(db_reserva)
    return db_reserva

@router.patch("/{reserva_id}/confirmar", response_model=ReservaSchema)
def confirmar_reserva(reserva_id: int, db: Session = Depends(get_db)):
    """
    Confirma una reserva, cambiando su estado de 'pendiente' a 'confirmada'.
    Ideal para ser llamado por un servicio de pagos tras una transacción exitosa.
    """
    db_reserva = db.query(ReservaModel).filter(ReservaModel.id == reserva_id).first()

    if not db_reserva:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Reserva con id {reserva_id} no encontrada.")

    if db_reserva.estado != EstadoReserva.PENDIENTE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Solo se pueden confirmar reservas en estado 'pendiente'. Estado actual: {db_reserva.estado.value}"
        )

    db_reserva.estado = EstadoReserva.CONFIRMADA
    db.commit()
    db.refresh(db_reserva)
    return db_reserva

@router.post("/liberar-caducadas", status_code=status.HTTP_200_OK)
def liberar_reservas_caducadas(db: Session = Depends(get_db)):
    """
    Libera (cancela) las reservas pendientes que han superado un tiempo de espera.
    Este endpoint debería ser llamado periódicamente por un sistema automatizado (cron job)
    para evitar que las habitaciones queden bloqueadas indefinidamente.
    """
    # Definimos el tiempo de caducidad (ej: 15 minutos)
    tiempo_caducidad = timedelta(minutes=15)
    limite_tiempo = datetime.now(timezone.utc) - tiempo_caducidad

    # Buscamos las reservas a cancelar
    reservas_caducadas = db.query(ReservaModel).filter(
        ReservaModel.estado == EstadoReserva.PENDIENTE,
        ReservaModel.created_at < limite_tiempo
    ).all()

    if not reservas_caducadas:
        return {"mensaje": "No hay reservas pendientes caducadas para liberar."}

    num_liberadas = len(reservas_caducadas)
    for reserva in reservas_caducadas:
        reserva.estado = EstadoReserva.CANCELADA

    db.commit()

    return {"mensaje": f"Se han liberado {num_liberadas} reservas caducadas."}