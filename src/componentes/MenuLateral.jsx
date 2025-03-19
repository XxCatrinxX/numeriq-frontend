import React, { useState } from "react";

const MenuLateral = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(null);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const toggleSubmenu = (index) => {
    setSubmenuVisible(submenuVisible === index ? null : index);
  };

  return (
    <>
      <button className="boton-menu" onClick={toggleMenu}>
        ☰ Menú
      </button>

      <div className={`menu-lateral ${menuAbierto ? "activo" : ""}`}>
        <button className="cerrar-menu" onClick={toggleMenu}>✖</button>
        <h3>NIVELES</h3>
        <ul>
          <li>Educación Básica</li>
          <li>Educación Media Superior</li>
          <li>Licenciatura</li>
          <li>Posgrado</li>
        </ul>

        <h3>CURSOS</h3>
        <ul>
          <li onClick={() => toggleSubmenu(0)}>
            Matemáticas {submenuVisible === 0 && (
              <ul className="submenu">
                <li>Álgebra</li>
                <li>Geometría</li>
                <li>Cálculo</li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleSubmenu(1)}>
            Ciencias {submenuVisible === 1 && (
              <ul className="submenu">
                <li>Biología</li>
                <li>Física</li>
                <li>Química</li>
              </ul>
            )}
          </li>
          <li>Español</li>
          <li>Historia</li>
          <li>Civismo</li>
          <li>Geografía</li>
          <li>Inglés</li>
          <li>Artes</li>
        </ul>
      </div>
    </>
  );
};

export default MenuLateral;