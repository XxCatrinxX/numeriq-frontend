import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {API_URL} from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const [usuario, setUsuario] = useState(null);
    const [menuAbierto, setMenuAbierto] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${API_URL}/perfil`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => setUsuario(response.data))
                .catch(() => setUsuario(null));
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUsuario(null);
        window.location.href = '/';
    };
    const toggleMenu = () => setMenuAbierto(!menuAbierto);

    return (
        <header className="header">
            <div className="logo">
                <img src="/image/1738298689262.png" alt="Logo"/>
                <span>NumerIQ</span>
            </div>

            <div className="search-bar">
                <input type="text" placeholder="Buscar..."/>
                <button><i className="fas fa-search"></i></button>
            </div>

            <nav className="nav-links">
                <Link to="/" className="nav-item">INICIO</Link>
                <Link to="/temas" className="nav-item">CURSOS</Link>
                <Link to="#" className="nav-item">TUTORIAS</Link>
                <Link to="#" className="nav-item">BLOG</Link>
                <Link to="#" className="nav-item">CONTACTO</Link>
                {usuario && (
                    <Link to="/carrito" className="nav-item carrito-icon">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </Link>
                )}
                {usuario ? (
                    <div className={`user-info ${menuAbierto ? 'active' : ''}`} onClick={toggleMenu}>
                        <img src={usuario.foto || '/default-avatar.png'} alt="Foto de perfil" className="user-avatar"/>
                        {menuAbierto && (
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/estudiante">Dashboard</Link>
                                <div onClick={handleLogout} className="dropdown-item logout">Cerrar sesión</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                    <Link to="/login" className="nav-item auth-link">Login</Link>
                        <Link to="/register" className="nav-item auth-link">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
