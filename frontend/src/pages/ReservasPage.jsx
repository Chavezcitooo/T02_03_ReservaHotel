import { useState } from "react";

import ReservaForm from "../components/reservas/ReservaForm";
import ReservaList from "../components/reservas/ReservaList";

import { crearReserva } from "../services/reservasService";

function ReservasPage() {
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);

    setTimeout(() => {
      setMensaje("");
      setTipoMensaje("");
    }, 3500);
  };

  const obtenerMensajeError = (error) => {
    const detalle = error.response?.data?.detail;

    if (typeof detalle === "string") {
      return detalle;
    }

    return "No se pudo registrar la reserva.";
  };

  const guardarReserva = async (datosReserva) => {
    try {
      const nuevaReserva = await crearReserva(datosReserva);

      setReservas((reservasAnteriores) => [
        nuevaReserva,
        ...reservasAnteriores,
      ]);

      mostrarMensaje("Reserva registrada correctamente.", "exito");

      return true;
    } catch (error) {
      mostrarMensaje(obtenerMensajeError(error), "error");

      return false;
    }
  };

  return (
    <main className="contenedor">
      <header className="encabezado">
        <p className="subtitulo">Sistema de reservas de hotel</p>

        <h1>Administración de reservas</h1>

        <p>Registre reservas y consulte su estado.</p>
      </header>

      {mensaje && (
        <div
          className={
            tipoMensaje === "exito"
              ? "alerta alerta-exito"
              : "alerta alerta-error"
          }
        >
          {mensaje}
        </div>
      )}

      <div className="paneles-superiores">
        <ReservaForm onGuardar={guardarReserva} />

        <section className="panel">
          <h2>Consultar reservas</h2>

          <p>
            Las reservas creadas durante esta sesión aparecerán en el listado.
          </p>
        </section>
      </div>

      <section className="seccion-listado">
        <div className="listado-encabezado">
          <h2>Listado de reservas</h2>

          <span>{reservas.length} resultado(s)</span>
        </div>

        <ReservaList reservas={reservas} cargando={false} />
      </section>
    </main>
  );
}

export default ReservasPage;