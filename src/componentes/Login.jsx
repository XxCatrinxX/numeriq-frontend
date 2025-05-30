// src/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Importa Link
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';  // Importa los iconos de React Icons
import axios from 'axios';  // Importa axios


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Declara navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Paso 1: Login
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });
  
      if(response.data.token){
        const token = response.data.token;
  
        // Guardar el token en localStorage
        localStorage.setItem('token', token);
  
        // Paso 2: Obtener perfil (rol)
        const perfilResponse = await axios.get('http://127.0.0.1:8000/api/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const rol = perfilResponse.data.rol;
        localStorage.setItem('rol', rol);
  
        // Paso 3: Redirigir según rol
        if (rol === 'profesor') {
          navigate('/admin');
        } else if (rol === 'estudiante') {
          navigate('/estudiante');
        } else {
          alert('Rol no reconocido');
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      alert('Error al iniciar sesión');
    }
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
