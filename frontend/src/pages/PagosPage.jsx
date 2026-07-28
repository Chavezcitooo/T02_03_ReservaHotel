import { useState } from "react";

import PagoForm from "../components/pagos/PagoForm";
import PagoList from "../components/pagos/PagoList";
import { registrarPago } from "../services/pagosService";

function PagosPage() {
  const [pagos, setPagos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const guardarPago = async (datosPago) => {
    try {
      setCargando(true);
      setMensaje("");
      setError("");

      const nuevoPago = await registrarPago(datosPago);

      const pagoConfirmado = {
        ...nuevoPago,
        reserva_id: nuevoPago.reserva_id ?? datosPago.reserva_id,
        monto: nuevoPago.monto ?? datosPago.monto,
        metodo_pago: nuevoPago.metodo_pago ?? datosPago.metodo_pago,
        estado_reserva: "CONFIRMADA",
      };

      setPagos((pagosAnteriores) => [
        ...pagosAnteriores,
        pagoConfirmado,
      ]);

      setMensaje(
        `Pago registrado correctamente. La reserva #${datosPago.reserva_id} cambió de PENDIENTE a CONFIRMADA.`
      );

      return true;
    } catch (errorPeticion) {
      const detalle =
        errorPeticion.response?.data?.detail ||
        errorPeticion.response?.data?.mensaje ||
        "No se pudo registrar el pago.";

      setError(
        typeof detalle === "string"
          ? detalle
          : "No se pudo registrar el pago."
      );

      return false;
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="contenedor">
      <header className="encabezado">
        <p className="subtitulo">Sistema de reservas de hotel</p>

        <h1>Administración de pagos</h1>

        <p>Registre pagos asociados a las reservas realizadas.</p>
      </header>

      {mensaje && (
        <div className="alerta alerta-exito">
          {mensaje}
        </div>
      )}

      {error && (
        <div className="alerta alerta-error">
          {error}
        </div>
      )}

      <div className="paneles-superiores">
        <PagoForm
          onGuardar={guardarPago}
          cargando={cargando}
        />

        <section className="panel">
          <h2>Información de pagos</h2>

          <p>
            Al registrar un pago correctamente, la reserva cambia
            automáticamente de PENDIENTE a CONFIRMADA.
          </p>

          <p>
            Ingrese el número de una reserva pendiente, el monto y el método
            de pago.
          </p>
        </section>
      </div>

      <section className="seccion-listado">
        <div className="listado-encabezado">
          <h2>Listado de pagos</h2>

          <span>{pagos.length} resultado(s)</span>
        </div>

        <PagoList pagos={pagos} cargando={false} />
      </section>
    </main>
  );
}

export default PagosPage;