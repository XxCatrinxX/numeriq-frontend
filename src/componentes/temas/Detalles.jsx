import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerTemaPorId } from "../../api";
import "../../CSS/detalles.css" // Importa la función de la API
import "../../CSS/curso.css";


const DetalleTema = () => {
  const { idTema } = useParams(); // Obtiene el ID desde la URL
  const [tema, setTema] = useState(null);
  const [recursos, setRecursos] = useState([]); // Estado para los recursos
  const [error, setError] = useState(null);
  const [progreso, setProgreso] = useState(55);

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
    <>

<div className="curso-container">
      <div className="curso-header">
        <h1>{tema}</h1>
      </div>

      <div className="curso-content">
        <div className="video-placeholder">
          <p>Video/ imagen</p> 
        </div>

        <div className="curso-sidebar">
          <p className="progreso-label">Tu progreso</p>
          <div className="progreso-bar">
            <div className="progreso-fill" style={{ width: `${progreso}%` }}></div>
          </div>
          <p className="progreso-text">{progreso}%</p>

          <div className="curso-temario">
            <h3>Contenido del Curso</h3>
            <ul>
              <li><strong>Tema 1:</strong> Fundamentos Básicos</li>
              <li><strong>Tema 2:</strong> Conceptos de programacion</li>
              <li><strong>Tema 3:</strong> Tipos de variables</li>
              <li><strong>Tema 4:</strong> Condicionales</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="curso-footer">
        <p>Aprende {tema}</p>
        <p>⭐ 4.5 (1,000 valoraciones) | 1,000 estudiantes | 35.5 horas</p>
        <button className="certificado-btn">Certificado de NumerIQ</button>
      </div>
    </div>

    <div className="detalle-tema">

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
    </>
  );
};

export default DetalleTema;
