import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL, obtenerTemas } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API_URL}/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUsuario(response.data))
        .catch(() => setUsuario(null));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
    window.location.href = "/";
  };

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  const handleBuscar = async () => {
    const data = await obtenerTemas(1);
    console.log("Respuesta de la api: ", data);

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
    if (usuario.rol === "profesor") {
      navigate("/admin");
    } else {
      navigate("/estudiante");
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/image/1738298689262.png" alt="Logo" />
        <span>NumerIQ</span>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button>
          <i className="fas fa-search"></i>
        </button>
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-item">
          INICIO
        </Link>
        <Link to="/temas" className="nav-item">
          CURSOS
        </Link>
        <Link to="#" className="nav-item">
          BLOG
        </Link>
        <Link to="#" className="nav-item">
          CONTACTO
        </Link>
        {usuario && (
          <Link to="/carrito" className="nav-item carrito-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        )}
        {usuario ? (
          <div
            className={`user-info ${menuAbierto ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <img
              src={usuario.foto || "/default-avatar.png"}
              alt="Foto de perfil"
              className="user-avatar"
            />
            {menuAbierto && (
              <div className="dropdown-menu">
                <div
                  className="dropdown-item"
                  onClick={handleDashboardRedirect}
                >
                  Dashboard
                </div>
                <div onClick={handleLogout} className="dropdown-item logout">
                  Cerrar sesión
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="nav-item auth-link">
              Login
            </Link>
            <Link to="/register" className="nav-item auth-link">
              Register
            </Link>
          </>
        )}
      </nav>

      {/* Aquí puedes mostrar resultados en un dropdown o en una página aparte */}
      {resultados.length > 0 && (
        <div className="resultados-dropdown">
          {resultados.map((tema) => (
            <Link
              key={tema.id}
              to={`/temas/${tema.id}`}
              className="resultado-item"
            >
              {tema.nombre}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
