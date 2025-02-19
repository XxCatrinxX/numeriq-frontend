import React from 'react'
import CarruselCursos from './CarruselCursos'
import Recomendaciones from './Recomendaciones'

export default function Contenido() {
  return (

    <>
      {/*Bienvenida*/}
      <section className='bienvenida'>
        <h1>¡Bienvenido a NumerIQ!</h1>
        <h2>Tu formula correcta</h2>
        <p>
        En NumerIQ, ofrecemos capacitación en línea de alta calidad para estudiantes de nivel secundario 
        y universitario.
        </p>
        <button>Explorar cursos</button>

        {/*<div className="bienvenida-imagen">
            <img src="/image/student_PNG62550.png" alt="Estudiantes" />
          </div>*/}
      </section>

      {/*Video*/}
      <section className='video-container'>
        <video width={850} controls>
          <source src='/videos/Render Mario0001-0150.mp4' type='video/mp4'/>
        </video>
      </section> 

    </>
  )
}
