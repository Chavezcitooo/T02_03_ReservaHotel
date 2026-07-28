import { useState } from "react";

import ReservaForm from "../components/reservas/ReservaForm";
import ReservaList from "../components/reservas/ReservaList";

import {
  crearReserva,
  obtenerReservasPorUsuario,
} from "../services/reservasService";

function ReservasPage() {
  const [reservas, setReservas] = useState([]);
  const [usuarioConsulta, setUsuarioConsulta] = useState("");
  const [cargandoReservas, setCargandoReservas] = useState(false);

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

    return "No se pudo completar la operación.";
  };

  const cargarReservasUsuario = async (usuarioId) => {
    try {
      setCargandoReservas(true);

      const datos = await obtenerReservasPorUsuario(usuarioId);

      setReservas(datos);

      return true;
    } catch (error) {
      setReservas([]);
      mostrarMensaje(obtenerMensajeError(error), "error");

      return false;
    } finally {
      setCargandoReservas(false);
    }
  };

  const guardarReserva = async (datosReserva) => {
    try {
      const nuevaReserva = await crearReserva(datosReserva);

      await cargarReservasUsuario(datosReserva.usuario_id);

      setUsuarioConsulta(String(datosReserva.usuario_id));

      mostrarMensaje("Reserva registrada correctamente.", "exito");

      return Boolean(nuevaReserva);
    } catch (error) {
      mostrarMensaje(obtenerMensajeError(error), "error");

      return false;
    }
  };

  const consultarReservas = async (evento) => {
    evento.preventDefault();

    if (usuarioConsulta === "") {
      mostrarMensaje(
        "Ingrese el número del usuario para consultar sus reservas.",
        "error"
      );
      return;
    }

    const consultaCorrecta = await cargarReservasUsuario(
      Number(usuarioConsulta)
    );

    if (consultaCorrecta) {
      mostrarMensaje(
        "Reservas consultadas correctamente.",
        "exito"
      );
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
            Consulte las reservas guardadas de un usuario y revise su estado.
          </p>

          <form onSubmit={consultarReservas}>
            <div className="grupo-formulario">
              <label htmlFor="usuario_consulta">
                Número de usuario
              </label>

              <input
                id="usuario_consulta"
                type="number"
                min="1"
                placeholder="Ejemplo: 1"
                value={usuarioConsulta}
                onChange={(evento) =>
                  setUsuarioConsulta(evento.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="boton boton-principal"
              disabled={cargandoReservas}
            >
              {cargandoReservas
                ? "Consultando..."
                : "Consultar reservas"}
            </button>
          </form>
        </section>
      </div>

      <section className="seccion-listado">
        <div className="listado-encabezado">
          <h2>Listado de reservas</h2>

          <span>{reservas.length} resultado(s)</span>
        </div>

        <ReservaList
          reservas={reservas}
          cargando={cargandoReservas}
        />
      </section>
    </main>
  );
}

export default ReservasPage;