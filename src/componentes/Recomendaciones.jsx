import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para la navegación
import { obtenerTemas } from '../api'; // Asegúrate de importar la función correctamente

const Recomendaciones = () => {
  const [temas, setTemas] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarTemas = async () => {
      try {
        console.log("Cargando temas...");
        const response = await obtenerTemas(2);
        console.log("Datos recibidos desde la API:", response);

        if (response && Array.isArray(response.data)) {
          // Mostrar solo los primeros 3 temas
          const primerosTresTemas = response.data.slice(0, 4); // Seleccionamos los primeros 4 temas
          setTemas(primerosTresTemas); // Guardamos los primeros 3 temas
          setError(null);
        } else {
          setError("No se encontraron datos en la respuesta");
        }
      } catch (err) {
        setError("Error al obtener las recomendaciones");
        console.error("Error al hacer la solicitud", err);
      }
    };

    cargarTemas();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
      <div className="recomendaciones">
        <h2>Recomendaciones para ti</h2>
        <div className="contenedor-tarjetas">
          {temas.map((tema) => (
              <div
                  className="card"
                  key={tema.idTema}
                  onClick={() => navigate(`/temas/detalles/${tema.idTema}`)} // Redirige al hacer clic
                  style={{ cursor: "pointer" }} // Cambia el cursor a puntero
              >
                <img
                    src={tema.miniaturaTema}
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

export default Recomendaciones;
