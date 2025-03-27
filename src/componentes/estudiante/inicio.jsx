import React, { useEffect, useState } from "react";
import { obtenerCursosInscritos, obtenerProgreso, actualizarProgreso } from "../../api"; // Importamos las funciones para obtener los cursos y su progreso
import { useNavigate } from "react-router-dom";
import "../../CSS/estudiante/estudiante.css";
import Footer from "../Footer";
import Nav from "./nav";
import { CircularProgressbar } from 'react-circular-progressbar'; // Importar CircularProgressbar
import 'react-circular-progressbar/dist/styles.css'; // Estilos de la librería

export default function Inicio() {
  const [cursosInscritos, setCursosInscritos] = useState([]); // Estado para los cursos inscritos
  const [progresos, setProgresos] = useState({}); // Estado para almacenar el progreso de cada curso
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarCursosInscritos = async () => {
      try {
        const cursos = await obtenerCursosInscritos();
        setCursosInscritos(cursos);
        // Obtener progreso de cada curso al cargar los cursos
        cargarProgresoDeCursos(cursos);
      } catch (error) {
        setError("Error al cargar los cursos inscritos");
      }
    };

    cargarCursosInscritos();
  }, []);

  const cargarProgresoDeCursos = async (cursos) => {
    try {
      const nuevosProgresos = {};
      for (const curso of cursos) {
        console.log("ID del tema:", curso.idTema); // Verificar si el ID es correcto
        
        if (!curso.idTema) {
          console.warn("Curso sin idTema, se omitirá:", curso);
          continue;
        }
  
        const progreso = await obtenerProgreso(curso.idTema);
        console.log(`Progreso obtenido para ${curso.idTema}:`, progreso); // Verifica si la API está respondiendo correctamente
  
        nuevosProgresos[curso.idTema] = progreso;
      }
      setProgresos(nuevosProgresos);
    } catch (error) {
      console.error("Error al cargar el progreso de los cursos", error);
    }
    
  };

  useEffect(() => {
    console.log("Estado de progresos actualizado:", progresos);
  }, [progresos]);
  
  

  // Función para calcular el progreso (puedes ajustarla según tus necesidades)
  const calcularProgreso = (recursosVistos, totalRecursos) => {
    if (totalRecursos === 0) return 0; // Evitar división por cero
    return (recursosVistos / totalRecursos) * 100;
  };

  return (
    <>
      <Nav />
      <h1>Dashboard</h1>

      <section className="panel-estudiante">
        <section id="horas-estudio" className="horas-estudio">
          <div className="icono">
            <img src="" alt="icono" />
          </div>
          <div className="datos">
            <p className="titulo">Horas de Estudio</p>
            <p>000</p>
          </div>
        </section>
      </section>

      <section id="cursos-comprados" className="panel-estudiante">
        <h2>Temas Inscritos</h2>
        {error && <p>{error}</p>}
        {cursosInscritos.length > 0 ? (
          cursosInscritos.map((curso) => {
            const tema = curso.tema || {}; // Prevención de errores si no existe 'tema'
            const porcentajeProgreso = progresos[curso.idTema]?.progreso || 0;

            return (
              <div
                className="cardProgress"
                key={tema.idTema}
                onClick={() => navigate(`/temas/detalles/${tema.idTema}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={tema.miniaturaTema || "/fallback-image.jpg"}
                  alt={tema.nombreTema}
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                />
                <div className="cardProgress-content">
                  <h3 className="cardProgress-title">{tema.nombreTema}</h3>
                  <p className="cardProgress-description">{tema.descripcionTema}</p>
                  <p className="cardProgress-info">Usuarios: {tema.numUsuarios}</p>
                  <p className="cardProgress-info">Likes: {tema.likes}</p>
                  <p className="cardProgress-info">Precio: ${tema.precio}</p>
                  <p className="cardProgress-info">Categoría: {tema.idCategoria}</p>
                  <p className="cardProgress-info">Nivel: {tema.idNivel}</p>
                  <p className="cardProgress-info">
                    Horas de Contenido: {tema.horasContenido}
                  </p>
                  <p className="cardProgress-info">Idioma: {tema.idioma}</p>
                  <p className="cardProgress-info">
                    Certificado: {tema.certificado ? "Sí" : "No"}
                  </p>
                  <div className="progress-circle">
                    {/* Aquí agregamos el gráfico circular */}
                    <CircularProgressbar
                      value={porcentajeProgreso}
                      text={`${Math.round(porcentajeProgreso)}%`} // Redondeamos el porcentaje
                      styles={{
                        path: {
                          stroke: `rgba(62, 152, 199, ${porcentajeProgreso / 100})`, // color dinámico
                          strokeWidth: 10
                        },
                        trail: {
                          stroke: '#d6d6d6',
                          strokeWidth: 10
                        },
                        text: {
                          fill: '#333',
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No estás inscrito en ningún curso.</p>
        )}
      </section>

      <Footer />
    </>
  );
}
