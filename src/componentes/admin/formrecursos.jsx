import { useState, useEffect } from "react";
import { agregarRecurso } from "../../api";
import { useParams } from "react-router-dom";
import axios from "axios";

const FormRecursos = () => {
  const [tipoRecurso, setTipoRecurso] = useState("Video");
  const [tituloRecurso, setTituloRecurso] = useState("");
  const [descripcionRecurso, setDescripcionRecurso] = useState("");
  const [enlaceRecurso, setEnlaceRecurso] = useState("");
  const [duracionVideo, setDuracionVideo] = useState("");
  const [videoFile, setFile] = useState(null);
  const [nombreTema, setNombreTema] = useState("");

  const { idTema } = useParams();

  useEffect(() => {
    const fetchNombreTema = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/temas/${idTema}`
        );
        setNombreTema(response.data.nombreTema);
      } catch (error) {
        console.error("Error al obtener el nombre del tema:", error);
      }
    };

    fetchNombreTema();
  }, [idTema]);

  const handleFileUpload = (event) => {
    const videoFile = event.target.files[0];
    if (!videoFile) return;

    setFile(videoFile);
    setEnlaceRecurso(""); // Si se sube un archivo, limpiar la URL

    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src); // Liberar memoria
      setDuracionVideo(Math.floor(video.duration)); // Convertir a segundos
    };

    video.src = URL.createObjectURL(videoFile);
  };

  const handleUrlChange = (event) => {
    setEnlaceRecurso(event.target.value);
    setFile(null); // Si se ingresa una URL, limpiar el archivo

    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = event.target.value;

    video.onloadedmetadata = () => {
      setDuracionVideo(Math.floor(video.duration)); // Convertir a segundos
    };

    video.onerror = () => {
      setDuracionVideo(""); // Si hay error, limpiar duración
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (tipoRecurso === "Video") {
      // Verificar que la duración del video sea un número entero
      const duracion = parseInt(duracionVideo, 10);
      if (isNaN(duracion) || duracion <= 0) {
        alert("La duración del video debe ser un número entero positivo.");
        return;
      }

      // Verificar si se ha subido un archivo o proporcionado una URL
      if (!videoFile && !enlaceRecurso) {
        alert("Debe subir un video o proporcionar una URL");
        return;
      }
    }

    const formData = new FormData();
    formData.append("tipoRecurso", tipoRecurso);
    formData.append("tituloRecurso", tituloRecurso);
    formData.append("descripcionRecurso", descripcionRecurso);

    if (tipoRecurso === "Video") {
      if (videoFile) {
        formData.append("video", videoFile); // Subida del archivo
      } else if (enlaceRecurso) {
        formData.append("enlaceRecurso", enlaceRecurso); // Subida de la URL
      }
      formData.append("duracionVideo", duracionVideo); // Enviar la duración como un número entero
    }

    try {
      console.log("videoFile:", videoFile);
      console.log("enlaceRecurso:", enlaceRecurso);
      // Confirmar los datos antes de enviarlos
      console.log([...formData]); // Agregar un registro para ver lo que se está enviando

      await agregarRecurso(idTema, formData);
      alert("Recurso agregado correctamente");
      // Limpiar el formulario
      setTipoRecurso("Video");
      setTituloRecurso("");
      setDescripcionRecurso("");
      setFile(null);
      setEnlaceRecurso("");
      setDuracionVideo("");
    } catch (error) {
      console.error(
        "Error al agregar el recurso:",
        error.response?.data || error
      );
      alert("Error al agregar el recurso");
    }
  };

  return (
    <>
      <h2>Agregar Recurso al Tema {nombreTema}</h2>

      <form onSubmit={handleSubmit}>
        <label>Tipo de Recurso:</label>
        <select
          value={tipoRecurso}
          onChange={(e) => setTipoRecurso(e.target.value)}
        >
          <option value="Video">Video</option>
          <option value="Ejercicio">Ejercicio</option>
          <option value="Recurso Adicional">Recurso Adicional</option>
          <option value="Examen Diagnóstico">Examen Diagnóstico</option>
          <option value="Examen Final">Examen Final</option>
        </select>

        <label>Título:</label>
        <input
          type="text"
          value={tituloRecurso}
          onChange={(e) => setTituloRecurso(e.target.value)}
          required
        />

        <label>Descripción:</label>
        <textarea
          value={descripcionRecurso}
          onChange={(e) => setDescripcionRecurso(e.target.value)}
        />

        {tipoRecurso === "Video" && (
          <>
            <label>Subir Video:</label>
            <input type="file" accept="video/*" onChange={handleFileUpload} />

            <label>O agregar URL del video:</label>
            <input
              type="url"
              value={enlaceRecurso}
              onChange={handleUrlChange}
              placeholder="https://ejemplo.com/video.mp4"
            />

            <label>Duración (segundos):</label>
            <input type="number" value={duracionVideo} readOnly />
          </>
        )}

        <button type="submit">Guardar Recurso</button>
      </form>
    </>
  );
};

export default FormRecursos;
