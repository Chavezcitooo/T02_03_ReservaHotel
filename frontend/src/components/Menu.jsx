import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav className="panel" style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
      <Link to="/" className="boton boton-principal">Inicio</Link>
      <Link to="/habitaciones" className="boton boton-secundario">Habitaciones</Link>
      <Link to="/login" className="boton boton-secundario">Iniciar Sesión</Link>
      <Link to="/registro" className="boton boton-secundario">Registro</Link>
      <Link to="/reservas" className="boton boton-secundario">Reservas</Link>
      <Link to="/pagos" className="boton boton-secundario">Pagos</Link>
    </nav>
  );
}

export default Menu;