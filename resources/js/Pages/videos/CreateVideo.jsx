import React from "react";
import "../../../css/forms/formulario.css"; // Importamos los estilos

const CreateVideo = () => {
    return (
        <div className="form-container">
            <h2>Subir un nuevo video</h2>

            <form method="POST" action="/videos" encType="multipart/form-data">

            {/* Token CSRF */}
            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />

                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        required
                        placeholder="Ingresa el título del video"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        rows="4"
                        required
                        placeholder="Escribe una breve descripción"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Miniatura (Imagen)</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        required
                        accept="image/*"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="video">Archivo de Video</label>
                    <input
                        type="file"
                        id="video"
                        name="video"
                        required
                        accept="video/*"
                    />
                </div>

                <div className="form-group">
                    <button type="submit">Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default CreateVideo;
