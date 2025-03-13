import { createContext, useContext, useState, useEffect } from "react";
import api from "./api";

const CsrfContext = createContext();

export const useCsrf = () => useContext(CsrfContext);

export const CsrfProvider = ({ children }) => {
    const [csrfToken, setCsrfToken] = useState(null);
    const [authToken, setAuthToken] = useState(null); // Estado para guardar el token de acceso
    const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga

    // Obtener el CSRF token al montar el componente
    useEffect(() => {
        const getCsrfToken = async () => {
            try {
                await api.get("/sanctum/csrf-cookie"); // Laravel configura la cookie automáticamente
                const cookies = document.cookie.split("; ");
                const csrf = cookies.find(row => row.startsWith("XSRF-TOKEN="))?.split("=")[1];

                if (csrf) {
                    setCsrfToken(decodeURIComponent(csrf));
                    console.log("✅ CSRF token almacenado:", decodeURIComponent(csrf));
                }
            } catch (error) {
                console.error("❌ Error al obtener el CSRF token:", error);
            }
        };

        getCsrfToken();
    }, []);

    // Función para enviar el formulario de login
    const login = async (email, password) => {
        setLoading(true); // Empieza el proceso de carga

        try {
            // Enviar la solicitud de login con el email, la contraseña y el CSRF token
            const response = await api.post(
                "/api/login", 
                { email, password },
                { headers: { "X-XSRF-TOKEN": csrfToken } }
            );

            // Obtener el token de acceso desde la respuesta y guardarlo
            if (response.data.token) {
                setAuthToken(response.data.token);
                console.log("✅ Token de acceso obtenido:", response.data.token);

                // Almacenar el token en localStorage (puedes usar cookies si prefieres)
                localStorage.setItem('auth_token', response.data.token);
            }
        } catch (error) {
            console.error("❌ Error al iniciar sesión:", error);
        } finally {
            setLoading(false); // Termina el proceso de carga
        }
    };

    return (
        <CsrfContext.Provider value={{ csrfToken, authToken, login, loading }}>
            {children}
        </CsrfContext.Provider>
    );
};
