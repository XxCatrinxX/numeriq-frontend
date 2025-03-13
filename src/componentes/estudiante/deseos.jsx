import React from 'react';
import Nav from "./nav";
import "../../CSS/estudiante/deseos.css"; // Importa el archivo CSS
import Footer from "../Footer";

const Deseos = () => {
    const cursos = [
        {
            id: 1,
            nombre: 'Curso de React',
            precio: 50,
            valoracion: 4.5,
        },
        {
            id: 2,
            nombre: 'Curso de Node.js',
            precio: 40,
            valoracion: 4.7,
        },
        {
            id: 3,
            nombre: 'Curso de Python',
            precio: 60,
            valoracion: 4.8,
        },
    ];

    const handleComprar = (id) => {
        alert(`Compraste el curso con id: ${id}`);
    };

    return (
        <>
            <Nav />
            <div className="lista-deseos">
                <h1>Lista de Deseos</h1>
                <ul>
                    {cursos.map((curso) => (
                        <li key={curso.id}>
                            <h2>{curso.nombre}</h2>
                            <p>Precio: ${curso.precio}</p>
                            <p>Valoración: {curso.valoracion} estrellas</p>
                            <p></p>
                            <button onClick={() => handleComprar(curso.id)}>Comprar</button>
                            <button onClick={() => handleComprar(curso.id)}>Añadir al carrito</button>

                        </li>
                    ))}
                </ul>
            </div>

            <Footer />
        </>
    );
};

export default Deseos;