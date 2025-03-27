import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_URL } from "../api";
import {useNavigate } from "react-router-dom";

export default function Carrito() {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarrito = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);

      try {
        const { data } = await axios.get(`${API_URL}/carrito`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCarrito(data);
      } catch (error) {
        console.error("Error cargando el carrito:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarrito();
  }, []);

  const eliminarDelCarrito = useCallback(async (idCarritoDetalle) => {
    const token = localStorage.getItem("token");

    try {
      const item = carrito?.detalles.find((i) => i.idCarritoDetalle === idCarritoDetalle);
      if (!item) return console.error("No se encontró el item");

      await axios.delete(`${API_URL}/carrito/eliminar/${item.tema.idTema}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // En lugar de hacer otra petición, actualizamos el estado eliminando el ítem
      setCarrito((prevCarrito) => ({
        ...prevCarrito,
        detalles: prevCarrito.detalles.filter((i) => i.idCarritoDetalle !== idCarritoDetalle),
      }));
    } catch (error) {
      console.error("Error eliminando del carrito:", error);
    }
  }, [carrito]);

  const handleDeleteClick = useCallback((itemId) => {
    setItemToDelete(itemId);
    setShowModal(true);
  }, []);

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      eliminarDelCarrito(itemToDelete);
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  if (loading) return <p>Cargando carrito...</p>;

  return (
      <div className="carrito-container">
        <h2>🛒 Tu Carrito {carrito?.total ? ` - Total: $${parseFloat(carrito.total).toFixed(2)}` : ""}</h2>

        {carrito?.detalles?.length > 0 ? (
            <div className="temas-listado">
              {carrito.detalles.map((item) => (
                  <div
                      className="card"
                      key={item.idCarritoDetalle}
                      onClick={() => navigate(`/temas/detalles/${item.tema.idTema}`)}
                      style={{ cursor: "pointer" }}
                  >
                    <img
                        src={item.tema.miniaturaTema}
                        alt={item.tema.nombreTema}
                        onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    />
                    <div className="card-content">
                      <h3 className="card-title">{item.tema.nombreTema}</h3>
                      <p className="card-description">{item.tema.descripcionTema}</p>
                      <p className="card-info">Precio unitario: ${item.precio}</p>
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
