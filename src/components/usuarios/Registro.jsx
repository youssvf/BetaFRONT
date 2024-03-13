import React, { useState } from "react";
import { registrar } from "../../services/usuarios";
import { useNavigate } from "react-router-dom";

export default function Registro(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate();

  const usuario = { email, password, nombre, apellidos, telefono };

  const doRegistro = async (e) => {
    e.preventDefault();

    try {
      const usuarioRegistrado = await registrar(usuario);

      console.log("Usuario registrado:", usuarioRegistrado);

      navigate("/login");
    } catch (error) {
      console.error("Error durante el registro:", error);
    }
  };

  return (
    <div>
      {sessionStorage.getItem("usuario") ? (
        <p>Bienvenido, {JSON.parse(sessionStorage.getItem("usuario")).nombre} <button onClick={() => sessionStorage.clear()}>Cerrar Sesión</button></p>
      ) : (
        <div>
          <h1>Registro</h1>
          <form onSubmit={doRegistro}>
            <div>
              <label>Email:</label>
              <input name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Password:</label>
              <input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label>Nombre:</label>
              <input name="nombre" type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
              <label>Apellidos:</label>
              <input name="apellidos" type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
            </div>
            <div>
              <label>Teléfono:</label>
              <input name="telefono" type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
            <button type="submit">Registro</button>
          </form>
        </div>
      )}
    </div>
  );
};

  