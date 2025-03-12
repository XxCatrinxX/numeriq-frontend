import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerTemas } from "../api";

export default function CarruselCursos() {
  const [temas, setTemas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(3); // Controlamos la página actual
  const [totalPaginas, setTotalPaginas] = useState(0); // Controlamos el total de páginas
  const [error, setError] = useState(null); // Manejamos errores
  const [indice, setIndice] = useState(0); // Para manejar el índice del carrusel
  const navigate = useNavigate();

  useEffect(() => {
    const cargarTemas = async () => {
      try {
        console.log("Cargando temas para la página:", paginaActual);
        const response = await obtenerTemas(paginaActual);
        console.log("Datos recibidos desde la API:", response);

        if (response && Array.isArray(response.data)) {
          setTemas(response.data);
          setTotalPaginas(response.last_page); // Establecemos la cantidad total de páginas
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
  }, [paginaActual]);

  const siguienteCurso = () => {
    setIndice((prev) => (prev + 3) % temas.length); // Cambiar a 3 temas a la vez
  };

  // Configurar el intervalo para cambiar los temas automáticamente
  useEffect(() => {
    const intervalo = setInterval(siguienteCurso, 3000); // Cambio de tema cada 3 segundos
    return () => clearInterval(intervalo); // Limpiar el intervalo cuando el componente se desmonte
  }, [temas]); // Solo ejecuta el intervalo cuando los temas cambien

  return (
      <div className="recomendaciones">
        <h2>Cursos Destacados</h2>
        <div className="contenedor-tarjetas">
          {temas.slice(indice, indice + 3).map((tema, index) =>  (
              <div
                  className="card"
                  key={tema.idTema}
                  onClick={() => navigate(`/temas/detalles/${tema.idTema}`)} // Redirige al hacer clic
                  style={{ cursor: "pointer" }} // Cambia el cursor a puntero
              >
                <img
                    src={tema.imagenTema}
                    alt={tema.nombreTema}
                    onError={(e) => (e.target.src = "/fallback-image.jpg")} // Imagen por defecto si falla
                />
                <div className="card-content">
                  <h3 className="card-title">{tema.nombreTema}</h3>
                  <p className="card-description">{tema.descripcionTema}</p>
                  <p className="card-info">Usuarios: {tema.numUsuarios}</p>
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
          ))}
        </div>

        {/* Mostrar error si existe */}
        {error && <p className="error">{error}</p>}
      </div>
  );
};
