import React from "react";
import CarruselCursos from "./CarruselCursos";
import Recomendaciones from "./Recomendaciones";

export default function Contenido() {
  return (
    <>
      {/*Bienvenida*/}

      <div className="bienvenida">
        <div className="texto">
          <h1>¡Bienvenido a NumerIQ!</h1>
          <h2>Tu formula correcta</h2>
          <p> En NumerIQ, <br /> ofrecemos capacitación en línea de alta calidad
          para estudiantes de nivel secundario y universitario.
          </p>
          <button>Explorar cursos</button>
        </div>
        <div className="img-estudiante">
          <img src="/image/estudiante.png" alt="Foto del estudiante" />
        </div>
      </div>

      {/*Video*/}
      <section className="video-container">
        <video width={850} controls>
          <source src="/videos/Render Mario0001-0150.mp4" type="video/mp4" />
        </video>
      </section>
    </>
  );
}
