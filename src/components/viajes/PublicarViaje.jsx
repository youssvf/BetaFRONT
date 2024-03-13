import React, { useState } from "react";
import { crearViaje } from "../../services/viajes";
import { useNavigate } from "react-router-dom";

export default function PublicarViaje() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [asientosDisponibles, setAsientosDisponibles] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();


  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  const viaje = {
    origen,
    destino,
    fechasalida: fechaSalida,
    asientosdisponibles: parseInt(asientosDisponibles),
    precio: parseFloat(precio),
    descripcion,
    userEmail: usuario.email,
  };

  const handlePublicarViaje = async (e) => {
    e.preventDefault();
    try {
      await crearViaje(viaje);
      alert("Viaje publicado exitosamente.");
      navigate('/viajes');
    } catch (error) {
      console.error("Error al publicar el viaje:", error);
      alert("Error al publicar el viaje. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <h1>Publicar Viaje</h1>
      <form onSubmit={handlePublicarViaje}>
        <label>
          Origen:
          <input type="text" value={origen} onChange={(e) => setOrigen(e.target.value)} required />
        </label>
        <br />
        <label>
          Destino:
          <input type="text" value={destino} onChange={(e) => setDestino(e.target.value)} required />
        </label>
        <br />
        <label>
          Fecha de Salida:
          <input type="datetime-local" value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value)} required />
        </label>
        <br />
        <label>
          Asientos Disponibles:
          <input type="number" value={asientosDisponibles} onChange={(e) => setAsientosDisponibles(e.target.value)} required />
        </label>
        <br />
        <label>
          Precio:
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </label>
        <br />
        <label>
          Descripción:
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Publicar Viaje</button>
      </form>
    </div>
  );
}
