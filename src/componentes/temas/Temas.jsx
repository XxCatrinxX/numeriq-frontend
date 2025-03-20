import React, { useEffect, useState } from "react";
import { obtenerTemas } from "../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importamos axios para hacer solicitudes
import "../../CSS/TemasCard.css";
import {agregarAlCarrito} from "../../api";


const ListaTemas = () => {
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

  // Cargar categorías y niveles al iniciar
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

  // Cargar temas (con filtros aplicados)
  useEffect(() => {
    const cargarTemas = async () => {
      try {
        let url = `http://127.0.0.1:8000/api/temas?page=${paginaActual}`;

        // Agregar filtros a la URL
        if (categoria) url += `&categoria=${categoria}`;
        if (nivel) url += `&nivel=${nivel}`;
        if (precioMin) url += `&precioMin=${precioMin}`;
        if (precioMax) url += `&precioMax=${precioMax}`;

        console.log("Cargando temas con:", { categoria, nivel, precioMin, precioMax });

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
  }, [paginaActual, categoria, nivel, precioMin, precioMax]); // Se ejecuta cuando cambian los filtros

  // Actualiza la página y recarga los temas
  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };
  // Función para manejar la acción de agregar al carrito
  const manejarAgregarAlCarrito = async (idTema) => {
    try {
      const resultado = await agregarAlCarrito(idTema);
      alert("El tema se ha agregado al carrito exitosamente.");
    } catch (error) {
      alert("Hubo un error al agregar el tema al carrito.");
    }
  };
  return (
      <div className="container">
        {/* FILTROS */}
        <div className="filters">
          <h3>Filtrar</h3>
          <div>
            <label>Categoría:</label>
            <select onChange={(e) => setCategoria(e.target.value)} value={categoria}>
              <option value="">Todas</option>
              {categorias.map((cat) => (
                  <option key={cat.idCategoria} value={cat.idCategoria}>
                    {cat.nombreCategoria}
                  </option>
              ))}
            </select>
          </div>

          <div>
            <label>Nivel:</label>
            <select onChange={(e) => setNivel(e.target.value)} value={nivel}>
              <option value="">Todos</option>
              {niveles.map((niv) => (
                  <option key={niv.idNivel} value={niv.idNivel}>
                    {niv.nombreNivel}
                  </option>
              ))}
            </select>
          </div>

          <div>
            <label>Precio Mínimo:</label>
            <input type="number" value={precioMin} onChange={(e) => setPrecioMin(e.target.value)} />
          </div>

          <div>
            <label>Precio Máximo:</label>
            <input type="number" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} />
          </div>
        </div>

        {/* LISTADO DE TEMAS */}
        {error && <p>{error}</p>}
        <div className="temas-listado">
          {temas.length > 0 ? (
              temas.map((tema) => (
                  <div
                      className="card"
                      key={tema.idTema}
                      onClick={() => navigate(`/temas/detalles/${tema.idTema}`)}
                      style={{ cursor: "pointer" }}
                  >
                    <img src={tema.imagenTema} alt={tema.nombreTema} onError={(e) => (e.target.src = "/fallback-image.jpg")} />
                    <div className="card-content">
                      <h3 className="card-title">{tema.nombreTema}</h3>
                      <p className="card-description">{tema.descripcionTema}</p>
                      <p className="card-info">Usuarios: {tema.numUsuarios}</p>
                      <p className="card-info">Likes: {tema.likes}</p>
                      <p className="card-info">Precio: ${tema.precio}</p>
                      <p className="card-info">Nivel: {tema.idNivel}</p>
                      <p className="card-info">Horas de Contenido: {tema.horasContenido}</p>
                      <p className="card-info">Idioma: {tema.idioma}</p>
                      <p className="card-info">Certificado: {tema.certificado ? "Sí" : "No"}</p>
                      <button
                          className="agregar-al-carrito-btn"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevenir que se dispare el onClick de la card
                            manejarAgregarAlCarrito(tema.idTema);
                          }}
                      >
                        Agregar al Carrito
                      </button>
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
                      disabled={num === paginaActual}
                      style={{
                        margin: "5px",
                        padding: "10px",
                        backgroundColor: num === paginaActual ? "blue" : "gray",
                        color: "white",
                        border: "none",
                        cursor: num === paginaActual ? "default" : "pointer",
                      }}
                  >
                    {num}
                  </button>
              ))}
            </div>
        )}
      </div>
  );

};

export default ListaTemas;

