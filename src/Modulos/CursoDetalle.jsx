import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';  // Importar el hook
import Footer from 'src/componentes/Footer';
import Header from 'src/componentes/Header';

const cursos = [
  { id: 1, titulo: 'El presente indefinido de indicativo', descripcion: 'Descripción breve', precio: '199', categoria: 'Matemáticas', reseña: 5, video: '/videos/Render Mario0001-0150.mp4', detalles: { certificado: 'Disponible', duracion: '2 h (10 videocursos)', alumnos: '62', reseña: '4.9/5 (8 valoraciones)' }},
  { id: 2, titulo: 'Introducción a las matemáticas', descripcion: 'Descripción breve', precio: '199', categoria: 'Matemáticas', reseña: 4, video: '/videos/Render Mario0001-0150.mp4', detalles: { certificado: 'Disponible', duracion: '3 h (15 videocursos)', alumnos: '50', reseña: '4.8/5 (6 valoraciones)' }},
  // Más cursos...
];

const CursoDetalle = () => {
  const { id } = useParams();  // Obtener el ID del curso desde la URL
  const curso = cursos.find(curso => curso.id === parseInt(id));  // Buscar el curso por ID

  const { agregarAlCarrito } = useCarrito();  // Usar el hook para agregar al carrito
  const navigate = useNavigate();  // Usar el hook para redirigir

  // Verificamos si el curso existe
  if (!curso) {
    return <h2>Curso no encontrado</h2>;
  }

  // Función para agregar al carrito y redirigir
  const agregarAlCarritoYRedirigir = (curso) => {
    agregarAlCarrito(curso);  // Agregar el curso al carrito
    navigate('/carrito');  // Redirigir al carrito
  };

  return (
    <>
      <Header />
      
      <div className="curso-detalle">
        <div className="curso-header">
          <h2>{curso.titulo}</h2>
          <div className="video-container">
            <video width="100%" controls>
              <source src={curso.video} type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
          </div>
        </div>

        <div className="detalles-curso">
          <h3>Sobre el Curso</h3>
          <p>{curso.descripcion}</p>

          <div className="curso-compra">
            <div className="precio">
              <span className="precio-descontado">${curso.precio} MXN</span>
            </div>
            <div className="oferta">
              <p>¡Esta oferta termina en 5 horas!</p>
            </div>

            <div className="botones">
              <button 
                className="btn-agregar-carrito" 
                onClick={() => agregarAlCarritoYRedirigir(curso)}>
                Agregar al carrito
              </button>
            </div>

            <div className="garantia">
              <p><strong>Garantía de reembolso de 30 días</strong></p>
              <p><strong>Acceso de por vida</strong></p>
            </div>
          </div>

          <div className="detalles-curso-info">
            <h3>DETALLES DEL CURSO</h3>
            <ul>
              <li>📜 Certificado {curso.detalles.certificado}</li>
              <li>⏳ Duración: {curso.detalles.duracion}</li>
              <li>👨‍🎓 {curso.detalles.alumnos} alumnos</li>
              <li>⭐ Reseña: {curso.detalles.reseña}</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CursoDetalle;

