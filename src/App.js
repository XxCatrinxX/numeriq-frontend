// src/App.js
import "./App.css";
import Header from "./componentes/Header";
import Contenido from "./componentes/Contenido";
import MenuLateral from "./componentes/MenuLateral";
import CarruselCursos from "./componentes/CarruselCursos";
import Recomendaciones from "./componentes/Recomendaciones";
import Beneficios from "./componentes/Beneficios";
import Testimonios from "./componentes/Testimonios";
import Tendencias from "./componentes/Tendencias";
import Temas from "./componentes/temas/Temas";
import Dashboard from "./componentes/admin/dashboard";
import Footer from "./componentes/Footer";
import Usuarios from "./componentes/admin/usuarios";
import Login from "./componentes/Login"; // Importa el componente de Login
import Register from "./componentes/Register"; // Importa el componente de Register
import FormTema from "./componentes/temas/FormTema"; // Importa el componente de FormTema
import { Routes, Route } from "react-router-dom"; // Importa Routes y Route para la navegación
import React, { useEffect } from "react";
import api from "./api"; // Importa la instancia de axios

function App() {
  useEffect(() => {
    // Solicita el token CSRF al backend al cargar la app
    const getCsrfToken = async () => {
      try {
        await api.get("/sanctum/csrf-cookie"); // Laravel devuelve automáticamente el token CSRF como una cookie
        console.log("CSRF token obtenido correctamente");
      } catch (error) {
        console.error("Error al obtener el CSRF token:", error);
      }
    };

    getCsrfToken();
  }, []);

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
        {/* Rutas para la sección de usuarios */}
        <Route path="/admin/usuarios" element={<Usuarios />} />  
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
