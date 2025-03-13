import React, {useEffect, useState} from "react";
import "../../CSS/estudiante/estudiante.css";
import {obtenerUsuarioAutenticado} from "../../api";
import {Link, useNavigate} from "react-router-dom";

export default function Nav() {
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
    <section className="info-estudiante">
      <img
          src={usuario?.foto ? usuario.foto : "./image/estudiante.png"} // Foto del usuario o una predeterminada si no tiene foto
          alt="Foto del estudiante"
      />      <p>{usuario?.nombre || "Nombre no disponible"}</p>
      <p className="info-separada">
        {usuario?.rol || "Rol no disponible"} - {usuario?.institucion || "Institución no disponible"}
      </p>
      <button>Conviertete En Instructor</button>

    </section>

      <nav className="nav-estudiante">
        <ul>
          <li>
            <Link to="/estudiante">Dashboard</Link>
          </li>
          <li>
            <Link to="/cursos">Cursos</Link>
          </li>
          <li>
            <Link to="/tutores">Tutores</Link>
          </li>
          <li>
            <Link to="/deseos">Lista de Deseos</Link>
          </li>
          <li>
            <Link to="/ajustes">Ajustes</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
