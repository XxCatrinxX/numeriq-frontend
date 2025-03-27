import React, { useState, useEffect } from "react";
import Nav from "./nav";
import "../../CSS/estudiante/deseos.css"; // Importa el archivo CSS
import Footer from "../Footer";
import {agregarAlCarrito, obtenerDeseos} from "../../api"; // Importa la función obtenerDeseos

const Deseos = () => {
    const [cursos, setCursos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeseos = async () => {
            try {
                const data = await obtenerDeseos();
                setCursos(data.deseos || []); // Asegurar que siempre es un array
            } catch (error) {
                console.error("Error obteniendo los cursos deseados:", error);
                setError(error.response?.data?.message || "Hubo un error al obtener los cursos deseados");
            } finally {
                setLoading(false);
            }
        };

        fetchDeseos();
    }, []);

    const handleComprar = (id) => {
        alert(`Compraste el curso con id: ${id}`);
    };

    const handleAñadirAlCarrito = async (idTema) => {
        try {
            const resultado = await agregarAlCarrito(idTema);
            alert("El tema se ha agregado al carrito exitosamente.");
        } catch (error) {
            alert("Hubo un error al agregar el tema al carrito.");
        }    };

    return (
        <>
            <Nav />
            <div className="lista-deseos">
                <h1>Lista de Deseos</h1>
                {loading && <p>Cargando...</p>}
                {error && <p className="error">{error}</p>}

                {cursos.length === 0 && !loading && !error && (
                    <p>No tienes cursos en tu lista de deseos.</p>
                )}

                <ul>
                    {cursos.map((deseo) => (
                        <li key={deseo.id}>
                            <h2>{deseo.tema.nombreTema}</h2>
                            <p>{deseo.tema.descripcionTema}</p>
                            <p>Precio: ${deseo.tema.precio}</p>
                            <button onClick={() => handleComprar(deseo.tema.idTema)}>Comprar</button>
                            <button onClick={() => handleAñadirAlCarrito(deseo.tema.idTema)}>Añadir al carrito</button>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </>
    );
};

export default Deseos;
