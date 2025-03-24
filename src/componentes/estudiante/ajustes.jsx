import React, { useState, useEffect } from 'react';
import Nav from "./nav";
import Footer from "../Footer";
import { API_URL, obtenerUsuarioAutenticado } from "../../api";
import axios from "axios";
import '../../CSS/estudiante/ajustes.css';

const AjustesPerfilEstudiante = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState("");
    const [passwordActual, setPasswordActual] = useState('');
    const [passwordNuevo, setPasswordNuevo] = useState('');
    const [passwordConfirmar, setPasswordConfirmar] = useState('');
    const [descripcion, setDescripcion] = useState("");
    const [institucion, setInstitucion] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [fotoPreview, setFotoPreview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [rol, setRol] = useState('');

    // Cargar los datos actuales del usuario al cargar la vista
    useEffect(() => {
        const cargarDatosUsuario = async () => {
            try {
                const usuario = await obtenerUsuarioAutenticado();
                setNombre(usuario.nombre);
                setEmail(usuario.email);
                setRol(usuario.rol);
                setDescripcion(usuario.descripcion || "");
                setInstitucion(usuario.institucion || "");
                setFotoPreview(usuario.foto || null);
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
    const handlePasswordConfirmarChange = (e) => setPasswordConfirmar(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleDescripcionChange = (e) => setDescripcion(e.target.value);
    const handleInstitucionChange = (e) => setInstitucion(e.target.value);

    const handleFotoPerfilChange = (e) => {
        const file = e.target.files[0];
        setFotoPerfil(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setFotoPreview(reader.result);
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
                <button onClick={() => window.location.reload()}>Cerrar</button>
            </div>
        </div>
    );

    const handleSubmitPerfil = async (e) => {
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

            setShowModal(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error("Error actualizando perfil:", error);
            alert("Hubo un error al actualizar el perfil");
        }
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();

        if (passwordNuevo !== passwordConfirmar) {
            alert("Las nuevas contraseñas no coinciden");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${API_URL}/cambiar-password`, {
                password_actual: passwordActual,
                password_nuevo: passwordNuevo,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Contraseña actualizada correctamente");
            setPasswordActual('');
            setPasswordNuevo('');
            setPasswordConfirmar('');
        } catch (error) {
            console.error("Error actualizando contraseña:", error);
            alert("Hubo un error al actualizar la contraseña");
        }
    };

    return (
        <>
            <Nav />
            <div className="ajustes-perfil-estudiante">
                <h2>Ajustes del Perfil</h2>
                <form onSubmit={handleSubmitPerfil}>
                    <div>
                        <label>Foto de Perfil:</label>
                        <div className="foto-perfil-container">
                            <img
                                src={fotoPreview || "/default-avatar.png"}
                                alt="Foto de perfil"
                                className="foto-perfil"
                                onClick={() => document.getElementById("foto-input").click()}
                            />
                            <div className="foto-overlay" onClick={() => document.getElementById("foto-input").click()}>
                                <i className="fas fa-camera"></i>
                            </div>
                            <input
                                id="foto-input"
                                type="file"
                                onChange={handleFotoPerfilChange}
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={handleNombreChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input type="text" value={descripcion} onChange={handleDescripcionChange} />
                    </div>
                    <div>
                        <label>Institución:</label>
                        <input type="text" value={institucion} onChange={handleInstitucionChange} />
                    </div>
                    <button type="submit">Guardar Cambios</button>
                </form>

                <h2>Cambiar Contraseña</h2>
                <form onSubmit={handleSubmitPassword}>
                    <div>
                        <label>Contraseña Actual:</label>
                        <input type="password" value={passwordActual} onChange={handlePasswordActualChange} />
                    </div>
                    <div>
                        <label>Nueva Contraseña:</label>
                        <input type="password" value={passwordNuevo} onChange={handlePasswordNuevoChange} />
                    </div>
                    <div>
                        <label>Confirmar Nueva Contraseña:</label>
                        <input type="password" value={passwordConfirmar} onChange={handlePasswordConfirmarChange} />
                    </div>
                    <button type="submit">Cambiar Contraseña</button>
                </form>
            </div>
            {showModal && <ModalExito />}
            <Footer />
        </>
    );
};

export default AjustesPerfilEstudiante;