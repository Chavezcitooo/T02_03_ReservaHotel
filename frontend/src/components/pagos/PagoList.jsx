function PagoList({ pagos, cargando }) {
  if (cargando) {
    return <p className="mensaje-listado">Cargando pagos...</p>;
  }

  if (pagos.length === 0) {
    return <p className="mensaje-listado">No se encontraron pagos.</p>;
  }

  return (
    <div className="pagos-grid">
      {pagos.map((pago) => (
        <article key={pago.id} className="panel">
          <h3>Pago #{pago.id}</h3>
        </article>
      ))}
    </div>
  );
}

export default PagoList;