import { useLocation } from 'react-router-dom';

export default function Resultados() {
    const location = useLocation();
    const { cursos = [] } = location.state || {};

    return (
        <div>
            <h1>Resultados de búsqueda</h1>
            {Array.isArray(cursos) && cursos.length > 0 ? (
                cursos.map((curso) => (
                    <div key={curso.id}>
                        <h3>{curso.nombreTema}</h3>
                        <p>{curso.descripcionTema}</p>
                    </div>
                ))
            ) : (
                <p>No se encontraron cursos.</p>
            )}
        </div>
    );
}
