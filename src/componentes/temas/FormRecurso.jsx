import React, { useState } from "react";
import Navadmin from "../admin/navadmin";
import "../../CSS/Formulario.css";

const FormularioRecurso = ({
  agregarRecurso,
  eliminarRecurso,
  editarRecurso,
  recursos,
}) => {
  const [recurso, setRecurso] = useState({
    nombreRecurso: "",
    tipoRecurso: "",
    archivoRecurso: null,
  });

  const handleRecursoChange = (e) => {
    const { name, value } = e.target;
    setRecurso({
      ...recurso,
      [name]: value,
    });
  };

  const handleFileRecursoChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    setRecurso({
      ...recurso,
      archivoRecurso: file,
    });
  };

  const handleAgregarRecurso = () => {
    if (
      recurso.nombreRecurso &&
      recurso.tipoRecurso &&
      recurso.archivoRecurso
    ) {
      agregarRecurso(recurso);
      setRecurso({ nombreRecurso: "", tipoRecurso: "", archivoRecurso: null });
    } else {
      alert("Por favor, completa todos los campos del recurso.");
    }
  };

  const handleEditarRecurso = (index) => {
    if (
      recurso.nombreRecurso &&
      recurso.tipoRecurso &&
      recurso.archivoRecurso
    ) {
      editarRecurso(index, recurso);
      setRecurso({ nombreRecurso: "", tipoRecurso: "", archivoRecurso: null });
    } else {
      alert("Por favor, completa todos los campos del recurso.");
    }
  };

  return (
    <>
      <div className="container dashboard">
        <Navadmin />

        <div>
          <h3>Agregar Recurso</h3>
          <div>
            <label>Nombre del Recurso</label>
            <input
              type="text"
              name="nombreRecurso"
              value={recurso.nombreRecurso}
              onChange={handleRecursoChange}
            />
          </div>
          <div>
            <label>Tipo de Recurso</label>
            <input
              type="text"
              name="tipoRecurso"
              value={recurso.tipoRecurso}
              onChange={handleRecursoChange}
            />
          </div>
          <div>
            <label>Archivo</label>
            <input
              type="file"
              name="archivoRecurso"
              accept="image/*,video/*,application/pdf"
              onChange={handleFileRecursoChange}
            />
          </div>
          <button onClick={handleAgregarRecurso}>Agregar Recurso</button>

          <h4>Lista de Recursos</h4>
          {recursos.length === 0 ? (
            <p>No hay recursos agregados</p>
          ) : (
            recursos.map((recurso, index) => (
              <div key={index}>
                <p>{recurso.nombreRecurso}</p>
                <button onClick={() => handleEditarRecurso(index)}>
                  Editar Recurso
                </button>
                <button onClick={() => eliminarRecurso(index)}>Eliminar</button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FormularioRecurso;
