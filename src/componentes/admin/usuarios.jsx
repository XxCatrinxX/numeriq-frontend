import { useEffect, useState } from "react";
import axios from "axios";
import Navadmin from "./navadmin";
import "../../CSS/admin/usuarios.css";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        setError("Error al obtener los usuarios");
        console.error(error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEliminar = async (idUsuario) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirmacion) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/usuarios/${idUsuario}`);
        setUsuarios(usuarios.filter((usuario) => usuario.id !== idUsuario));
        alert("Usuario eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        alert("Hubo un error al eliminar el usuario");
      }
    }
  };

  const handleCambiarRol = async (idUsuario, nuevoRol) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/usuarios/${idUsuario}`, 
        { rol: nuevoRol }, 
        { 
          withCredentials: true,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      );      
      setUsuarios(usuarios.map((usuario) => (usuario.idUsuario === idUsuario ? { ...usuario, rol: nuevoRol } : usuario)));
      alert("Rol cambiado correctamente");
    } catch (error) {
      console.error("Error al cambiar el rol del usuario:", error);
      alert("Hubo un error al cambiar el rol del usuario");
    }
  };
  

  return (
    <>
      <Navadmin />
      <div className="table-container">
        <h2>Lista de Usuarios</h2>
        {error && <p className="error">{error}</p>}

        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.idUsuario}>
                  <td>{usuario.idUsuario}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.rol}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleEliminar(usuario.id)}
                    >
                      Eliminar
                    </button>

                    <select
                      value={usuario.rol}
                      onChange={(e) =>
                        handleCambiarRol(usuario.idUsuario, e.target.value)
                      }
                      className="select-rol"
                    >
                      <option value="estudiante">Estudiante</option>
                      <option value="profesor">Profesor</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No se encontraron usuarios.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Usuarios;
