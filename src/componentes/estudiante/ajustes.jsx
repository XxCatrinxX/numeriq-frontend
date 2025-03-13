import React, { useState } from 'react';
import Nav from "./nav";
import Footer from "../Footer"

const AjustesPerfilEstudiante = () => {
    const [nombre, setNombre] = useState('');
    const [passwordActual, setPasswordActual] = useState('');
    const [passwordNuevo, setPasswordNuevo] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(null);

    const handleNombreChange = (e) => setNombre(e.target.value);
    const handlePasswordActualChange = (e) => setPasswordActual(e.target.value);
    const handlePasswordNuevoChange = (e) => setPasswordNuevo(e.target.value);
    const handleFotoPerfilChange = (e) => setFotoPerfil(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para actualizar el perfil del estudiante
        console.log({ nombre, passwordActual, passwordNuevo, fotoPerfil });
    };

    return (
        <>

        <Nav />

        <div className="ajustes-perfil-estudiante">
            <h2>Ajustes del Perfil</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Foto de Perfil:</label>
                    <input type="file" onChange={handleFotoPerfilChange} />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={nombre} onChange={handleNombreChange} />
                </div>
                <div>
                    <label>Contraseña Actual:</label>
                    <input type="password" value={passwordActual} onChange={handlePasswordActualChange} />
                </div>
                <div>
                    <label>Nueva Contraseña:</label>
                    <input type="password" value={passwordNuevo} onChange={handlePasswordNuevoChange} />
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>

        <Footer />
        </>
    );
};

export default AjustesPerfilEstudiante;