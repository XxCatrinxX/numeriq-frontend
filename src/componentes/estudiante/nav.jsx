import React from "react";
import "../../CSS/estudiante/estudiante.css";

export default function Nav() {
  return (
    <>
    <section className="info-estudiante">
        <img src="ruta/a/la/foto.jpg" alt="Foto del estudiante" />
        <p>Nombre estudiante</p> <br />
        <p>Rol-Institucion</p>
        <button>Conviertete En Instructor</button>
      </section>

      <nav className="nav-estudiante">
        <ul>
          <li>
            <a href="/estudiante">Dashboard</a>
          </li>
          <li>
            <a href="/cursos">Cursos</a>
          </li>
          <li>
            <a href="/tutores">Tutores</a>
          </li>
          <li>
            <a href="/deseos">Lista de Deseos</a>
          </li>
          <li>
            <a href="/ajustes">Ajustes</a>
          </li>
        </ul>
      </nav>
    </>
  );
}