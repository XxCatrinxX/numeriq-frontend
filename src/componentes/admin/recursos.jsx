import React, { useEffect, useState } from "react";
import Navadmin from "./navadmin";
import { obtenerRecursos } from "../../api";
import "../../CSS/TemasCard.css";

const Recursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarRecursos = async () => {
      try {
        const response = await obtenerRecursos();
        if (response.data && Array.isArray(response.data)) {
          setRecursos(response.data);
          setError(null);
        } else {
          setError("No se encontraron datos");
        }
      } catch (err) {
        setError("Error al obtener los recursos");
        console.error("Error en la solicitud", err);
      }
    };

    cargarRecursos();
  }, []);

  return (
    <>
      <Navadmin />
      <div className="container_Temas">
        <h3>Lista de Recursos</h3>
        {error && <p>{error}</p>}
        <table className="table_Temas">
          <thead>
            <tr>
              <th>ID del Tema</th>
              <th>Nombre del Tema</th>
              <th>ID del Recurso</th>
              <th>Nombre del Recurso</th>
              <th>Tipo de Recurso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {recursos.length > 0 ? (
              recursos.map((recurso) => (
                <tr key={recurso.idRecurso}>
                  <td>{recurso.idTema}</td>
                  <td>{recurso.nombreTema}</td>
                  <td>{recurso.idRecurso}</td>
                  <td>{recurso.nombreRecurso}</td>
                  <td>{recurso.tipoRecurso}</td>
                  <td>
                    <button className="button_Temas">Editar</button>
                    <button className="button_Temas">Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No se encontraron recursos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Recursos;