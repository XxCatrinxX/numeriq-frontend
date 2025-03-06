// src/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import api from '../api/api'; // Importa la instancia de Axios

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [terms, setTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Crea el objeto formData con los datos del formulario
    const formData = {
      nombre,
      email,
      password,
      password_confirmation,
      terms, // También puedes incluir el término si es necesario
    };

    try {
      // Envía la solicitud POST a la API de registro
      const response = await api.post('/register', formData);
      console.log('Usuario registrado con éxito', response.data);
      alert('Usuario registrado con éxito');
    } catch (error) {
      console.error('Error al registrar el usuario', error);
      alert('Error al registrar el usuario');
    }
  };

  return (
    <div className="register-container">
      <h2>Registrarse para iniciar tu aprendizaje</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="terms">Quiero recibir ofertas, recomendaciones personalizadas y consejos de aprendizaje.</label>
          <input
            type="checkbox"
            id="terms"
            checked={terms}
            onChange={() => setTerms(!terms)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password_confirmation">Confirmar Contraseña</label>
          <input
            type="password"
            id="password_confirmation"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-register">Registrarse con correo</button>
      </form>

      <p>Otras opciones de registro</p>
      <div className="social-register">
        <button className="btn-social">
          <FaGoogle style={{ marginRight: '8px' }} /> Google
        </button>
        <button className="btn-social">
          <FaFacebook style={{ marginRight: '8px' }} /> Facebook
        </button>
      </div>

      <div className="footer-text">
        <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
      </div>
    </div>
  );
};

export default Register;
