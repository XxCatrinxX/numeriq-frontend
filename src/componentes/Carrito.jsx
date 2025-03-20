import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import { Link, useNavigate } from 'react-router-dom';

export default function Carrito() {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    axios.get(`${API_URL}/carrito`, {
      headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => setCarrito(response.data))
        .catch(error => console.error('Error cargando el carrito:', error))
        .finally(() => setLoading(false));
  }, []);

  const eliminarDelCarrito = async (idCarritoDetalle) => {
    try {
      const token = localStorage.getItem('token');

      const idTema = carrito.detalles.find(item => item.idCarritoDetalle === idCarritoDetalle)?.tema.idTema;

      if (!idTema) {
        console.error('No se encontró el idTema');
        return;
      }

      await axios.delete(`${API_URL}/carrito/eliminar/${idTema}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Recargamos el carrito tras eliminar el producto
      const respuesta = await axios.get(`${API_URL}/carrito`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCarrito(respuesta.data);
    } catch (error) {
      console.error('Error eliminando del carrito:', error);
      throw error;  // Lanza el error para ser capturado por el `confirmDelete`
    }
  };

  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      // Primero eliminamos el producto
      eliminarDelCarrito(itemToDelete)
          .then(() => {
            // Luego cerramos el modal y limpiamos el itemToDelete
            setShowModal(false);
            setItemToDelete(null);
          })
          .catch((error) => {
            // Si hay un error, cerramos el modal pero no limpiamos el itemToDelete
            setShowModal(false);
            console.error('Error al eliminar el artículo:', error);
          });
    }
  };


  const cancelDelete = () => {
    setShowModal(false);
    setItemToDelete(null);
  };
  if (loading) return <p>Cargando carrito...</p>;

  // Continuación del código anterior...
  return (
      <div className="carrito-container">
        <h2>🛒 Tu Carrito {carrito && carrito.total ? ` - Total: $${parseFloat(carrito.total).toFixed(2)}` : ''}</h2>

        {carrito && carrito.detalles && carrito.detalles.length > 0 ? (
            <div className="temas-listado">
              {carrito.detalles.map((item) => (
                  <div
                      className="card"
                      key={item.idCarritoDetalle}
                      onClick={() => navigate(`/temas/detalles/${item.tema.idTema}`)}
                      style={{cursor: "pointer"}}
                  >
                    <img
                        src={item.tema.imagenTema}
                        alt={item.tema.nombreTema}
                        onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    />
                    <div className="card-content">
                      <h3 className="card-title">{item.tema.nombreTema}</h3>
                      <p className="card-description">{item.tema.descripcionTema}</p>
                      <p className="card-info">Cantidad: {item.cantidad}</p>
                      <p className="card-info">Precio unitario: ${item.precio}</p>
                      <p className="card-info">Subtotal: ${(item.cantidad * item.precio).toFixed(2)}</p>
                    </div>
                    <div className="card-buttons">
                      <button
                          className="btn-eliminar"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(item.idCarritoDetalle);
                          }}
                      >
                        ❌ Eliminar
                      </button>
                    </div>
                  </div>
              ))}


            </div>

        ) : (
            <p>Tu carrito está vacío 😢</p>
        )}
        {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>¿Estás seguro de que quieres eliminar este tema del carrito?</h3>
                <div className="modal-buttons">
                  <button className="btn-confirmar" onClick={confirmDelete}>
                    ✅ Confirmar
                  </button>
                  <button className="btn-cancelar" onClick={cancelDelete}>
                    ❌ Cancelar
                  </button>
                </div>
              </div>
            </div>
        )}

      </div>
  );

}
