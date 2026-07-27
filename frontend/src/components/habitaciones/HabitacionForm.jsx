import { useEffect, useState } from "react";

const formularioInicial = {
  numero: "",
  tipo: "",
  precio: "",
  disponible: true,
};

function HabitacionForm({ habitacionSeleccionada, onGuardar, onCancelar }) {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [error, setError] = useState("");

  useEffect(() => {
    if (habitacionSeleccionada) {
      setFormulario({
        numero: habitacionSeleccionada.numero,
        tipo: habitacionSeleccionada.tipo,
        precio: habitacionSeleccionada.precio,
        disponible: habitacionSeleccionada.disponible,
      });
    } else {
      setFormulario(formularioInicial);
    }
  }, [habitacionSeleccionada]);

  const manejarCambio = (evento) => {
    const { name, value, type, checked } = evento.target;

    setFormulario((datosAnteriores) => ({
      ...datosAnteriores,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    setError("");

    if (
      formulario.numero === "" ||
      formulario.tipo === "" ||
      formulario.precio === ""
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (Number(formulario.numero) <= 0) {
      setError("El número de habitación debe ser mayor que cero.");
      return;
    }

    if (Number(formulario.precio) <= 0) {
      setError("El precio debe ser mayor que cero.");
      return;
    }

    const datosHabitacion = {
      numero: Number(formulario.numero),
      tipo: formulario.tipo.trim(),
      precio: Number(formulario.precio),
      disponible: formulario.disponible,
    };

    onGuardar(datosHabitacion);

    if (!habitacionSeleccionada) {
      setFormulario(formularioInicial);
    }
  };

  return (
    <section className="panel">
      <h2>
        {habitacionSeleccionada ? "Editar habitación" : "Registrar habitación"}
      </h2>

      {error && <div className="alerta alerta-error">{error}</div>}

      <form onSubmit={manejarEnvio}>
        <div className="grupo-formulario">
          <label htmlFor="numero">Número de habitación</label>

          <input
            id="numero"
            name="numero"
            type="number"
            min="1"
            value={formulario.numero}
            onChange={manejarCambio}
            placeholder="Ejemplo: 101"
          />
        </div>

        <div className="grupo-formulario">
          <label htmlFor="tipo">Tipo de habitación</label>

          <select
            id="tipo"
            name="tipo"
            value={formulario.tipo}
            onChange={manejarCambio}
          >
            <option value="">Seleccione un tipo</option>
            <option value="simple">Simple</option>
            <option value="doble">Doble</option>
            <option value="matrimonial">Matrimonial</option>
            <option value="suite">Suite</option>
          </select>
        </div>

        <div className="grupo-formulario">
          <label htmlFor="precio">Precio por noche</label>

          <input
            id="precio"
            name="precio"
            type="number"
            min="0.01"
            step="0.01"
            value={formulario.precio}
            onChange={manejarCambio}
            placeholder="Ejemplo: 50.00"
          />
        </div>

        <div className="grupo-checkbox">
          <input
            id="disponible"
            name="disponible"
            type="checkbox"
            checked={formulario.disponible}
            onChange={manejarCambio}
          />

          <label htmlFor="disponible">Habitación disponible</label>
        </div>

        <div className="grupo-botones">
          <button type="submit" className="boton boton-principal">
            {habitacionSeleccionada ? "Actualizar" : "Registrar"}
          </button>

          {habitacionSeleccionada && (
            <button
              type="button"
              className="boton boton-secundario"
              onClick={onCancelar}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default HabitacionForm;
