import axios from 'axios';
// Asegúrate de que coincide con tu Laravel API
const API_URL = "http://127.0.0.1:8000/api";

// Crear instancia de Axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true, // Importante para enviar cookies (como XSRF-TOKEN)
  headers: {
      "Content-Type": "application/json",
  },
});

// Función para obtener el CSRF token
export const obtenerCsrfToken = async () => {
  try {
    await api.get('/sanctum/csrf-cookie'); // Esto configurará la cookie CSRF
    console.log('✅ CSRF token establecido');
  } catch (error) {
    console.error('❌ Error al obtener CSRF token:', error);
    throw error;
  }
};

// Función de login
export const loginUsuario = async (email, password) => {
  try {
    const respuesta = await api.post(`${API_URL}/login`, { email, password });
    if (respuesta.data.token) {
      console.log("✅ Token de acceso recibido:", respuesta.data.token);
      return respuesta.data.token;
    } else {
      throw new Error("❌ Token de acceso no recibido.");
    }
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error.response?.data || error);
    throw error;
  }
};
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

export const obtenerTemaPorId = async (idTema) => {
  try {
    // Realiza la solicitud a la API con el ID del tema
    const response = await axios.get(`${API_URL}/temas/${idTema}/recursos`, {
      params: { id: idTema } // Usamos el ID en los parámetros de la solicitud
    });

    // Asegúrate de que la respuesta tenga la estructura correcta
    return response.data; // Asegúrate de que 'response.data' tenga la propiedad que necesitas

  } catch (error) {
    console.error("Error al obtener el tema:", error);
    throw error; // Propaga el error
  }
};
