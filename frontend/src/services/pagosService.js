import axios from "axios";

const API_URL = "http://127.0.0.1:8000/pagos/";

export const registrarPago = async (datosPago) => {
  const respuesta = await axios.post(API_URL, datosPago);
  return respuesta.data;
};