import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/nav.css';

const Navadmin = () => {
    const [submenuOpen, setSubmenuOpen] = useState(false);

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/admin/usuarios">Usuarios</Link>
                    </li>
                    <li className="submenu">
                        <span onClick={() => setSubmenuOpen(!submenuOpen)}>Cursos ▾</span>
                        {submenuOpen && (
                            <ul className="submenu-items">
                                <li>
                                    <Link to="/admin/todos-los-cursos">Todos los Cursos</Link>
                                </li>
                                <li>
                                    <Link to="/admin/nuevo-tema">Crear Nuevo Curso</Link>
                                </li>
                                <li>
                                    <Link to="/admin/categorias">Categorías</Link>
                                </li>
                                <li>
                                    <Link to="/admin/reportes">Reportes de Cursos</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link to="/admin/configuracion">Configuración</Link>
                    </li>
                    <li>
                        <Link to="/admin/soporte">Soporte</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navadmin;
