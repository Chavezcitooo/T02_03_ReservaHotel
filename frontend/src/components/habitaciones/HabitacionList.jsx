import HabitacionCard from "./HabitacionCard";

function HabitacionList({ habitaciones, cargando, onEditar, onEliminar }) {
  if (cargando) {
    return <p className="mensaje-listado">Cargando habitaciones...</p>;
  }

  if (habitaciones.length === 0) {
    return <p className="mensaje-listado">No se encontraron habitaciones.</p>;
  }

  return (
    <div className="habitaciones-grid">
      {habitaciones.map((habitacion) => (
        <HabitacionCard
          key={habitacion.id}
          habitacion={habitacion}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}

export default HabitacionList;
