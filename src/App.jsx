import { useState } from "react";
import Registro from "./components/usuarios/Registro";
import { Link, Outlet } from "react-router-dom";
import Login from "./components/usuarios/Login";
import Viajes from "./components/viajes/Viajes";

function App() {
  const [usuario, setUsuario] = useState(null);

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
      </nav>

      <Outlet context={[usuario, setUsuario]} />
    </>
  );
}

export default App;
