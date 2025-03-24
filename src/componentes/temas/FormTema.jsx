import React, { useState, useEffect } from "react";
import Navadmin from "../admin/navadmin";
import "../../CSS/Formulario.css";
import axios from "axios";
import { crearTema } from "../../api";

const FormTema = () => {
  const [formData, setFormData] = useState({
    nombreTema: "",
    descripcionTema: "",
    miniaturaTema: null,
    precio: "",
    idCategoria: "",
    idNivel: "",
    idioma: "",
    certificado: "", // Será "1" o "0"
    horasContenido: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [niveles, setNiveles] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resCategorias, resNiveles] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/categorias"),
          axios.get("http://127.0.0.1:8000/api/niveles"),
        ]);
        setCategorias(resCategorias.data);
        setNiveles(resNiveles.data);
      } catch (error) {
        console.error("Error al cargar categorías o niveles", error);
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? e.target.checked
          : type === "number"
          ? Number(value)
          : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType.startsWith("image/") || fileType.startsWith("video/")) {
        setFormData({
          ...formData,
          miniaturaTema: file,
        });
      } else {
        alert("Por favor, selecciona un archivo de tipo imagen o video.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("nombreTema", formData.nombreTema);
    fd.append("descripcionTema", formData.descripcionTema);
    fd.append("miniaturaTema", formData.miniaturaTema);
    fd.append("precio", parseFloat(formData.precio));
    fd.append("idCategoria", parseInt(formData.idCategoria));
    fd.append("idNivel", parseInt(formData.idNivel));
    fd.append("horasContenido", parseInt(formData.horasContenido));
    fd.append("idioma", formData.idioma);
    fd.append("certificado", formData.certificado ? 1 : 0); // Laravel interpreta "1" o "0" como boolean

    try {
      await crearTema(fd); // aquí ya pasas el formData completo
      alert("Tema creado exitosamente");
    } catch (error) {
      console.error("Error al crear el tema:", error.response?.data || error);
      alert("Error al crear el tema");
    }
  };

  return (
    <div className="container dashboard">
      <Navadmin />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Tema</label>
          <input
            type="text"
            name="nombreTema"
            value={formData.nombreTema}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción</label>
          <textarea
            name="descripcionTema"
            value={formData.descripcionTema}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Portada</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Idioma</label>
          <input
            type="text"
            name="idioma"
            value={formData.idioma}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Certificado</label>
          <select
            name="certificado"
            value={formData.certificado}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="1">Sí</option>
            <option value="0">No</option>
          </select>
        </div>

        <div>
          <label>Horas de Contenido</label>
          <input
            type="number"
            name="horasContenido"
            value={formData.horasContenido}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div>
          <label>Categoría</label>
          <select
            name="idCategoria"
            value={formData.idCategoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option
                key={`cat-${categoria.idCategoria}`}
                value={categoria.idCategoria}
              >
                {categoria.nombreCategoria}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Nivel</label>
          <select
            name="idNivel"
            value={formData.idNivel}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un nivel</option>
            {niveles.map((nivel) => (
              <option key={`nivel-${nivel.idNivel}`} value={nivel.idNivel}>
                {nivel.nombreNivel}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Crear Tema</button>
      </form>
    </div>
  );
};

export default FormTema;
