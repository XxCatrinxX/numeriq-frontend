// src/Modulos/CursosCategorias.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

const cursos = [
  { id: 1, titulo: 'El presente indefinido de indicativo', descripcion: 'Descripción breve', precio: '199', categoria: 'Matemáticas', reseña: 5, video: '/videos/Render Mario0001-0150.mp4' },
  { id: 2, titulo: 'Introducción a las matemáticas', descripcion: 'Descripción breve', precio: '199', categoria: 'Matemáticas', reseña: 4, video: '/videos/Render Mario0001-0150.mp4' },
  { id: 3, titulo: 'Álgebra', descripcion: 'Descripción breve', precio: '199', categoria: 'Matemáticas', reseña: 3, video: '/videos/Render Mario0001-0150.mp4' },
  { id: 4, titulo: 'Geometría', descripcion: 'Descripción breve', precio: '199', categoria: 'Matemáticas', reseña: 5, video: '/videos/Render Mario0001-0150.mp4' },
  { id: 5, titulo: 'Física cuántica', descripcion: 'Descripción breve', precio: '299', categoria: 'Física', reseña: 4, video: '/videos/Render Mario0001-0150.mp4' },
  { id: 6, titulo: 'Ecuaciones Diferenciales', descripcion: 'Descripción breve', precio: '399', categoria: 'Física', reseña: 3, video: '/videos/Render Mario0001-0150.mp4' },
  { id: 7, titulo: 'Cálculo Integral', descripcion: 'Descripción breve', precio: '499', categoria: 'Matemáticas', reseña: 4, video: '/videos/Render Mario0001-0150.mp4' },
  { id: 8, titulo: 'Trigonometría avanzada', descripcion: 'Descripción breve', precio: '299', categoria: 'Matemáticas', reseña: 5, video: '/videos/Render Mario0001-0150.mp4' },
  { id: 9, titulo: 'Estadística aplicada', descripcion: 'Descripción breve', precio: '199', categoria: 'Estadística', reseña: 2, video: '/videos/Render Mario0001-0150.mp4' },
  { id: 10, titulo: 'Teoría de Números', descripcion: 'Descripción breve', precio: '399', categoria: 'Matemáticas', reseña: 4, video: '/videos/Render Mario0001-0150.mp4' },
  { id: 11, titulo: 'Cálculo Diferencial', descripcion: 'Descripción breve', precio: '499', categoria: 'Física', reseña: 5, video: '/videos/Render Mario0001-0150.mp4' },
  { id: 12, titulo: 'Álgebra Lineal', descripcion: 'Descripción breve', precio: '299', categoria: 'Matemáticas', reseña: 3, video: '/videos/Render Mario0001-0150.mp4' },
];

const CursosCategorias = () => {
  // Estados para los filtros
  const [categoria, setCategoria] = useState([]);
  const [precio, setPrecio] = useState([]);
  const [reseñas, setReseñas] = useState([]);
  const [nivel, setNivel] = useState([]);
  
  const [mensaje, setMensaje] = useState('');  // Estado para el mensaje

  const { agregarAlCarrito } = useCarrito();
  const navigate = useNavigate();

  // Funciones para manejar filtros
  const handleFiltroCategoria = (e) => {
    const { value, checked } = e.target;
    setCategoria(prevState =>
      checked ? [...prevState, value] : prevState.filter(item => item !== value)
    );
  };

  const handleFiltroPrecio = (e) => {
    const { value, checked } = e.target;
    setPrecio(checked ? [...precio, value] : precio.filter(item => item !== value));
  };

  const handleFiltroReseñas = (e) => {
    const { value, checked } = e.target;
    setReseñas(checked ? [...reseñas, value] : reseñas.filter(item => item !== value));
  };

  const handleFiltroNivel = (e) => {
    const { value, checked } = e.target;
    setNivel(prevState =>
      checked ? [...prevState, value] : prevState.filter(item => item !== value)
    );
  };

  // Filtrar los cursos según los filtros seleccionados
  const cursosFiltrados = cursos.filter(curso => {
    const categoriaMatch = categoria.length === 0 || categoria.includes(curso.categoria);
    const precioMatch = precio.length === 0 || precio.includes(curso.precio);
    const reseñaMatch = reseñas.length === 0 || reseñas.includes(curso.reseña.toString());
    const nivelMatch = nivel.length === 0 || nivel.includes(curso.nivel);
    return categoriaMatch && precioMatch && reseñaMatch && nivelMatch;
  });

  const agregarAlCarritoYRedirigir = (curso) => {
    agregarAlCarrito(curso);
    setMensaje(`"${curso.titulo}" agregado al carrito`);
  
    // Después de 2 segundos, redirigir al carrito y eliminar el mensaje
    setTimeout(() => {
      setMensaje('');  // Eliminar el mensaje
      navigate('/carrito');  // Redirigir al carrito
    }, 2000); // Cambia el tiempo si lo necesitas
  };

  return (
    <div className="cursos-categorias">
      {mensaje && <div className="mensaje-agregado">{mensaje}</div>}

      <div className="filtros">
        <h3>Categoría Del Curso</h3>
        <ul>
          <li><input type="checkbox" value="Matemáticas" onChange={handleFiltroCategoria} /> Matemáticas</li>
          <li><input type="checkbox" value="Física" onChange={handleFiltroCategoria} /> Física</li>
          <li><input type="checkbox" value="Estadística" onChange={handleFiltroCategoria} /> Estadística</li>
        </ul>

        <h3>Precio</h3>
        <ul>
          <li><input type="checkbox" value="99" onChange={handleFiltroPrecio} /> $99 MXN</li>
          <li><input type="checkbox" value="199" onChange={handleFiltroPrecio} /> $199 MXN</li>
          <li><input type="checkbox" value="299" onChange={handleFiltroPrecio} /> $299 MXN</li>
          <li><input type="checkbox" value="399" onChange={handleFiltroPrecio} /> $399 MXN</li>
          <li><input type="checkbox" value="499" onChange={handleFiltroPrecio} /> $499 MXN</li>
          <li><input type="checkbox" value="599" onChange={handleFiltroPrecio} /> $599 MXN</li>
        </ul>

        <h3>Reseñas</h3>
        <ul>
          <li><input type="checkbox" value="5" onChange={handleFiltroReseñas} /> ⭐⭐⭐⭐⭐</li>
          <li><input type="checkbox" value="4" onChange={handleFiltroReseñas} /> ⭐⭐⭐⭐</li>
          <li><input type="checkbox" value="3" onChange={handleFiltroReseñas} /> ⭐⭐⭐</li>
          <li><input type="checkbox" value="2" onChange={handleFiltroReseñas} /> ⭐⭐</li>
        </ul>

        <h3>Nivel Académico</h3>
        <ul>
          <li><input type="checkbox" value="Básico" onChange={handleFiltroNivel} /> Básico</li>
          <li><input type="checkbox" value="Intermedio" onChange={handleFiltroNivel} /> Intermedio</li>
          <li><input type="checkbox" value="Avanzado" onChange={handleFiltroNivel} /> Avanzado</li>
        </ul>
      </div>

      <div className="tarjetas">
        {cursosFiltrados.map(curso => (
          <div className="tarjeta" key={curso.id}>
            <div className="video-thumbnail">
              <video width="100%" controls>
                <source src={curso.video} type="video/mp4" />
                Tu navegador no soporta el video.
              </video>
            </div>
            <h4>{curso.titulo}</h4>
            <p>{curso.descripcion}</p>

            <div className="reseñas">
              {[...Array(5)].map((_, index) => (
                <span key={index} className={index < curso.reseña ? 'star-filled' : 'star-empty'}>
                  ⭐
                </span>
              ))}
            </div>

            <button onClick={() => agregarAlCarritoYRedirigir(curso)}>Agregar al carrito ${curso.precio} MXN</button>

            <Link to={`/cursos/${curso.id}`}>
              <button className="ver-curso-btn">Ver curso</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CursosCategorias;