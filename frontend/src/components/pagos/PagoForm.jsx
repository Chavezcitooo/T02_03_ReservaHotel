import { useState } from "react";

const formularioInicial = {
  reserva_id: "",
  monto: "",
  metodo_pago: "",
};

function PagoForm({ onGuardar, cargando }) {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [error, setError] = useState("");

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
      formulario.reserva_id === "" ||
      formulario.monto === "" ||
      formulario.metodo_pago === ""
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (Number(formulario.reserva_id) <= 0) {
      setError("El ID de la reserva debe ser mayor que cero.");
      return;
    }

    if (Number(formulario.monto) <= 0) {
      setError("El monto debe ser mayor que cero.");
      return;
    }

    const datosPago = {
      reserva_id: Number(formulario.reserva_id),
      monto: Number(formulario.monto),
      metodo_pago: formulario.metodo_pago,
    };

    const guardadoCorrecto = await onGuardar(datosPago);

    if (guardadoCorrecto) {
      setFormulario(formularioInicial);
    }
  };

  return (
    <section className="panel">
      <h2>Registrar pago</h2>

      {error && <div className="alerta alerta-error">{error}</div>}

      <form onSubmit={manejarEnvio}>
        <div className="grupo-formulario">
          <label htmlFor="reserva_id">Número de reserva</label>

          <input
            id="reserva_id"
            name="reserva_id"
            type="number"
            min="1"
            placeholder="Ejemplo: 1"
            value={formulario.reserva_id}
            onChange={manejarCambio}
          />
        </div>

        <div className="grupo-formulario">
          <label htmlFor="monto">Monto</label>

          <input
            id="monto"
            name="monto"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Ejemplo: 100.00"
            value={formulario.monto}
            onChange={manejarCambio}
          />
        </div>

        <div className="grupo-formulario">
          <label htmlFor="metodo_pago">Método de pago</label>

          <select
            id="metodo_pago"
            name="metodo_pago"
            value={formulario.metodo_pago}
            onChange={manejarCambio}
          >
            <option value="">Seleccione un método</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>

        <button
          type="submit"
          className="boton boton-principal"
          disabled={cargando}
        >
          {cargando ? "Registrando..." : "Registrar pago"}
        </button>
      </form>
    </section>
  );
}

export default PagoForm;