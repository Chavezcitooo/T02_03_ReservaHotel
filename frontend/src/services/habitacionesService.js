import axios from "axios";

const API_URL = "http://127.0.0.1:8000/habitaciones";

export const obtenerHabitaciones = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
};

export const obtenerHabitacionPorId = async (id) => {
  const respuesta = await axios.get(`${API_URL}/${id}`);
  return respuesta.data;
};

export const crearHabitacion = async (habitacion) => {
  const respuesta = await axios.post(API_URL, habitacion);
  return respuesta.data;
};

export const actualizarHabitacion = async (id, habitacion) => {
  const respuesta = await axios.put(`${API_URL}/${id}`, habitacion);
  return respuesta.data;
};

export const eliminarHabitacion = async (id) => {
  const respuesta = await axios.delete(`${API_URL}/${id}`);
  return respuesta.data;
};
