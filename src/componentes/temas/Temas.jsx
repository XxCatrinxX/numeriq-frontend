import React, { useEffect, useState } from "react";
import { obtenerTemas, agregarDeseo, obtenerUsuarioAutenticado, agregarAlCarrito, inscribirEnTema } from "../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../CSS/TemasCard.css";

const ListaTemas = () => {
  const [temas, setTemas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [idTema, setIdTema] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [niveles, setNiveles] = useState([]);

  const [categoria, setCategoria] = useState("");
  const [nivel, setNivel] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [estrellas, setEstrellas] = useState(0);
  const [hoverEstrellas, setHoverEstrellas] = useState(0);

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
        if (categoria) url += `&categoria=${categoria}`;
        if (nivel) url += `&nivel=${nivel}`;
        if (precioMin) url += `&precioMin=${precioMin}`;
        if (precioMax) url += `&precioMax=${precioMax}`;
        if (estrellas) url += `&estrellas=${estrellas}`;

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
  }, [paginaActual, categoria, nivel, precioMin, precioMax, estrellas]);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const data = await obtenerUsuarioAutenticado();
        setUsuario(data);
      } catch (error) {
        console.error("Error obteniendo el usuario:", error);
        setError("Hubo un error al obtener el usuario");
      }
    };

    fetchUsuario();
  }, []);

  // Obtener el nombre de la categoría por id
  const obtenerNombreCategoria = (id) => {
    const cat = categorias.find((c) => c.idCategoria === id);
    return cat ? cat.nombreCategoria : "Sin categoría";
  };

  // Obtener el nombre del nivel por id
  const obtenerNombreNivel = (id) => {
    const niv = niveles.find((n) => n.idNivel === id);
    return niv ? niv.nombreNivel : "Sin nivel";
  };

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

  const handleAgregarDeseo = async (idTema) => {
    try {
      await agregarDeseo(idTema);
      alert("Se agregó a la lista de deseos correctamente.");
    } catch (error) {
      alert("Hubo un error al agregar a la lista de deseos.");
    }
  };

  const handleInscribirse = async (idTema) => {
    if(!usuario){
      alert("Debes iniciar sesion para inscribirte a un tema.");
      return;
    }

    if(usuario.rol !== "estudiante"){
      alert("Debes ser un estudiante para inscribirte a un tema.");
      return;
    }

    try {
      await inscribirEnTema(idTema);
      alert("Te has inscrito en el tema exitosamente.");
    } catch (error) {
      alert("Hubo un error al inscribirte en el tema.");
    }
  };

  const handleStarClick = (index) => {
    setEstrellas(index + 1);
  };

  const handleStarMouseEnter = (index) => {
    setHoverEstrellas(index + 1);
  };

  const handleStarMouseLeave = () => {
    setHoverEstrellas(0);
  };

  return (
    <>
      <div className="container_Temas">
        {/* FILTROS */}
        <div className="filters">
          <h3>Filtrar</h3>
          <div>
            <label>Categoría:</label>
            <select
              onChange={(e) => setCategoria(e.target.value)}
              value={categoria}
            >
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

          <div className="price-inputs">
            <label htmlFor="precioMin">Precio Mínimo</label>
            <input
              type="number"
              id="precioMin"
              name="precioMin"
              placeholder="0"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
            />

            <label htmlFor="precioMax">Precio Máximo</label>
            <input
              type="number"
              id="precioMax"
              name="precioMax"
              placeholder="1000"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
            />
          </div>

          <div className="star-inputs">
            <label htmlFor="estrellas">Número de Estrellas</label>
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <i
                  key={index}
                  className={`fas fa-star ${
                    index < (hoverEstrellas || estrellas) ? "active" : ""
                  }`}
                  onClick={() => handleStarClick(index)}
                  onMouseEnter={() => handleStarMouseEnter(index)}
                  onMouseLeave={handleStarMouseLeave}
                ></i>
              ))}
            </div>
          </div>

          {/* Otros filtros */}
        </div>

        {/* LISTADO DE TEMAS */}
        {error && <p>{error}</p>}
        <div className="temas-listado">
          {temas.length > 0 ? (
            temas.map((tema) => (
              <div
                className="card_Temas"
                key={tema.idTema}
                onClick={() => navigate(`/temas/detalles/${tema.idTema}`)}
                style={{ cursor: "pointer" }}
              >
                {tema.miniaturaTema.endsWith(".mp4") ? (
                  <video
                    src={
                      tema.miniaturaTema.startsWith("http") ||
                      tema.miniaturaTema.startsWith("/")
                        ? tema.miniaturaTema
                        : `/videos/${tema.miniaturaTema}`
                    }
                    muted
                    loop
                    preload="metadata"
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => e.target.pause()}
                    style={{ width: "100%", borderRadius: "10px" }}
                  >
                    Tu navegador no soporta la reproducción de video.
                  </video>
                ) : (
                  <img
                    src={
                      tema.miniaturaTema.startsWith("http") ||
                      tema.miniaturaTema.startsWith("/")
                        ? tema.miniaturaTema
                        : `/image/${tema.miniaturaTema}`
                    }
                    alt={tema.nombreTema}
                    onError={(e) => (e.target.src = "/fallback-image.jpg")}
                  />
                )}

                <div className="card-content_Temas">
                  <h3 className="card-title_Temas">{tema.nombreTema}</h3>
                  <p className="card-description_Temas">
                    {tema.descripcionTema}
                  </p>
                  <p className="card-info_Temas">
                    Usuarios: {tema.numUsuarios}
                  </p>
                  <p className="card-info_Temas">Likes: {tema.likes}</p>
                  <p className="card-info_Temas">Precio: ${tema.precio}</p>
                  <p className="card-info_Temas">
                    Categoría: {obtenerNombreCategoria(tema.idCategoria)}
                  </p>
                  <p className="card-info_Temas">
                    Nivel: {obtenerNombreNivel(tema.idNivel)}
                  </p>
                  <p className="card-info_Temas">
                    Horas de Contenido: {tema.horasContenido}
                  </p>
                  <p className="card-info_Temas">Idioma: {tema.idioma}</p>
                  <p className="card-info_Temas">
                    Certificado: {tema.certificado ? "Sí" : "No"}
                  </p>
                  <button
                    className="button_Temas"
                    onClick={(e) => {
                      e.stopPropagation();
                      manejarAgregarAlCarrito(tema.idTema);
                    }}
                  >
                    Agregar al Carrito
                  </button>

                  {/* Botón de Corazón para añadir a lista de deseos */}
                  <button
                    className="button_Temas"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAgregarDeseo(tema.idTema);
                    }}
                  >
                    <i className="fas fa-heart"></i>
                  </button>

                  {/* Botón para inscribirse al tema */}
                  <button
                    className="button_Temas"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInscribirse(tema.idTema);
                    }}
                  >
                    Inscribirse al tema
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron temas.</p>
          )}
        </div>
      </div>

      <div>
        {/* PAGINACIÓN */}
        {totalPaginas > 1 && (
          <div className="pagination_Temas">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
              (num) => (
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
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ListaTemas;
