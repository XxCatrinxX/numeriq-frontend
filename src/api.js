import axios from 'axios';
 // Asegúrate de que coincide con tu Laravel API
const API_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Cambia a la URL de tu API
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },  // Esto es necesario para enviar cookies como el CSRF token
});

// Actualiza la configuración para incluir el token CSRF en las cabeceras
api.interceptors.request.use((config) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken; // Asegúrate de que el token esté en los encabezados
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

export const obtenerTemas = async (pagina) => {
  try {
    // Añade el parámetro de página a la solicitud
    const respuesta = await axios.get(`${API_URL}/temas`, {
      params: { page: pagina } // Enviar el parámetro de la página
    });
    return respuesta.data;
  } catch (error) {
    console.error('Error obteniendo temas:', error);
    return [];
  }
};

export const registrarUsuario = async (datos) => {
  try {
    const respuesta = await axios.post(`${API_URL}/register`, datos); // Se incluye el CSRF token automáticamente
    return respuesta.data;
  } catch (error) {
    console.error("Error en el registro:", error.response?.data || error);
    throw error;
  }
};

export const obtenerTemaPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/temas/${id}`);
    if (!response.ok) throw new Error("No se pudo obtener el tema");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
