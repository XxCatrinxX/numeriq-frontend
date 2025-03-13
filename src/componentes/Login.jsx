import React, { useState } from "react";
import { obtenerCsrfToken, loginUsuario } from "../api"; // Importamos las funciones necesarias

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Paso 1: Obtener el token CSRF
      await obtenerCsrfToken();
      
      // Paso 2: Intentar iniciar sesión con las credenciales
      const token = await loginUsuario(email, password);
      console.log("Token de acceso:", token);
      // Aquí puedes almacenar el token o continuar con tu flujo
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
