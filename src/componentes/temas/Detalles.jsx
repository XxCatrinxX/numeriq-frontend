import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerTemaPorId } from "../../api"; // Importa la función de la API

const DetalleTema = () => {
  const { idTema } = useParams(); // Obtiene el ID desde la URL
  const [tema, setTema] = useState(null);
  const [recursos, setRecursos] = useState([]); // Estado para los recursos
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarTema = async () => {
        console.log("ID del tema:", idTema);
      try {
        const response = await obtenerTemaPorId(idTema); // Llama a la función API
        console.log(response);
        if (response && response.tema) {
          setTema(response.tema); // Setea el nombre del tema
          setRecursos(response.recursos); // Setea los recursos
        } else {
          setError("No se encontraron detalles para este tema.");
        }
      } catch (err) {
        setError("Error al obtener los detalles del tema.");
        console.error(err);
      }
    };

    cargarTema();
  }, [idTema]);

  if (error) return <p>{error}</p>;
  if (!tema) return <p>Cargando...</p>;

  return (
    <div className="detalle-tema">
      <h1>{tema}</h1> {/* Muestra el nombre del tema */}
      
      <div className="recursos">
        <h2>Recursos:</h2>
        {recursos.length === 0 ? (
          <p>No hay recursos disponibles.</p>
        ) : (
          <ul>
            {recursos.map((recurso) => (
              <li key={recurso.idRecurso}>
                <h3>{recurso.tituloRecurso}</h3>
                <p>{recurso.descripcionRecurso}</p>
                <a href={recurso.enlaceRecurso} target="_blank" rel="noopener noreferrer">
                  Ver recurso
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DetalleTema;
