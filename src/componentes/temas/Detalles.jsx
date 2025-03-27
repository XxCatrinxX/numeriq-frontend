import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { obtenerTemaPorId, obtenerProgreso, actualizarProgreso } from "../../api";
import "../../CSS/detalles.css";
import "../../CSS/curso.css";

const DetalleTema = () => {
  const { idTema } = useParams();
  const [tema, setTema] = useState(null);
  const [recursos, setRecursos] = useState([]);
  const [error, setError] = useState(null);
  const [progreso, setProgreso] = useState(0); // Inicialmente 0
  const [videoActual, setVideoActual] = useState(null);
  const videoRef = useRef(null);
  const idUsuario = 1; // Asumiendo que el id del usuario está disponible

  useEffect(() => {
    const cargarTema = async () => {
      console.log("ID del tema:", idTema);
      try {
        const response = await obtenerTemaPorId(idTema);
        if (response && response.tema) {
          setTema(response.tema);
          setRecursos(response.recursos.filter((r) => r.tipoRecurso === "Video"));
          // Obtener el progreso actual al cargar el tema
          const progresoActual = await obtenerProgreso(idTema, idUsuario);
          setProgreso(progresoActual.progreso);
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

  const handleVideoClick = (enlaceRecurso, idRecurso) => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = enlaceRecurso;
      videoRef.current.load();
      videoRef.current
        .play()
        .catch((error) => console.error("Error al reproducir el video:", error));
    }
    setVideoActual(enlaceRecurso);

    // Llamar a la función para actualizar el progreso
    handleVideoEnded(idTema, idRecurso); // Aquí pasamos idTema y idRecurso
  };

  const handleVideoEnded = async (idTema, idRecurso) => {
    // Asegúrate de que idRecurso y idTema estén definidos
    console.log("idTema:", idTema, "idRecurso:", idRecurso);

    if (idRecurso && idTema) {
      try {
        const data = await actualizarProgreso(idTema, idRecurso);
        console.log("Progreso actualizado:", data);
        // Actualiza el progreso basado en la respuesta de la API
        setProgreso(data.progreso);  // Asegúrate de que el API devuelva el progreso actualizado
      } catch (error) {
        console.error("Error al actualizar el progreso:", error);
      }
    } else {
      console.error("idTema o idRecurso no están definidos");
    }
  };

  const calcularProgreso = () => {
    // Calcula el progreso en función de cuántos recursos se han visto
    const recursosVistos = recursos.filter((r) => r.visto).length; // Este es solo un ejemplo
    return (recursosVistos / recursos.length) * 100;
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
              <video
                ref={videoRef}
                controls
                width="100%"
                src={videoActual}
                onEnded={() => handleVideoEnded(idTema, videoActual)} // Cambié esto para que pase el idTema y el videoActual
              />
            ) : (
              <p>Selecciona un video para ver</p>
            )}
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
                {recursos.map((recurso) => (
                  <li key={recurso.idRecurso}>
                    <button onClick={() => handleVideoClick(recurso.enlaceRecurso, recurso.idRecurso)}>
                      {recurso.tituloRecurso}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalleTema;
