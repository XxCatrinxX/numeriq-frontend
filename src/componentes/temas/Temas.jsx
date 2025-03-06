import React, { useEffect, useState } from "react";
import { obtenerTemas } from "../../api";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../../CSS/TemasCard.css"; // Importa los estilos

const ListaTemas = () => {
  const [temas, setTemas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [error, setError] = useState(null);

  const [categoria, setCategoria] = useState("");
  const [nivel, setNivel] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  const navigate = useNavigate(); // Hook para redireccionar

  const aplicarFiltros = () => {
    console.log("Aplicando filtros con:", { categoria, nivel, precioMin, precioMax });
    // Aquí puedes hacer una nueva llamada a la API con los filtros aplicados
  };

  useEffect(() => {
    const cargarTemas = async () => {
      try {
        console.log("Cargando temas para la página:", paginaActual);
        const response = await obtenerTemas(paginaActual);
        console.log("Datos recibidos desde la API:", response);

        if (response && Array.isArray(response.data)) {
          setTemas(response.data);
          setTotalPaginas(response.last_page);
          setError(null);
        } else {
          setError("No se encontraron datos en la respuesta");
        }
      } catch (err) {
        setError("Error al obtener los temas");
        console.error("Error al hacer la solicitud", err);
      }
    };

    cargarTemas();
  }, [paginaActual]); // Solo se ejecuta cuando cambia la página

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  return (
    <div className="container">
      <div className="filters">
        <h3>Filtrar</h3>
        <div>
          <label>Categoría:</label>
          <select
            onChange={(e) => setCategoria(e.target.value)}
            value={categoria}
          >
            <option value="">Todas</option>
            <option value="1">Categoría 1</option>
            <option value="2">Categoría 2</option>
            <option value="3">Categoría 3</option>
          </select>
        </div>

        <div>
          <label>Nivel:</label>
          <select onChange={(e) => setNivel(e.target.value)} value={nivel}>
            <option value="">Todos</option>
            <option value="1">Nivel 1</option>
            <option value="2">Nivel 2</option>
            <option value="3">Nivel 3</option>
          </select>
        </div>

        <div>
          <label>Precio Mínimo:</label>
          <input
            type="number"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
          />
        </div>

        <div>
          <label>Precio Máximo:</label>
          <input
            type="number"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
          />
        </div>

        <button onClick={aplicarFiltros}>Filtrar</button>
      </div>

      {error && <p>{error}</p>}
      {temas.length > 0 ? (
        temas.map((tema) => (
          <div
            className="card"
            key={tema.idTema}
            onClick={() => navigate(`/temas/detalles/${tema.idTema}`)} // Redirige al hacer clic
            style={{ cursor: "pointer" }} // Cambia el cursor a puntero
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

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => cambiarPagina(num)} // Cambiar página
              disabled={num === paginaActual} // Deshabilitar botón de la página actual
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
