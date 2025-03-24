import React, { useEffect, useState } from "react";
import { obtenerTemas, agregarDeseo, obtenerUsuarioAutenticado } from "../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../CSS/TemasCard.css";

const ListaTemas = () => {
  const [temas, setTemas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const [categorias, setCategorias] = useState([]);
  const [niveles, setNiveles] = useState([]);

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

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  const obtenerFechaActual = () => {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  };

  const handleAgregarDeseo = async (idTema) => {
    if (!usuario) {
      alert("Debes iniciar sesión para agregar a la lista de deseos");
      return;
    }
    const fecha = obtenerFechaActual();
    if (!idTema || !usuario.idUsuario || !fecha) {
      alert("Faltan datos necesarios para agregar el deseo");
      return;
    }

    try {
      await agregarDeseo(usuario.idUsuario, idTema, fecha);
      alert("Tema agregado a la lista de deseos");
    } catch (error) {
      console.error("Error agregando a la lista de deseos:", error);
      alert("Hubo un error al agregar a la lista de deseos");
    }
  };

  // Obtener el nombre de la categoría por id
  const obtenerNombreCategoria = (id) => {
    const cat = categorias.find(c => c.idCategoria === id);
    return cat ? cat.nombreCategoria : "Sin categoría";
  };

  // Obtener el nombre del nivel por id
  const obtenerNombreNivel = (id) => {
    const niv = niveles.find(n => n.idNivel === id);
    return niv ? niv.nombreNivel : "Sin nivel";
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
              <option key={cat.idCategoria} value={cat.idCategoria}>{cat.nombreCategoria}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Nivel:</label>
          <select onChange={(e) => setNivel(e.target.value)} value={nivel}>
            <option value="">Todos</option>
            {niveles.map((niv) => (
              <option key={niv.idNivel} value={niv.idNivel}>{niv.nombreNivel}</option>
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
              {tema.miniaturaTema.endsWith('.mp4') ? (
  <video
    src={tema.miniaturaTema.startsWith('http') || tema.miniaturaTema.startsWith('/') ? tema.miniaturaTema : `/videos/${tema.miniaturaTema}`}
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
    src={tema.miniaturaTema.startsWith('http') || tema.miniaturaTema.startsWith('/') ? tema.miniaturaTema : `/imagenes/${tema.miniaturaTema}`}
    alt={tema.nombreTema}
    onError={(e) => (e.target.src = "/fallback-image.jpg")}
  />
)}


              <div className="card-content">
                <h3 className="card-title">{tema.nombreTema}</h3>
                <p className="card-description">{tema.descripcionTema}</p>
                <p className="card-info">Usuarios: {tema.numUsuarios}</p>
                <p className="card-info">Likes: {tema.likes}</p>
                <p className="card-info">Precio: ${tema.precio}</p>
                <p className="card-info">Categoría: {obtenerNombreCategoria(tema.idCategoria)}</p>
                <p className="card-info">Nivel: {obtenerNombreNivel(tema.idNivel)}</p>
                <p className="card-info">Horas de Contenido: {tema.horasContenido}</p>
                <p className="card-info">Idioma: {tema.idioma}</p>
                <p className="card-info">Certificado: {tema.certificado ? "Sí" : "No"}</p>
                <button onClick={(e) => { e.stopPropagation(); handleAgregarDeseo(tema.idTema); }}>
                  <i className="fas fa-heart"></i> Agregar a la lista de deseos
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
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
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
