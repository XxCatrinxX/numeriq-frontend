import React, { useEffect, useState } from "react";
import "../../CSS/nav.css";
import { obtenerUsuarioAutenticado } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUpload,
  faUser,
  faHeart,
  faCog,
  faEdit,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const Navadmin = () => {
  const [usuario, setUsuario] = useState(null); // Estado para almacenar los datos del usuario
  const navigate = useNavigate();
  useEffect(() => {
    // Función para obtener los datos del usuario
    const fetchUsuario = async () => {
      try {
        const response = await obtenerUsuarioAutenticado(); // Aquí deberías hacer la llamada a tu API
        setUsuario(response);
        console.log(response); // Para ver la respuesta en la consola
      } catch (error) {
        console.error("Error al obtener el usuario", error);
      }
    };

    fetchUsuario();
  }, []);
  return (
    <>
      <section className="info-admin">
        <img
          src={usuario?.foto ? usuario.foto : "./image/estudiante.png"} // Foto del usuario o una predeterminada si no tiene foto
          alt="Foto del estudiante"
        />
        <p>{usuario?.nombre || "Nombre no disponible"}</p>
        <p className="info-separada">
          {usuario?.rol || "Rol no disponible"} -{" "}
          {usuario?.institucion || "Institución no disponible"}
        </p>
      </section>

      <nav className="nav-admin">
        <ul>
          <li>
            <Link to="/admin">
              <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/nuevo-tema">
              <FontAwesomeIcon icon={faUpload} /> Subir Nuevo Tema
            </Link>
          </li>
          <li>
            <Link to="/temas-admin">
              <FontAwesomeIcon icon={faEdit} /> Todos los Temas
            </Link>
          </li>
          <li>
            <Link to="#">
              <FontAwesomeIcon icon={faList} /> Todos los Recursos
            </Link>
          </li>
          <li>
            <Link to="/usuarios">
              <FontAwesomeIcon icon={faUser} /> Usuarios
            </Link>
          </li>
          <li>
            <Link to="/ajustes">
              <FontAwesomeIcon icon={faCog} /> Ajustes
            </Link>
          </li>
        </ul>
      </nav>

      <div className="main-content">{/* Aquí va el contenido principal */}</div>

    </>
  );
}

export default Navadmin;
