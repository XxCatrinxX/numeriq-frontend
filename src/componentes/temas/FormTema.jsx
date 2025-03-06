import React, { useState, useEffect } from "react";
import Navadmin from "../admin/navadmin";
import "../../CSS/Formulario.css";

const FormTema = () => {
  const [formData, setFormData] = useState({
    nombreTema: "",
    descripcionTema: "",
    imagenTema: null,
    videoTema: null,
    precio: "",
    idCategoria: "",
    idNivel: "",
    horasContenido: "",
    idioma: "",
    certificado: false,
    fechaUltimaActualizacion: "",
    numUsuarios: "",
    likes: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  useEffect(() => {
    fetch("/api/categorias")
      .then((response) => response.json())
      .then((data) => setCategorias(data));

    fetch("/api/niveles")
      .then((response) => response.json())
      .then((data) => setNiveles(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    setFormData({
      ...formData,
      [name]: file,
    });

    // Crear una vista previa de la imagen/video
    if (file) {
      const fileURL = URL.createObjectURL(file);
      if (name === "imagenTema") {
        setPreviewImage(fileURL);
      } else if (name === "videoTema") {
        setPreviewVideo(fileURL);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    fetch("/api/temas", {
      method: "POST",
      body: data,
    }).then((response) => {
      if (response.ok) {
        alert("Tema creado exitosamente");
      } else {
        alert("Error al crear el tema");
      }
    });
  };

  return (
    <div className="container dashboard">
      <Navadmin></Navadmin>
      {/* Formulario */}
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
            name="imagenTema"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Video</label>
          <input
            type="file"
            name="videoTema"
            accept="video/*"
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
          <label>Número de Usuarios</label>
          <input
            type="number"
            name="numUsuarios"
            value={formData.numUsuarios}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Likes</label>
          <input
            type="number"
            name="likes"
            value={formData.likes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Horas de Contenido</label>
          <input
            type="number"
            name="horasContenido"
            value={formData.horasContenido}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha de Última Actualización</label>
          <input
            type="date"
            name="fechaUltimaActualizacion"
            value={formData.fechaUltimaActualizacion}
            onChange={handleChange}
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
          <input
            type="checkbox"
            name="certificado"
            checked={formData.certificado}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Categoría</label>
          <select
            name="idCategoria"
            value={formData.idCategoria}
            onChange={handleChange}
          >
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
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
          >
            {niveles.map((nivel) => (
              <option key={nivel.id} value={nivel.id}>
                {nivel.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Crear Tema</button>
      </form>

      {/* Vista Previa 
      <div className="preview">
  {previewImage && (
    <img
      src={previewImage}
      alt="Vista previa"
      style={{ width: "100%", height: "180px", objectFit: "cover" }}
    />
  )}
  <div style={{ padding: "1rem" }}>
    <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}>
      {formData.nombreTema || "Título del Tema"}
    </h3>
    <p style={{ fontSize: "0.9rem", color: "#555" }}>
      {formData.descripcionTema || "Descripción del tema..."}
    </p>
    <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#28a745" }}>
      {formData.precio ? `$${formData.precio}` : "Gratis"}
    </p>
    <p><strong>Idioma:</strong> {formData.idioma || "No especificado"}</p>
    <p><strong>Certificado:</strong> {formData.certificado ? "Sí" : "No"}</p>
    <p><strong>Categoría:</strong> {categorias.find(categoria => categoria.id === formData.idCategoria)?.nombre || "No especificada"}</p>
    <p><strong>Nivel:</strong> {niveles.find(nivel => nivel.id === formData.idNivel)?.nombre || "No especificado"}</p>
    <p><strong>Usuarios:</strong> {formData.numUsuarios || "0"}</p>
    <p><strong>Likes:</strong> {formData.likes || "0"}</p>
    <p><strong>Horas de Contenido:</strong> {formData.horasContenido || "0"}</p>
    <p><strong>Última Actualización:</strong> {formData.fechaUltimaActualizacion || "No disponible"}</p>
  </div>
      </div>
      */}

      
    </div>
  );
};

export default FormTema;
