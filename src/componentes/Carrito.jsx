import React from 'react';
import { useCarrito } from '../context/CarritoContext'; // Usamos el hook
import Header from './Header';
import Footer from './Footer';

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useCarrito(); // Obtenemos el carrito y las funciones

  const total = carrito.reduce((acc, curso) => acc + parseInt(curso.precio), 0);

  return (
    <>
    <Header/>
    <div className="carrito">
      <h3>Carrito</h3>
      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <img src="/image/carro-vacio.png" alt="Carrito vacío" />
          <p>Tu carrito está vacío. ¡Sigue comprando para encontrar un curso!</p>
          <button onClick={() => window.location.href = "/cursos"}>Seguir Comprando</button>
        </div>
      ) : (
        carrito.map(curso => (
          <div key={curso.id} className="producto-carrito">
            <h4>{curso.titulo}</h4>
            <p>{curso.descripcion}</p>
            <p>Precio: {curso.precio} MXN</p>
            <button onClick={() => eliminarDelCarrito(curso.id)}>Eliminar</button>
          </div>
        ))
      )}
      <div className="total">
        <p>Total: {total} MXN</p>
        <button>Proceder a pagar</button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Carrito;

