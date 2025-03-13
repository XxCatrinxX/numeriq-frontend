import React, { useEffect, useState } from "react";
import { obtenerTemas } from "../../api";
import { useNavigate } from "react-router-dom";
import "../../CSS/estudiante/estudiante.css";
import Footer from "../Footer";
import Nav from "./nav"

export default function Inicio() {
  const [temas, setTemas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [error, setError] = useState(null);

  const [categorias, setCategorias] = useState([]); // Lista de categorías
  const [niveles, setNiveles] = useState([]); // Lista de niveles

  const [categoria, setCategoria] = useState("");
  const [nivel, setNivel] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  const navigate = useNavigate();
  return (
    <>

    <Nav />

      <h1>Dashboard</h1>

      <section className="panel-estudiante">

        <section id="horas-estudio" className="horas-estudio">
          <div className="icono">
            <img src="" alt="icono" />
          </div>

          <div className="datos">
          <p className="titulo">Horas de Estudio</p>
          <p>000</p>
          </div>
          {/* Aquí puedes añadir más detalles sobre las horas de estudio */}
        </section>

        <section id="horas-estudio" className="horas-estudio">
          <div className="icono">
            <img src="" alt="icono" />
          </div>

          <div className="datos">
          <p className="titulo">Horas de Estudio</p>
          <p>000</p>
          </div>
          {/* Aquí puedes añadir más detalles sobre las horas de estudio */}
        </section>

        <section id="horas-estudio" className="horas-estudio">
          <div className="icono">
            <img src="" alt="icono" />
          </div>

          <div className="datos">
          <p className="titulo">Horas de Estudio</p>
          <p>000</p>
          </div>
          {/* Aquí puedes añadir más detalles sobre las horas de estudio */}
        </section>

        <section id="horas-estudio" className="horas-estudio">
          <div className="icono">
            <img src="" alt="icono" />
          </div>

          <div className="datos">
          <p className="titulo">Horas de Estudio</p>
          <p>000</p>
          </div>
          {/* Aquí puedes añadir más detalles sobre las horas de estudio */}
        </section>

        <section id="horas-estudio" className="horas-estudio">
          <div className="icono">
            <img src="" alt="icono" />
          </div>

          <div className="datos">
          <p className="titulo">Horas de Estudio</p>
          <p>000</p>
          </div>
          {/* Aquí puedes añadir más detalles sobre las horas de estudio */}
        </section>

      </section>

      <section id="cursos-comprados" className="panel-estudiante">
        <h2>Cursos Comprados</h2>
        {/* LISTADO DE TEMAS */}
        {error && <p>{error}</p>}
        {temas.length > 0 ? (
          temas.map((tema) => (
            <div
              className="card"
              key={tema.idTema}
              onClick={() => navigate(`/temas/detalles/${tema.idTema}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={tema.imagenTema}
                alt={tema.nombreTema}
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
              />
              <div className="card-content">
                <h3 className="card-title">{tema.nombreTema}</h3>
                <p className="card-description">{tema.descripcionTema}</p>
                <p className="card-info">Usuarios: {tema.numUsuarios}</p>
                <p className="card-info">Likes: {tema.likes}</p>
                <p className="card-info">Precio: ${tema.precio}</p>
                <p className="card-info">Categoría: {tema.idCategoria}</p>
                <p className="card-info">Nivel: {tema.idNivel}</p>
                <p className="card-info">
                  Horas de Contenido: {tema.horasContenido}
                </p>
                <p className="card-info">Idioma: {tema.idioma}</p>
                <p className="card-info">
                  Certificado: {tema.certificado ? "Sí" : "No"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron temas.</p>
        )}
      </section>

      <Footer />
    </>
  );
}
