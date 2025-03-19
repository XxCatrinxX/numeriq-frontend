import React from 'react'
import CursosCategorias from 'src/componentes/CursosCategorias'
import Footer from 'src/componentes/Footer'
import Header from 'src/componentes/Header'
import Tendencias from 'src/componentes/Tendencias'

export default function Cursos() {
  return (
    <>
      <Header/>
      <CursosCategorias/>
      <Tendencias/>
      <Footer/>
    </>
  )
}
