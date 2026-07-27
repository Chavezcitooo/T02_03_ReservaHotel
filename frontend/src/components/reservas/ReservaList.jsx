function ReservaList({ reservas, cargando }) {
  if (cargando) {
    return <p className="mensaje-listado">Cargando reservas...</p>;
  }

  if (reservas.length === 0) {
    return <p className="mensaje-listado">No se encontraron reservas.</p>;
  }

  return (
    <div className="reservas-grid">
      {reservas.map((reserva) => (
        <article key={reserva.id} className="panel">
          <h3>Reserva #{reserva.id}</h3>
        </article>
      ))}
    </div>
  );
}

export default ReservaList;