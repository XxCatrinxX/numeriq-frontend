import { useState, useEffect } from "react";

const cursos = [
  {
    id: 1,
    titulo: "Química Básica",
    descripcion: "Aprende los fundamentos de la química y sus aplicaciones.",
    nivel: "Principiante",
    estudiantes: 1200,
    likes: 320,
    precio: "$50 MXN",
    imagen: "/image/quimica.jpg",
  },
  {
    id: 2,
    titulo: "Matemáticas Avanzadas",
    descripcion: "Explora el mundo de los números y las ecuaciones complejas.",
    nivel: "Avanzado",
    estudiantes: 850,
    likes: 275,
    precio: "$70 MXN",
    imagen: "/image/mate.jpg",
  },
  {
    id: 3,
    titulo: "Física Cuántica",
    descripcion: "Descubre los misterios de la física a nivel subatómico.",
    nivel: "Intermedio",
    estudiantes: 950,
    likes: 300,
    precio: "$60 MXN",
    imagen: "/image/fisica.webp",
  },
];

export default function CarruselCursos() {
  const [indice, setIndice] = useState(0);

  const siguienteCurso = () => {
    setIndice((prev) => (prev + 1) % cursos.length);
  };

  useEffect(() => {
    const intervalo = setInterval(siguienteCurso, 3000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="carrusel-container">
      <h2 className="titulo">Cursos Destacados</h2>
      <div className="carrusel">
        <div className="tarjeta">
          <img src={cursos[indice].imagen} alt={cursos[indice].titulo} />
          <h3>{cursos[indice].titulo}</h3>
          <p>{cursos[indice].descripcion}</p>
          <p><strong>Nivel:</strong> {cursos[indice].nivel}</p>
          <p><strong>Estudiantes:</strong> {cursos[indice].estudiantes}</p>
          <p><strong>Likes:</strong> ❤️ {cursos[indice].likes}</p>
          <button className="comprar">Comprar - {cursos[indice].precio}</button>
        </div>
      </div>
      <style jsx>{`
        .carrusel-container {
          text-align: center;
          padding: 20px;
        }
        .titulo {
          color: #0B6FB6;
          font-size: 2rem;
          margin-bottom: 20px;
        }
        .carrusel {
          display: flex;
          justify-content: center;
          overflow: hidden;
        }
        .tarjeta {
          background: #F8C22B;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          transition: transform 0.5s ease-in-out;
        }
        .tarjeta img {
          width: 100%;
          border-radius: 5px;
        }
        .comprar {
          background: #F18C21;
          color: white;
          border: none;
          padding: 10px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.3s;
        }
        .comprar:hover {
          background: #D67B1D;
        }
      `}</style>
    </div>
  );
}

