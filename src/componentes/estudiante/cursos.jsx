import React from "react";
import Nav from "./nav";
import "../../CSS/estudiante/cur_estu.css";
import Footer from "../Footer";

export default function Cursos() {
  return (
    <>
      <Nav />

      <div>
        <h1>Cursos (Numero de cursos) </h1>
      </div>

      <div className="filtrado">
        <div>
          <label htmlFor="">Buscar:</label>
          <input type="text" placeholder="Buscar en tus cursos..." />
        </div>

        <div>
          <label htmlFor="">Filtrar por:</label>
          <select name="" id="">
            <option value="">Mas reciente</option>
          </select>
        </div>

        <div>
          <label htmlFor="">Estado:</label>
          <select name="" id="">
            <option value="">Todos los cursos</option>
          </select>
        </div>

        <div>
          <label htmlFor="">Profesor:</label>
          <select name="" id="">
            <option value="">Todos los profesores</option>
          </select>
        </div>
      </div>

      <Footer />
    </>
  );
}
