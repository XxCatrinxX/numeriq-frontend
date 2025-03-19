import React, { createContext, useContext, useState } from 'react';

// Crear un contexto
const CarritoContext = createContext();

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar un curso al carrito
  const agregarAlCarrito = (curso) => {
    setCarrito((prevCarrito) => [...prevCarrito, curso]);
  };

  // Función para eliminar un curso del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((curso) => curso.id !== id));
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook para usar el carrito en cualquier componente
export const useCarrito = () => {
  return useContext(CarritoContext);
};
