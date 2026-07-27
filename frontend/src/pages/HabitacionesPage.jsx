import { useEffect, useState } from "react";

import HabitacionForm from "../components/habitaciones/HabitacionForm";
import HabitacionList from "../components/habitaciones/HabitacionList";

import {
  actualizarHabitacion,
  crearHabitacion,
  eliminarHabitacion,
  obtenerHabitacionPorId,
  obtenerHabitaciones,
} from "../services/habitacionesService";

function HabitacionesPage() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  const [busquedaId, setBusquedaId] = useState("");
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  useEffect(() => {
    cargarHabitaciones();
  }, []);

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

  const cargarHabitaciones = async () => {
    try {
      setCargando(true);

      const datos = await obtenerHabitaciones();

      setHabitaciones(datos);
      setSoloDisponibles(false);
    } catch (error) {
      mostrarMensaje(obtenerMensajeError(error), "error");
    } finally {
      setCargando(false);
    }
  };

  const guardarHabitacion = async (datosHabitacion) => {
    try {
      if (habitacionSeleccionada) {
        await actualizarHabitacion(habitacionSeleccionada.id, datosHabitacion);

        mostrarMensaje("Habitación actualizada correctamente.", "exito");
      } else {
        await crearHabitacion(datosHabitacion);

        mostrarMensaje("Habitación registrada correctamente.", "exito");
      }

      setHabitacionSeleccionada(null);
      await cargarHabitaciones();
    } catch (error) {
      mostrarMensaje(obtenerMensajeError(error), "error");
    }
  };

  const seleccionarHabitacion = (habitacion) => {
    setHabitacionSeleccionada(habitacion);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelarEdicion = () => {
    setHabitacionSeleccionada(null);
  };

  const borrarHabitacion = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar esta habitación?",
    );

    if (!confirmacion) {
      return;
    }

    try {
      await eliminarHabitacion(id);

      mostrarMensaje("Habitación eliminada correctamente.", "exito");

      await cargarHabitaciones();
    } catch (error) {
      mostrarMensaje(obtenerMensajeError(error), "error");
    }
  };

  const buscarHabitacion = async (evento) => {
    evento.preventDefault();

    if (!busquedaId || Number(busquedaId) <= 0) {
      mostrarMensaje("Ingrese un ID válido.", "error");
      return;
    }

    try {
      setCargando(true);

      const habitacion = await obtenerHabitacionPorId(busquedaId);

      setHabitaciones([habitacion]);
      setSoloDisponibles(false);
    } catch (error) {
      setHabitaciones([]);

      if (error.response?.status === 404) {
        mostrarMensaje("La habitación no existe.", "error");
      } else {
        mostrarMensaje(obtenerMensajeError(error), "error");
      }
    } finally {
      setCargando(false);
    }
  };

  const mostrarDisponibles = async () => {
    try {
      setCargando(true);

      const datos = await obtenerHabitaciones();

      const disponibles = datos.filter((habitacion) => habitacion.disponible);

      setHabitaciones(disponibles);
      setSoloDisponibles(true);
    } catch (error) {
      mostrarMensaje(obtenerMensajeError(error), "error");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="contenedor">
      <header className="encabezado">
        <p className="subtitulo">Sistema de reservas de hotel</p>

        <h1>Administración de habitaciones</h1>

        <p>Registre, consulte, actualice y elimine habitaciones.</p>
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
        <HabitacionForm
          habitacionSeleccionada={habitacionSeleccionada}
          onGuardar={guardarHabitacion}
          onCancelar={cancelarEdicion}
        />

        <section className="panel">
          <h2>Consultar habitaciones</h2>

          <form onSubmit={buscarHabitacion}>
            <div className="grupo-formulario">
              <label htmlFor="busquedaId">Buscar habitación por ID</label>

              <input
                id="busquedaId"
                type="number"
                min="1"
                value={busquedaId}
                onChange={(evento) => setBusquedaId(evento.target.value)}
                placeholder="Ejemplo: 1"
              />
            </div>

            <button type="submit" className="boton boton-principal">
              Buscar
            </button>
          </form>

          <hr className="separador" />

          <div className="grupo-botones">
            <button
              type="button"
              className="boton boton-secundario"
              onClick={cargarHabitaciones}
            >
              Mostrar todas
            </button>

            <button
              type="button"
              className="boton boton-secundario"
              onClick={mostrarDisponibles}
            >
              Solo disponibles
            </button>
          </div>

          <p className="filtro">
            Filtro actual:{" "}
            <strong>
              {soloDisponibles
                ? "Habitaciones disponibles"
                : "Todas las habitaciones"}
            </strong>
          </p>
        </section>
      </div>

      <section className="seccion-listado">
        <div className="listado-encabezado">
          <h2>Listado de habitaciones</h2>

          <span>{habitaciones.length} resultado(s)</span>
        </div>

        <HabitacionList
          habitaciones={habitaciones}
          cargando={cargando}
          onEditar={seleccionarHabitacion}
          onEliminar={borrarHabitacion}
        />
      </section>
    </main>
  );
}

export default HabitacionesPage;
