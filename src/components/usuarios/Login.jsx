import React, { useState } from "react";
import { login } from "../../services/usuarios";
import { useNavigate } from "react-router-dom";

export default function Login({ setUsuario }){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const credenciales = { email, password };

  const doLogin = async (e) => {
    e.preventDefault();
    try {
      const usuarioAutenticado = await login(credenciales);

      console.log("Usuario autenticado:", usuarioAutenticado);
      sessionStorage.clear();
      sessionStorage.setItem("usuario", JSON.stringify(usuarioAutenticado.usuario));
      sessionStorage.setItem("token", JSON.stringify(usuarioAutenticado.token));

      navigate("/viajes");
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
    }
  };

  return (
    <div>
      {sessionStorage.getItem("usuario") ? (
        <p>Bienvenido, {JSON.parse(sessionStorage.getItem("usuario")).nombre} <button onClick={() => sessionStorage.clear()}>Cerrar Sesión</button></p>
      ) : (
        <div>
          <h1>Login</h1>
          <form onSubmit={doLogin}>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

