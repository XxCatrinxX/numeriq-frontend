import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../CSS/admin/temas.css";
import Navadmin from "./navadmin";

const TemasTabla = () => {
  const [temas, setTemas] = useState([]);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const navigate = useNavigate();

  // Obtener temas al cargar el componente
  useEffect(() => {
    const fetchTemas = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/temas?page=${paginaActual}`
        );
        if (response.data && Array.isArray(response.data.data)) {
          setTemas(response.data.data);
          setTotalPaginas(response.data.last_page);
          setError(null);
        } else {
          setError("No se encontraron datos");
        }
      } catch (err) {
        setError("Error al obtener los temas");
        console.error(err);
      }
    };

    fetchTemas();
  }, [paginaActual]);

  // Lógica para editar
  const handleEditar = (tema) => {
    navigate(`/nuevo-tema`, { state: { tema } });
  };

  // Lógica para eliminar
  const handleEliminar = async (idTema) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este tema?");
    if (confirmacion) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/temas/${idTema}`);
        setTemas(temas.filter((tema) => tema.idTema !== idTema));
        alert("Tema eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar el tema:", error);
        alert("Hubo un error al eliminar el tema");
      }
    }
  };

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  return (
    <>
      <Navadmin />
      <div className="table-container">
        <h2>Listado de Temas</h2>
        {error && <p className="error">{error}</p>}

        <table className="temas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Usuarios</th>
              <th>Likes</th>
              <th>Idioma</th>
              <th>Certificado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {temas.length > 0 ? (
              temas.map((tema) => (
                <tr key={tema.idTema}>
                  <td>{tema.idTema}</td>
                  <td>{tema.nombreTema}</td>
                  <td>{tema.descripcionTema}</td>
                  <td>${tema.precio}</td>
                  <td>{tema.numUsuarios}</td>
                  <td>{tema.likes}</td>
                  <td>{tema.idioma}</td>
                  <td>{tema.certificado ? "Sí" : "No"}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditar(tema)}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(tema.idTema)}
                      className="delete-button"
                    >
                      Eliminar
                    </button>
                    <button>Agregar Recurso</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No se encontraron temas.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINACIÓN */}
        {totalPaginas > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
              (num) => (
                <button
                  key={num}
                  onClick={() => cambiarPagina(num)}
                  disabled={num === paginaActual}
                >
                  {num}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TemasTabla;
