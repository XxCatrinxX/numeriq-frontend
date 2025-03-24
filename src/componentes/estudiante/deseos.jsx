import React, { useState, useEffect } from 'react';
import Nav from "./nav";
import "../../CSS/estudiante/deseos.css"; // Importa el archivo CSS
import Footer from "../Footer";
import { obtenerDeseos } from "../../api"; // Importa la función obtenerDeseos

const Deseos = () => {
    const [cursos, setCursos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDeseos = async () => {
            try {
                const data = await obtenerDeseos();
                setCursos(data);
            } catch (error) {
                console.error("Error obteniendo los cursos deseados:", error);
                setError("Hubo un error al obtener los cursos deseados");
            }
        };

        fetchDeseos();
    }, []);

    const handleComprar = (id) => {
        alert(`Compraste el curso con id: ${id}`);
    };

    const handleAñadirAlCarrito = (id) => {
        alert(`Añadiste el curso con id: ${id} al carrito`);
    };

    return (
        <>
            <Nav />
            <div className="lista-deseos">
                <h1>Lista de Deseos</h1>
                {error && <p>{error}</p>}
                <ul>
                    {cursos.map((curso) => (
                        <li key={curso.id}>
                            <h2>{curso.nombre}</h2>
                            <p>Precio: ${curso.precio}</p>
                            <p>Valoración: {curso.valoracion} estrellas</p>
                            <button onClick={() => handleComprar(curso.id)}>Comprar</button>
                            <button onClick={() => handleAñadirAlCarrito(curso.id)}>Añadir al carrito</button>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </>
    );
};

export default Deseos;