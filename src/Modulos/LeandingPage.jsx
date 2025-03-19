import React from 'react';
import { Link } from 'react-router-dom';  // Asegúrate de importar Link desde react-router-dom
import CarruselCursos from '../componentes/CarruselCursos';
import Contenido from '../componentes/Contenido';
import Recomendaciones from '../componentes/Recomendaciones';
import Beneficios from '../componentes/Beneficios';
import Testimonios from '../componentes/Testimonios';
import Tendencias from '../componentes/Tendencias';
import Footer from '../componentes/Footer';
import Header from '../componentes/Header';

export default function LeandingPage() {
  return (
    <>
      <Header/>
      <Contenido/>
      <CarruselCursos/>
      <Recomendaciones/>
      <Beneficios/>
      <Testimonios/>
      <Tendencias/>
      <Footer/>
    </>
  );
}
