// src/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Importa Link
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el registro aquí
  };

  return (
    <div className="register-container">
      <h2>Registrarse para iniciar tu aprendizaje</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="checkbox"
            id="terms"
            checked={terms}
            onChange={() => setTerms(!terms)}
          />
          <label htmlFor="terms">Quiero recibir ofertas, recomendaciones personalizadas y consejos de aprendizaje.</label>
        </div>
        <div className="input-group">
          <label htmlFor="fullName">Nombre Completo</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
        <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p> {/* Link para redirigir */}
      </div>
    </div>
  );
};

export default Register;
