import axios from "axios";

const API_URL = "http://127.0.0.1:8000/reservas";

export const crearReserva = async (reserva) => {
  const respuesta = await axios.post(`${API_URL}/`, reserva);
  return respuesta.data;
};

export const obtenerReservasPorUsuario = async (usuarioId) => {
  const respuesta = await axios.get(`${API_URL}/usuario/${usuarioId}`);
  return respuesta.data;
};