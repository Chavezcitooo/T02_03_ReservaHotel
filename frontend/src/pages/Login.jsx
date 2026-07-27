import { useState } from "react";
import { iniciarSesion } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const respuesta = await iniciarSesion({ email, password });
      if (respuesta.mensaje === "Credenciales incorrectas") {
        setError("Correo o contraseña incorrectos");
      } else {
        alert("Inicio de sesión exitoso");
        navigate("/");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <section className="panel" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Iniciar Sesión</h2>
      
      {error && <div className="alerta alerta-error">{error}</div>}

      <form onSubmit={manejarEnvio}>
        <div className="grupo-formulario">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="grupo-formulario">
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="boton boton-principal">Ingresar</button>
      </form>
    </section>
  );
}

export default Login;