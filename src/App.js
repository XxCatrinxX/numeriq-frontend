// src/App.js
import "./App.css";
import Header from "./componentes/Header";
import Contenido from "./componentes/Contenido";
import CarruselCursos from "./componentes/CarruselCursos";
import Cursos from "./componentes/estudiante/cursos";
import Deseos from "./componentes/estudiante/deseos";
import Ajustes from "./componentes/estudiante/ajustes";
import Recomendaciones from "./componentes/Recomendaciones";
import Beneficios from "./componentes/Beneficios";
import Testimonios from "./componentes/Testimonios";
import Tendencias from "./componentes/Tendencias";
import Temas from "./componentes/temas/Temas";
import Dashboard from "./componentes/admin/dashboard";
import Tutores from "./componentes/estudiante/tutores";
import Footer from "./componentes/Footer";
import Detalles from "./componentes/temas/Detalles";
import Usuarios from "./componentes/admin/usuarios";
import Estudiante from "./componentes/estudiante/inicio";
import Login from "./componentes/Login"; // Importa el componente de Login
import Register from "./componentes/Register"; // Importa el componente de Register
import FormTema from "./componentes/temas/FormTema"; // Importa el componente de FormTema
import { Routes, Route } from "react-router-dom"; // Importa Routes y Route para la navegación
import React from "react";

function App() {


  return (
    <main>
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />{" "}
        {/* Ruta para el formulario de Login */}
        <Route path="/register" element={<Register />} />{" "}
        {/* Ruta para el formulario de Register */}
        {/* Rutas para el dashboard de administrador */}
        <Route path="/admin" element={<Dashboard />} />
        {/* Rutas para el formulario de nuevo tema */}
        <Route path="/admin/nuevo-tema" element={<FormTema />} />
        {/* Rutas para la sección de cursos */}
        <Route path="/temas" element={<Temas />} />
        <Route path="/temas/detalles/:idTema" element={<Detalles />} />
        {/* Rutas para la sección de usuarios */}
        <Route path="/admin/usuarios" element={<Usuarios />} />

        <Route path="/estudiante" element={<Estudiante />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/tutores" element={<Tutores />} />
        <Route path="/deseos" element={<Deseos />} />
        <Route path="/ajustes" element={<Ajustes />} />
        {/* Rutas para las otras secciones */}
        <Route
          path="/"
          element={
            <>
              <Contenido />
              <CarruselCursos />
              <Recomendaciones />
              <Beneficios />
              <Testimonios />
              <Tendencias />
              <Footer />
            </>
          }

        />
      </Routes>
    </main>
  );
}

export default App;
