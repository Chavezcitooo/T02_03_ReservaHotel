import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const registrarUsuario = async (datosUsuario) => {
  const respuesta = await axios.post(`${API_URL}/registro`, datosUsuario);
  return respuesta.data;
};

export const iniciarSesion = async (credenciales) => {
  const respuesta = await axios.post(`${API_URL}/login`, credenciales);
  return respuesta.data;
};