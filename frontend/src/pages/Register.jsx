import { useState } from "react";
import { registrarUsuario } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formulario, setFormulario] = useState({
    nombre: "", email: "", telefono: "", password: "", rol: "cliente"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registrarUsuario(formulario);
      alert("Usuario registrado correctamente");
      navigate("/login");
    } catch (err) {
      setError("Ocurrió un error al registrar el usuario");
    }
  };

  return (
    <section className="panel" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Registro de Usuario</h2>
      {error && <div className="alerta alerta-error">{error}</div>}

      <form onSubmit={manejarEnvio}>
        <div className="grupo-formulario">
          <label>Nombre Completo</label>
          <input name="nombre" type="text" onChange={manejarCambio} required />
        </div>
        <div className="grupo-formulario">
          <label>Email</label>
          <input name="email" type="email" onChange={manejarCambio} required />
        </div>
        <div className="grupo-formulario">
          <label>Teléfono</label>
          <input name="telefono" type="text" onChange={manejarCambio} required />
        </div>
        <div className="grupo-formulario">
          <label>Contraseña</label>
          <input name="password" type="password" onChange={manejarCambio} required />
        </div>
        <button type="submit" className="boton boton-principal">Registrarse</button>
      </form>
    </section>
  );
}

export default Register;