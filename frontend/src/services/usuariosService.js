import axios from "axios";

const API_URL = "http://127.0.0.1:8000/usuarios";

export const obtenerUsuarios = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
};