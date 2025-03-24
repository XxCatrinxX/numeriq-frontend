import axios from 'axios';
 // Asegúrate de que coincide con tu Laravel API
export const API_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Cambia a la URL de tu API
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
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

export const crearTema = async (formData) => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/crearTema", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al crear el tema:", error);
    throw error;
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

export const obtenerDeseos = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/deseos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los deseos:", error);
    throw error;
  }
};

export const agregarDeseo = async (idUsuario, idTema) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Token de autenticación no disponible");
    }

    const response = await axios.post(`${API_URL}/deseos`, {
      idUsuario,
      idTema,
      fechaAgregado: new Date().toISOString(),
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error agregando a la lista de deseos:", error);
    throw error;
  }
};


export const obtenerUsuarioAutenticado = async () => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    // Realizar la solicitud GET a la API con el token Bearer
    const respuesta = await axios.get(`${API_URL}/perfil`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Aquí agregas el token en el header
        'Accept': 'application/json',
      },
    });

    return respuesta.data;  // Devuelve los datos del usuario
  } catch (error) {
    console.error('Error obteniendo la información del usuario:', error);
    throw error;  // Lanza el error para que lo manejes donde lo llames
  }
};


export const agregarAlCarrito = async (idTema, cantidad = 1) => {
  try {
  const token = localStorage.getItem('token');
    const response = await axios.post(
        `${API_URL}/carrito/agregar`,
        { idTema, cantidad },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    );
    return response.data;

  } catch (error) {
    console.error("Error al agregar el tema al carrito:", error);
    throw error;
  }
}

export const obtenerCarrito = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/carrito`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    throw error;
  }
}

// Eliminar un tema del carrito
export const eliminarTemaDelCarrito = async (idTema) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/carrito/eliminar/${idTema}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el tema del carrito:", error);
    throw error;
  }
};

// Vaciar carrito completo
export const vaciarCarrito = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/carrito/vaciar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    throw error;
  }
};
