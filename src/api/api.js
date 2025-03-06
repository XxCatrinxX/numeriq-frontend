import axios from 'axios';

// Configura la URL base de tu API
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Cambia a la URL de tu API
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
