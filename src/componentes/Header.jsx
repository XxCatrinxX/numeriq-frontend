import React from 'react';
import { Link } from 'react-router-dom';  // Asegúrate de importar Link correctamente

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/image/1738298689262.png" alt="" />
        <span>NumerIQ</span>
      </div>

      <div className="search-bar">
        <input className="barra" type="text" placeholder="Buscador" />
        <button className="lupa">🔍</button>
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-link">INICIO</Link>
        <Link to="/cursos" className="nav-link">CURSOS</Link>
        <Link to="/tutorias" className="nav-link">TUTORIAS</Link>
        <Link to="/blog" className="nav-link">BLOG</Link>
        <Link to="/contacto" className="nav-link">CONTACTO</Link>
      </nav>

      <div className="auth-buttons">
      <div className="cart-icon">
          <Link to="/carrito">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>

        <Link to="/login">
          <button className="login-btn">Iniciar Sesión</button>
        </Link>
        <Link to="/register">
          <button className="register-btn">Registrarse</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
