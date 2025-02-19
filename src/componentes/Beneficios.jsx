// src/Beneficios.js
import React from 'react';

const Beneficios = () => {
  return (
    <div className="beneficios">
    <h2>¿Por qué elegirnos?</h2>
    <div className="beneficio">
      <i className="fas fa-clock" style={{ fontSize: '50px', color: '#fff' }}></i> {/* Icono de reloj */}
      <p>Acceso 24/7 a nuestra plataforma</p>
    </div>
    <div className="beneficio">
      <i className="fas fa-certificate" style={{ fontSize: '50px', color: '#fff' }}></i> {/* Icono de certificado */}
      <p>Certificación reconocida internacionalmente</p>
    </div>
    <div className="beneficio">
      <i className="fas fa-chalkboard-teacher" style={{ fontSize: '50px', color: '#fff' }}></i> {/* Icono de maestro */}
      <p>Clases en vivo con expertos</p>
    </div>
  </div>  
  );
};

export default Beneficios;
