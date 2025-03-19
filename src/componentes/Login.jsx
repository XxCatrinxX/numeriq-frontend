// src/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Importa Link
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';  // Importa los iconos de React Icons


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el inicio de sesión aquí
  };

  return (
    <div className="login-container">
      <h2>INICIAR SESIÓN</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo33@gmail.com"
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
        <button type="submit" className="btn-login">INICIAR SESIÓN</button>
      </form>

      <p>Otras opciones de inicio de sesión</p>
      <div className="social-login">
      <button className="btn-social">
        <FaGoogle style={{ marginRight: '8px' }} /> Google
      </button>
      <button className="btn-social">
        <FaFacebook style={{ marginRight: '8px' }} /> Facebook
      </button>
      <button className="btn-social">
        <FaApple style={{ marginRight: '8px' }} /> Apple
      </button>
    </div>

      <div className="footer-text">
        <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p> {/* Link para redirigir */}
      </div>
    </div>
  );
};

export default Login;
