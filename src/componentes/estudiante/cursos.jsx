import React, { useState, useEffect } from "react";
import Nav from "./nav";
import "../../CSS/estudiante/cur_estu.css";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cursos() {
  const [temas, setTemas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [error, setError] = useState(null);

  const [categorias, setCategorias] = useState([]);
  const [niveles, setNiveles] = useState([]);

  const [categoria, setCategoria] = useState("");
  const [nivel, setNivel] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resCategorias, resNiveles] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/categorias"),
          axios.get("http://127.0.0.1:8000/api/niveles"),
        ]);

        setCategorias(resCategorias.data);
        setNiveles(resNiveles.data);
      } catch (error) {
        console.error("Error al cargar categorías o niveles", error);
      }
    };

    cargarDatos();
  }, []);

  useEffect(() => {
    const cargarTemas = async () => {
      try {
        let url = `http://127.0.0.1:8000/api/temas?page=${paginaActual}`;
        if (categoria) url += `&categoria=${categoria}`;
        if (nivel) url += `&nivel=${nivel}`;
        if (precioMin) url += `&precioMin=${precioMin}`;
        if (precioMax) url += `&precioMax=${precioMax}`;


        const response = await axios.get(url);
        if (response.data && Array.isArray(response.data.data)) {
          setTemas(response.data.data);
          setTotalPaginas(response.data.last_page);
          setError(null);
        } else {
          setError("No se encontraron datos");
        }
      } catch (err) {
        setError("Error al obtener los temas");
        console.error("Error en la solicitud", err);
      }
    };

    cargarTemas();
  }, [paginaActual, categoria, nivel, precioMin, precioMax]);

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  return (
      <>
        <Nav/>

        <div>
          <h1>Cursos (Número de cursos: {temas.length})</h1>
        </div>

        <div className="filtrado">
          <div>
            <label htmlFor="categoria">Categoría:</label>
            <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Todas las categorías</option>
              {categorias.map((cat) => (
                  <option key={cat.idCategoria} value={cat.idCategoria}>
                    {cat.nombreCategoria}
                  </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="nivel">Nivel:</label>
            <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
              <option value="">Todos los niveles</option>
              {niveles.map((niv) => (
                  <option key={niv.idNivel} value={niv.idNivel}>
                    {niv.nombreNivel}
                  </option>))}
            </select>
          </div>



          <div>
            <label htmlFor="">Profesor:</label>
            <select name="" id="">
              <option value="">Todos los profesores</option>
            </select>
          </div>
        </div>

        {/* LISTADO DE TEMAS */}
        {error && <p>{error}</p>}
        <div className="card-container">
          {temas.length > 0 ? (
              temas.map((tema) => (
                  <div
                      className="card"
                      key={tema.idTema}
                      onClick={() => navigate(`/temas/detalles/${tema.idTema}`)}
                  >
                    <img src={tema.imagenTema} alt={tema.nombreTema}
                         onError={(e) => (e.target.src = "/fallback-image.jpg")}/>
                    <div className="card-content">
                      <h3 className="card-title">{tema.nombreTema}</h3>
                      <p className="card-description">{tema.descripcionTema}</p>
                      <p className="card-info">Usuarios: {tema.numUsuarios}</p>
                      <p className="card-info">Likes: {tema.likes}</p>
                      <p className="card-info">Precio: ${tema.precio}</p>
                      <p className="card-info">Categoría: {tema.idCategoria}</p>
                      <p className="card-info">Nivel: {tema.idNivel}</p>
                      <p className="card-info">Horas de Contenido: {tema.horasContenido}</p>
                      <p className="card-info">Idioma: {tema.idioma}</p>
                      <p className="card-info">Certificado: {tema.certificado ? "Sí" : "No"}</p>
                    </div>
                  </div>
              ))
          ) : (
              <p>No se encontraron temas.</p>
          )}
        </div>

        {/* PAGINACIÓN */}
        {totalPaginas > 1 && (
            <div className="pagination">
              {Array.from({length: totalPaginas}, (_, i) => i + 1).map((num) => (
                  <button
                      key={num}
                      onClick={() => cambiarPagina(num)}
                      disabled={num === paginaActual}>
                    {num}
                  </button>
              ))}
            </div>
        )}

        <Footer/>
      </>
  );
}
