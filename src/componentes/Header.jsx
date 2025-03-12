import React from 'react';

export default function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src="/image/1738298689262.png" alt="Logo" />
                <span>NumerIQ</span>
            </div>

            <div className="search-bar">
                <input type="text" placeholder="Buscar..." />
                <button><i className="fas fa-search"></i></button>
            </div>

            <nav className="nav-links">
                <a href="/" className="nav-item">INICIO</a>
                <a href="/temas" className="nav-item">CURSOS</a>
                <a href="#" className="nav-item">TUTORIAS</a>
                <a href="#" className="nav-item">BLOG</a>
                <a href="#" className="nav-item">CONTACTO</a>
                <a href="/login" className="nav-item auth-link">Login</a>
                <a href="/register" className="nav-item auth-link">Register</a>
            </nav>
        </header>
    );
}
