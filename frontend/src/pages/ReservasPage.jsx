import ReservaForm from "../components/reservas/ReservaForm";
import ReservaList from "../components/reservas/ReservaList";

function ReservasPage() {
  return (
    <main className="contenedor">
      <header className="encabezado">
        <p className="subtitulo">Sistema de reservas de hotel</p>

        <h1>Administración de reservas</h1>

        <p>Registre reservas y consulte su estado.</p>
      </header>

      <div className="paneles-superiores">
        <ReservaForm />

        <section className="panel">
          <h2>Consultar reservas</h2>

          <p>
            En esta sección se podrán consultar las reservas registradas y sus
            estados.
          </p>
        </section>
      </div>

      <section className="seccion-listado">
        <div className="listado-encabezado">
          <h2>Listado de reservas</h2>

          <span>0 resultado(s)</span>
        </div>

        <ReservaList reservas={[]} cargando={false} />
      </section>
    </main>
  );
}

export default ReservasPage;