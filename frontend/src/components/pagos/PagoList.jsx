function PagoList({ pagos, cargando }) {
  if (cargando) {
    return <p className="mensaje-listado">Registrando pago...</p>;
  }

  if (pagos.length === 0) {
    return <p className="mensaje-listado">No se encontraron pagos.</p>;
  }

  return (
    <div className="pagos-grid">
      {pagos.map((pago, indice) => (
        <article
          key={pago.id ?? `${pago.reserva_id}-${indice}`}
          className="panel"
        >
          <h3>Pago #{pago.id ?? indice + 1}</h3>

          <p>
            <strong>Reserva:</strong> {pago.reserva_id}
          </p>

          <p>
            <strong>Monto:</strong> ${Number(pago.monto).toFixed(2)}
          </p>

          <p>
            <strong>Método:</strong> {pago.metodo_pago}
          </p>

          {pago.fecha_pago && (
            <p>
              <strong>Fecha de pago:</strong>{" "}
              {new Date(pago.fecha_pago).toLocaleString()}
            </p>
          )}

          <p>
            <strong>Estado anterior:</strong> PENDIENTE
          </p>

          <p>
            <strong>Estado actual:</strong>{" "}
            <span className="estado-confirmada">CONFIRMADA</span>
          </p>
        </article>
      ))}
    </div>
  );
}

export default PagoList;