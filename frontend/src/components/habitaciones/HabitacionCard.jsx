function HabitacionCard({ habitacion, onEditar, onEliminar }) {
  const precio = Number(habitacion.precio).toFixed(2);

  return (
    <article className="habitacion-card">
      <div className="habitacion-encabezado">
        <h3>Habitación {habitacion.numero}</h3>

        <span
          className={
            habitacion.disponible
              ? "estado estado-disponible"
              : "estado estado-no-disponible"
          }
        >
          {habitacion.disponible ? "Disponible" : "No disponible"}
        </span>
      </div>

      <div className="habitacion-informacion">
        <p>
          <strong>ID:</strong> {habitacion.id}
        </p>

        <p>
          <strong>Tipo:</strong> {habitacion.tipo}
        </p>

        <p>
          <strong>Precio:</strong> ${precio} por noche
        </p>
      </div>

      <div className="grupo-botones">
        <button
          type="button"
          className="boton boton-editar"
          onClick={() => onEditar(habitacion)}
        >
          Editar
        </button>

        <button
          type="button"
          className="boton boton-eliminar"
          onClick={() => onEliminar(habitacion.id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default HabitacionCard;
