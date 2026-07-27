function ReservaList({ reservas, cargando }) {
  if (cargando) {
    return <p className="mensaje-listado">Cargando reservas...</p>;
  }

  if (reservas.length === 0) {
    return <p className="mensaje-listado">No se encontraron reservas.</p>;
  }

  return (
    <div className="habitaciones-grid">
      {reservas.map((reserva) => (
        <article key={reserva.id} className="panel">
          <h3>Reserva #{reserva.id}</h3>

          <p>
            <strong>Usuario:</strong> {reserva.usuario_id}
          </p>

          <p>
            <strong>Habitación:</strong> {reserva.habitacion_id}
          </p>

          <p>
            <strong>Fecha inicial:</strong> {reserva.fecha_inicio}
          </p>

          <p>
            <strong>Fecha final:</strong> {reserva.fecha_fin}
          </p>

          <p>
            <strong>Estado:</strong>{" "}
            <span className="estado-reserva">
              {reserva.estado?.toUpperCase() || "PENDIENTE"}
            </span>
          </p>
        </article>
      ))}
    </div>
  );
}

export default ReservaList;