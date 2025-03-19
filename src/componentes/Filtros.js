// src/componentes/Filtros.js
import React, { useEffect, useState } from 'react';

const Filtros = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('.footer'); // Seleccionamos el footer
    const filtros = document.querySelector('.filtros'); // Seleccionamos el filtro
    
    const handleScroll = () => {
      const footerPosition = footer.getBoundingClientRect().top;
      const filtrosPosition = filtros.getBoundingClientRect().bottom;

      // Si el filtro llega al footer, dejamos de aplicar el sticky
      if (filtrosPosition >= footerPosition) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`filtros ${isSticky ? 'sticky' : ''}`}>
      {/* Aquí van los filtros */}
      <h3>Filtros</h3>
      <ul>
        <li><input type="checkbox" /> Matemáticas</li>
        <li><input type="checkbox" /> Física</li>
        <li><input type="checkbox" /> Química</li>
        {/* Puedes agregar más filtros */}
      </ul>
    </div>
  );
};

export default Filtros;
