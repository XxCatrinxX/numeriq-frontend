import React, { useState, useEffect } from 'react';
import Nav from "./nav";
import Footer from "../Footer"
import {API_URL, obtenerUsuarioAutenticado} from "../../api";
import axios from "axios";
const AjustesPerfilEstudiante = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState("");
    const [passwordActual, setPasswordActual] = useState('');
    const [passwordNuevo, setPasswordNuevo] = useState('');
    const [descripcion, setDescripcion] = useState("");
    const [institucion, setInstitucion] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [fotoPreview, setFotoPreview] = useState(null);
    const [showModal, setShowModal] = useState(false);




    // Cargar los datos actuales del usuario al cargar la vista
    useEffect(() => {
        const cargarDatosUsuario = async () => {
            try {
                const usuario = await obtenerUsuarioAutenticado();
                setNombre(usuario.nombre);
                setEmail(usuario.email); // Asegúrate de usar setEmail para actualizar el estado de email
                setDescripcion(usuario.descripcion || "");  // Asegura que sea un string vacío si no existe
                setInstitucion(usuario.institucion || "");  // Asegura que sea un string vacío si no existe
                setFotoPreview(usuario.foto || null); // Usar la foto actual como la vista previa
            } catch (error) {
                console.error("Error cargando los datos:", error);
                alert("No se pudo cargar la información del perfil");
            }
        };

        cargarDatosUsuario();
    }, []);

    const handleNombreChange = (e) => setNombre(e.target.value);
    const handlePasswordActualChange = (e) => setPasswordActual(e.target.value);
    const handlePasswordNuevoChange = (e) => setPasswordNuevo(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleDescripcionChange = (e) => setDescripcion(e.target.value);
    const handleInstitucionChange = (e) => setInstitucion(e.target.value);

    const handleFotoPerfilChange = (e) => {
        const file = e.target.files[0];
        setFotoPerfil(file);

        // Crear un URL para mostrar la imagen previa antes de enviarla al servidor
        const reader = new FileReader();
        reader.onloadend = () => {
            setFotoPreview(reader.result); // Mostrar la vista previa de la imagen
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const ModalExito = () => (
        <div className="modal">
            <div className="modal-content">
                <h2>¡Perfil actualizado correctamente!</h2>
                <p>Tu perfil se ha actualizado con éxito.</p>
                <button onClick={() => window.location.reload()}>Cerrar</button> {/* Recargar la página */}
            </div>
        </div>
    );
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("email", email);
        formData.append("descripcion", descripcion);
        formData.append("institucion", institucion);
        formData.append('_method', 'PUT');
        if (fotoPerfil) formData.append("foto", fotoPerfil);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${API_URL}/perfil`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setShowModal(true); // Mostrar el modal de éxito
            setTimeout(() => {
                window.location.reload(); // Recargar la página después de 2 segundos
            }, 2000);
        } catch (error) {
            console.error("Error actualizando perfil:", error);
            alert("Hubo un error al actualizar el perfil");
        }
    };

    return (
        <>
            <Nav />
            <div className="ajustes-perfil-estudiante">
                <h2>Ajustes del Perfil</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Foto de Perfil:</label>
                        <div className="foto-perfil-container">
                            <img
                                src={fotoPreview || "/default-avatar.png"} // Muestra la foto de perfil o una predeterminada si no hay foto
                                alt="Foto de perfil"
                                className="foto-perfil"
                                onClick={() => document.getElementById("foto-input").click()} // Abre el input de archivo al hacer clic
                            />
                            <div className="foto-overlay" onClick={() => document.getElementById("foto-input").click()}>
                                <i className="fas fa-camera"></i>
                            </div>
                            <input
                                id="foto-input"
                                type="file"
                                onChange={handleFotoPerfilChange}
                                style={{display: "none"}} // Ocultar el input de archivo
                            />
                        </div>
                    </div>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={handleNombreChange}/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={handleEmailChange}/>
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input
                            type="text"
                            value={descripcion}
                            onChange={handleDescripcionChange}
                        />
                    </div>
                    <div>
                        <label>Institución:</label>
                        <input
                            type="text"
                            value={institucion}
                            onChange={handleInstitucionChange}
                        />
                    </div>
                    <button type="submit">Guardar Cambios</button>
                </form>
            </div>
            {showModal && <ModalExito />}
            <Footer />
        </>
    );
};

export default AjustesPerfilEstudiante;
