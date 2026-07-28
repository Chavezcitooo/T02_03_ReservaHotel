import { useEffect, useState } from "react";

import { obtenerHabitaciones } from "../../services/habitacionesService";
import { obtenerUsuarios } from "../../services/usuariosService";

const formularioInicial = {
  usuario_id: "",
  habitacion_id: "",
  fecha_inicio: "",
  fecha_fin: "",
};

function ReservaForm({ onGuardar }) {
  const [formulario, setFormulario] = useState(formularioInicial);

  const [habitaciones, setHabitaciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [cargandoHabitaciones, setCargandoHabitaciones] = useState(false);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);

  const [error, setError] = useState("");

  const cargarHabitaciones = async () => {
    try {
      setCargandoHabitaciones(true);

      const datos = await obtenerHabitaciones();

      setHabitaciones(datos);
    } catch {
      setError("No se pudieron cargar las habitaciones.");
    } finally {
      setCargandoHabitaciones(false);
    }
  };

  const cargarUsuarios = async () => {
    try {
      setCargandoUsuarios(true);

      const datos = await obtenerUsuarios();

      setUsuarios(datos);
    } catch {
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setCargandoUsuarios(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
    cargarHabitaciones();
  }, []);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setFormulario((datosAnteriores) => ({
      ...datosAnteriores,
      [name]: value,
    }));
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setError("");

    if (
      formulario.usuario_id === "" ||
      formulario.habitacion_id === "" ||
      formulario.fecha_inicio === "" ||
      formulario.fecha_fin === ""
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (
      new Date(formulario.fecha_inicio) >=
      new Date(formulario.fecha_fin)
    ) {
      setError("La fecha inicial debe ser menor que la fecha final.");
      return;
    }

    const datosReserva = {
      usuario_id: Number(formulario.usuario_id),
      habitacion_id: Number(formulario.habitacion_id),
      fecha_inicio: formulario.fecha_inicio,
      fecha_fin: formulario.fecha_fin,
    };

    const guardadoCorrecto = await onGuardar(datosReserva);

    if (guardadoCorrecto) {
      setFormulario(formularioInicial);
    }
  };

  return (
    <section className="panel">
      <h2>Realizar reserva</h2>

      {error && <div className="alerta alerta-error">{error}</div>}

      <form onSubmit={manejarEnvio}>
        <div className="grupo-formulario">
          <label htmlFor="usuario_id">Usuario</label>

          <select
            id="usuario_id"
            name="usuario_id"
            value={formulario.usuario_id}
            onChange={manejarCambio}
            disabled={cargandoUsuarios}
          >
            <option value="">
              {cargandoUsuarios
                ? "Cargando usuarios..."
                : "Seleccione un usuario"}
            </option>

            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre} - {usuario.email}
              </option>
            ))}
          </select>
        </div>

        <div className="grupo-formulario">
          <label htmlFor="habitacion_id">Habitación</label>

          <select
            id="habitacion_id"
            name="habitacion_id"
            value={formulario.habitacion_id}
            onChange={manejarCambio}
            disabled={cargandoHabitaciones}
          >
            <option value="">
              {cargandoHabitaciones
                ? "Cargando habitaciones..."
                : "Seleccione una habitación"}
            </option>

            {habitaciones.map((habitacion) => (
              <option key={habitacion.id} value={habitacion.id}>
                Habitación {habitacion.numero} - {habitacion.tipo}
              </option>
            ))}
          </select>
        </div>

        <div className="grupo-formulario">
          <label htmlFor="fecha_inicio">Fecha inicial</label>

          <input
            id="fecha_inicio"
            name="fecha_inicio"
            type="date"
            value={formulario.fecha_inicio}
            onChange={manejarCambio}
          />
        </div>

        <div className="grupo-formulario">
          <label htmlFor="fecha_fin">Fecha final</label>

          <input
            id="fecha_fin"
            name="fecha_fin"
            type="date"
            value={formulario.fecha_fin}
            onChange={manejarCambio}
          />
        </div>

        <button type="submit" className="boton boton-principal">
          Realizar reserva
        </button>
      </form>
    </section>
  );
}

export default ReservaForm;