import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { obtenerTemaPorId } from "../../api";
import "../../CSS/detalles.css";
import "../../CSS/curso.css";

const DetalleTema = () => {
  const { idTema } = useParams();
  const [tema, setTema] = useState(null);
  const [recursos, setRecursos] = useState([]);
  const [error, setError] = useState(null);
  const [progreso, setProgreso] = useState(40);
  const [videoActual, setVideoActual] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const cargarTema = async () => {
      console.log("ID del tema:", idTema);
      try {
        const response = await obtenerTemaPorId(idTema);
        console.log(response);
        if (response && response.tema) {
          setTema(response.tema);
          setRecursos(
            response.recursos.filter((r) => r.tipoRecurso === "Video")
          );
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

  const handleVideoClick = (enlaceRecurso) => {
    if (videoRef.current) {
      videoRef.current.pause(); // 🔹 Pausa el video actual antes de cambiar la fuente
      videoRef.current.src = enlaceRecurso; // 🔹 Cambia la fuente del video
      videoRef.current.load(); // 🔹 Carga el nuevo video
  
      videoRef.current
        .play()
        .catch((error) => console.error("Error al reproducir el video:", error));
    }
    setVideoActual(enlaceRecurso); // 🔹 Guarda el video actual en el estado
  };
  

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
            {videoActual ? (
              <video ref={videoRef} controls width="100%" src={videoActual} />
            ) : (
              <p>Selecciona un video para ver</p>
            )}
          </div>

          <div className="curso-sidebar">
            <p className="progreso-label">Tu progreso</p>
            <div className="progreso-bar">
              <div
                className="progreso-fill"
                style={{ width: `${progreso}%` }}
              ></div>
            </div>
            <p className="progreso-text">{progreso}%</p>

            <div className="curso-temario">
              <h3>Contenido del Curso</h3>
              <ul>
                {recursos.map((recurso) => (
                  <li key={recurso.idRecurso}>
                    <button
                      onClick={() => handleVideoClick(recurso.enlaceRecurso)}
                    >
                      {recurso.tituloRecurso}
                    </button>
                  </li>
                ))}
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
        <h2>Contenido del Tema</h2>
        {recursos.length === 0 ? (
          <p>No hay recursos disponibles.</p>
        ) : (
          <ul>
            {recursos.map((recurso) => (
              <li key={recurso.idRecurso}>
                <h3>{recurso.tituloRecurso}</h3>
                <p>{recurso.descripcionRecurso}</p>
                <button onClick={() => handleVideoClick(recurso.enlaceRecurso)}>
                  Ver video
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DetalleTema;
