import { useState } from "react";
import Registro from "./components/usuarios/Registro";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Login from "./components/usuarios/Login";
import Viajes from "./components/viajes/Viajes";

function App() {
  const [usuario, setUsuario] = useState(null);

  const navigate = useNavigate('');

  const handleCerrarSesion = () => {
    sessionStorage.clear();
    navigate('/')
  }

  return (
    <>
      <h1>UniRides</h1>
      <nav>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/registro">Registro</Link>
        </div>
        <div>
          <Link to="/viajes">Viajes</Link>
        </div>
        <div>
          <Link to="/misreservas">Mis Reservas</Link>
        </div>
        <div>
          <Link to='/publicarViaje'>Publicar Viaje</Link>
        </div>
        <div>
          <Link to='/solicitudes'>Solicitudes</Link>
        </div>
        {sessionStorage.getItem("usuario") && (
        <button onClick={handleCerrarSesion}>Cerrar Sesión</button>
      )}
      </nav>
      <Outlet context={[usuario, setUsuario]} />
    </>
  );
}

export default App;
