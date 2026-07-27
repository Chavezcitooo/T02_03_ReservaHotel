import PagoForm from "../components/pagos/PagoForm";
import PagoList from "../components/pagos/PagoList";

function PagosPage() {
  return (
    <main className="contenedor">
      <header className="encabezado">
        <p className="subtitulo">Sistema de reservas de hotel</p>

        <h1>Administración de pagos</h1>

        <p>Registre pagos asociados a las reservas realizadas.</p>
      </header>

      <div className="paneles-superiores">
        <PagoForm />

        <section className="panel">
          <h2>Información de pagos</h2>

          <p>
            Al registrar un pago, la reserva cambiará de pendiente a confirmada.
          </p>
        </section>
      </div>

      <section className="seccion-listado">
        <div className="listado-encabezado">
          <h2>Listado de pagos</h2>

          <span>0 resultado(s)</span>
        </div>

        <PagoList pagos={[]} cargando={false} />
      </section>
    </main>
  );
}

export default PagosPage;