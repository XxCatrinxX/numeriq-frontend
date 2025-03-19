// src/TarjetaRecomendacion.js
import React from 'react';

const TarjetaRecomendacion = ({ titulo, categoria, enlace, imagen }) => {
  return (
    <div className="tarjeta">
      <div className="tarjeta-header">
        
          <img src={imagen} alt="Miniatura del video" />
        
      </div>
      <div className="tarjeta-body">
        <h3>{titulo}</h3>
        <p>{categoria}</p>
        <button className="btn-compra">Comparar $199 MXN</button>
      </div>
    </div>
  );
};

export default TarjetaRecomendacion;
