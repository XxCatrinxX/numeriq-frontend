// src/Recomendaciones.js
import React from 'react';
import TarjetaRecomendacion from './TarjetaRecomendacion';

const Recomendaciones = () => {
  const recomendaciones = [
    {
      titulo: "Introducción a las matemáticas.",
      categoria: "Matemáticas",
      enlace: "#",
      imagen: "/image/mate.jpg",  // Cambia la URL por la imagen que desees
    },
    {
      titulo: "Álgebra.",
      categoria: "Matemáticas",
      enlace: "#",
      imagen: "/image/mate.jpg",  // Cambia la URL por la imagen que desees
    },
    {
      titulo: "Aritmética.",
      categoria: "Matemáticas",
      enlace: "#",
      imagen: "/image/mate.jpg",  // Cambia la URL por la imagen que desees
    },
    {
      titulo: "El presente de subjuntivo.",
      categoria: "Español",
      enlace: "#",
      imagen: "/image/español.jpg",  // Imagen personalizada
    },
    {
      titulo: "El pretérito indefinido de indicativo.",
      categoria: "Español",
      enlace: "#",
      imagen: "/image/español.jpg",  // Imagen personalizada
    },
    {
      titulo: "Los tiempos del indicativo en español.",
      categoria: "Español",
      enlace: "#",
      imagen: "/image/español.jpg",  // Imagen personalizada
    }
  ];

  return (
    <div className="recomendaciones">
      <h2>Recomendaciones para ti</h2>
      <div className="categoria">
        <h3>MATEMÁTICAS</h3>
        <div className="contenedor-tarjetas">
          {recomendaciones.filter(item => item.categoria === "Matemáticas").map((item, index) => (
            <TarjetaRecomendacion key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="categoria">
        <h3>ESPAÑOL</h3>
        <div className="contenedor-tarjetas">
          {recomendaciones.filter(item => item.categoria === "Español").map((item, index) => (
            <TarjetaRecomendacion key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recomendaciones;
