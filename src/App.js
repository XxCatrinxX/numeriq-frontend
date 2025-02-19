// src/App.js
import './App.css';
import Header from './componentes/Header';
import Contenido from './componentes/Contenido';
import MenuLateral from './componentes/MenuLateral';
import CarruselCursos from './componentes/CarruselCursos';
import Recomendaciones from './componentes/Recomendaciones';
import Beneficios from './componentes/Beneficios';
import Testimonios from './componentes/Testimonios';
import Tendencias from './componentes/Tendencias';
import Footer from './componentes/Footer';
import Login from './componentes/Login';  // Importa el componente de Login
import Register from './componentes/Register';  // Importa el componente de Register
import { Routes, Route } from 'react-router-dom';  // Importa Routes y Route para la navegación

function App() {
  return (
    <main>
      <Header/>

      <Routes>
        <Route path="/login" element={<Login />} />  {/* Ruta para el formulario de Login */}
        <Route path="/register" element={<Register />} />  {/* Ruta para el formulario de Register */}
        
        {/* Rutas para las otras secciones */}
        <Route path="/" element={
          <>
            <Contenido/>
            <CarruselCursos/>
            <Recomendaciones/>
            <Beneficios/>
            <Testimonios/>
            <Tendencias/>
            <Footer/>
          </>
        } />
      </Routes>
    </main>
  );
}

export default App;
