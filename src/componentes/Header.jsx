import React from 'react'
import { Link } from 'react-router-dom';
import Contenido from './Contenido';

export default function Header() {
  return (
    <header className='header'>
      <div className='logo'>
        <img src="/image/1738298689262.png" alt="" />
        <span>NumerIQ</span>
      </div>

      <div className="search-bar">
        <input type="text" placeholder='Buscador'/>
        <button>
          🔍
        </button>
      </div>

      <nav className="nav-links">
        <a href="#">INICIO</a>
        <a href="/temas">CURSOS</a>
        <a href="#">TUTORIAS</a>
        <a href="#">BLOG</a>
        <a href="#">CONTACTO</a>
      </nav>

      <div className="auth-buttons">
        <Link to="/login">  {/* Navegar a la página de inicio de sesión */}
          <button className="login-btn">Iniciar Sesión</button>
        </Link>
        <Link to="/register">  {/* Navegar a la página de registro */}
          <button className="register-btn">Registrarse</button>
        </Link>
      </div>

    </header>
  )
}
