from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.basededatos import get_db
from app.models.pago import Pago
from app.pago_schema import PagoCreate, Pago as PagoSchema
from app.reserva import Reserva, EstadoReserva

router = APIRouter(
    prefix="/pagos",
    tags=["Pagos"]
)

@router.post("/", response_model=PagoSchema)
def registrar_pago(
    pago: PagoCreate,
    db: Session = Depends(get_db)
):

    reserva = db.query(Reserva).filter(
        Reserva.id == pago.reserva_id
    ).first()

    if not reserva:
        raise HTTPException(
            status_code=404,
            detail="Reserva no encontrada"
        )

    nuevo_pago = Pago(
        reserva_id=pago.reserva_id,
        monto=pago.monto,
        metodo_pago=pago.metodo_pago
    )

    db.add(nuevo_pago)

    if reserva.estado == EstadoReserva.PENDIENTE:
        reserva.estado = EstadoReserva.CONFIRMADA

    db.commit()
    db.refresh(nuevo_pago)

    return nuevo_pago