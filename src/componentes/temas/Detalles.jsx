import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerTemaPorId } from "../../api"; // Crea esta función en tu API

const DetalleTema = () => {
  const { id } = useParams(); // Obtiene el ID desde la URL
  const [tema, setTema] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarTema = async () => {
      try {
        const response = await obtenerTemaPorId(id);
        setTema(response);
      } catch (err) {
        setError("Error al obtener los detalles del tema.");
        console.error(err);
      }
    };

    cargarTema();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!tema) return <p>Cargando...</p>;

  return (
    <div className="detalle-tema">
      <h1>{tema.nombreTema}</h1>
      <img src={tema.imagenTema} alt={tema.nombreTema} />
      <p>{tema.descripcionTema}</p>
    </div>
  );
};

export default DetalleTema;
