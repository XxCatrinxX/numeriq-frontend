import React, { useState } from "react";
import "../../../css/forms/formulario.css"; // Importamos los estilos
import axios from "axios";

const CreateTutor = () => {
    const [errors, setErrors] = useState({}); // Estado para manejar los errores


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await axios.post("/tutores", formData);
            // Manejar la respuesta exitosa
            console.log(response.data.message);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Registrar un nuevo tutor</h2>

            <form
                method="POST"
                action="/tutores"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                {/* Token CSRF */}
                <input
                    type="hidden"
                    name="_token"
                    value={document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content")}
                />
                    <>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Ingresa el nombre del tutor"
                            />
                            {errors.nombre && (
                                <div className="text-red-500">
                                    {errors.nombre[0]}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="apellido">Apellido</label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                placeholder="Ingresa el apellido del tutor"
                            />
                            {errors.apellido && (
                                <div className="text-red-500">
                                    {errors.apellido[0]}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Crea una contraseña para el tutor"
                            />
                            {errors.password && (
                                <div className="text-red-500">
                                    {errors.password[0]}
                                </div>
                            )}
                        </div>
                    </>
                

                    <>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Ingresa el correo electrónico del tutor"
                            />
                            {errors.email && (
                                <div className="text-red-500">
                                    {errors.email[0]}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="bio">Biografía</label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows="4"
                                placeholder="Escribe una breve biografía del tutor"
                            ></textarea>
                            {errors.bio && (
                                <div className="text-red-500">
                                    {errors.bio[0]}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="especialidad">Especialidad</label>
                            <input
                                type="text"
                                id="especialidad"
                                name="especialidad"
                                placeholder="Áreas de especialización del tutor"
                            />
                            {errors.especialidad && (
                                <div className="text-red-500">
                                    {errors.especialidad[0]}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="anios_experiencia">
                                Años de experiencia
                            </label>
                            <input
                                type="number"
                                id="anios_experiencia"
                                name="anios_experiencia"
                                placeholder="Número de años de experiencia"
                                min="0"
                            />
                            {errors.anios_experiencia && (
                                <div className="text-red-500">
                                    {errors.anios_experiencia[0]}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="foto_perfil">Foto de perfil</label>
                            <input
                                type="file"
                                id="foto_perfil"
                                name="foto_perfil"
                                accept="image/*"
                            />
                            {errors.foto_perfil && (
                                <div className="text-red-500">
                                    {errors.foto_perfil[0]}
                                </div>
                            )}
                        </div>
                    </>

                {/* Botones para navegar entre pasos */}
                <div className="form-group">
                        <button type="submit">Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTutor;
