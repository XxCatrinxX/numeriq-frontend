import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, obtenerTemas } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [usuario, setUsuario] = useState(() => {
    // Recuperar usuario desde sessionStorage si existe
    const usuarioGuardado = sessionStorage.getItem("usuario");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!usuario) {
      const token = localStorage.getItem("token");
      if (token) {
        axios
            .get(`${API_URL}/perfil`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              setUsuario(response.data);
              sessionStorage.setItem("usuario", JSON.stringify(response.data));
            })
            .catch(() => setUsuario(null));
      }
    }
  }, [usuario]); // Solo se ejecuta si usuario es null

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/");
  };

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  const handleBuscar = async () => {
    const data = await obtenerTemas(1);
    const temas = data.data || [];

    const filtrados = temas.filter((tema) =>
        tema.nombreTema?.toLowerCase().includes(busqueda.toLowerCase())
    );

    navigate("/resultados", { state: { temas: filtrados } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBuscar();
    }
  };

  const handleDashboardRedirect = () => {
    navigate(usuario.rol === "profesor" ? "/admin" : "/estudiante");
  };

  // Cerrar menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <header className="header">
        <div className="logo">
          <img src="/image/1738298689262.png" alt="Logo" />
          <Link className="Link" to="/">NumerIQ</Link>
        </div>

        <div className="search-bar">
          <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onKeyDown={handleKeyDown}
          />
          <button onClick={handleBuscar}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        <nav className="nav-links">
          <Link to="/" className="nav-item">INICIO</Link>
          <Link to="/temas" className="nav-item">CURSOS</Link>
          <Link to="#" className="nav-item">BLOG</Link>
          <Link to="#" className="nav-item">CONTACTO</Link>
          {usuario && (
              <Link to="/carrito" className="nav-item carrito-icon">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
          )}
          {usuario ? (
              <div ref={menuRef} className={`user-info ${menuAbierto ? "active" : ""}`} onClick={toggleMenu}>
                <img src={usuario.foto || "/default-avatar.png"} alt="Foto de perfil" className="user-avatar" />
                {menuAbierto && (
                    <div className="dropdown-menu">
                      <div className="dropdown-item" onClick={handleDashboardRedirect}>Dashboard</div>
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
