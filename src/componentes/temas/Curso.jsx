import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../CSS/Curso.css";

const Curso = ({ idTema, nombreTema }) => {
  const [inscrito, setInscrito] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verificarInscripcion = async () => {
      try {
        const response = await axios.get(`/api/progreso/${idTema}`);
        if (response.data) {
          setInscrito(true);
          setProgreso(response.data.progreso);
        }
      } catch (err) {
        console.error("Error al verificar la inscripción", err);
      }
    };

    verificarInscripcion();
  }, [idTema]);

  const inscribirse = async () => {
    try {
      await axios.post(`/api/inscribir/${idTema}`);
      setInscrito(true);
      setProgreso(0);
    } catch (err) {
      setError("Error al inscribirse en el curso");
      console.error("Error al inscribirse en el curso", err);
    }
  };

  return (
    <div className="curso-container">
      <h3>{nombreTema}</h3>
      {inscrito ? (
        <div className="progreso-container">
          <div className="progreso-circular">
            <svg className="progreso-svg" viewBox="0 0 36 36">
              <path
                className="progreso-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="progreso-bar"
                strokeDasharray={`${progreso}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="progreso-text">{progreso}%</div>
          </div>
        </div>
      ) : (
        <button className="button_Temas" onClick={inscribirse}>
          Inscribirse
        </button>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Curso;