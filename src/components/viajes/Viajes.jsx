import React, { useEffect, useState } from "react";
import { getViajes } from "../../services/viajes";
import { reservarViaje } from "../../services/reservas";

export default function Viajes() {
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    const fetchViajes = async () => {
      try {
        const viajesDisponibles = await getViajes();
        const viajesConFechasLegibles = viajesDisponibles.map((viaje) => ({
          ...viaje,
          fechasalida: new Date(viaje.fechasalida).toLocaleString(),
        }));
        setViajes(viajesConFechasLegibles);
      } catch (error) {
        console.error("Error al obtener los viajes:", error);
      }
    };

    fetchViajes();
  }, []);

  const reservar = async (idViaje) => {
    try {
      await reservarViaje(idViaje);
      const nuevosViajes = await getViajes();
      setViajes(nuevosViajes);
    } catch (error) {
      console.error("Error al reservar el viaje:", error);
    }
  };

  return (
    <div>
      <h1>Viajes Disponibles</h1>
      <ul>
        {viajes.map((viaje) => (
          <li key={viaje.id}>
            <p>Origen: {viaje.origen}</p>
            <p>Destino: {viaje.destino}</p>
            <p>Fecha de Salida: {viaje.fechasalida}</p>
            <p>Asientos Disponibles: {viaje.asientosdisponibles}</p>
            <p>Precio: {viaje.precio}</p>
            <p>Descripción: {viaje.descripcion}</p>
            <button onClick={() => reservar(viaje.id)}>Reservar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
