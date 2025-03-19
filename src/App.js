import './App.css';
import { CarritoProvider } from './context/CarritoContext';
import { Routes, Route } from 'react-router-dom';
import LeandingPage from './Modulos/LeandingPage';  // Asegúrate de importar la LandingPage
import Login from './componentes/Login';
import Register from './componentes/Register';
import Cursos from './Modulos/Cursos';
import CursoDetalle from './Modulos/CursoDetalle';
import Carrito from './componentes/Carrito';
import React, { useState } from 'react';

function App() {
  return (
    <CarritoProvider> {/* Envuelve la app en el proveedor */}
      <main>
        <Routes>
          <Route path="/" element={<LeandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/cursos/:id" element={<CursoDetalle />} />
          <Route path="/carrito" element={<Carrito />} /> {/* Ruta del carrito */}
        </Routes>
      </main>
    </CarritoProvider>
  );
}

export default App;

