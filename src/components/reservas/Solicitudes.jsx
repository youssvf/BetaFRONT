import React, { useEffect, useState } from "react";
import { getSolicitudesViaje, cancelarReserva, confirmarReserva } from "../../services/reservas";

export default function Solicitudes(){
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const solicitudesViaje = await getSolicitudesViaje();
        setSolicitudes(solicitudesViaje);
      } catch (error) {
        console.error("Error al obtener las solicitudes de viaje:", error);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleConfirmarReserva = async (idReserva) => {
    try {
      await confirmarReserva(idReserva);
      alert("Reserva confirmada exitosamente.");
      const nuevasSolicitudes = solicitudes.filter((solicitud) => solicitud.id !== idReserva);
      setSolicitudes(nuevasSolicitudes);
    } catch (error) {
      console.error("Error al confirmar la reserva:", error);
      alert("Error al confirmar la reserva. Por favor, inténtalo de nuevo.");
    }
  };

  const handleCancelarReserva = async (idReserva) => {
    try {
      await cancelarReserva(idReserva);
      alert("Reserva cancelada exitosamente.");
      const nuevasSolicitudes = solicitudes.filter((solicitud) => solicitud.id !== idReserva);
      setSolicitudes(nuevasSolicitudes);
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("Error al cancelar la reserva. Por favor, inténtalo de nuevo.");
    }
  };

  return (
      <div>
          <h1>Solicitudes de Viaje</h1>
          <ul>
              {solicitudes.map((solicitud) => (
                  <li key={solicitud.reserva_id}>
                      <p>Usuario: {solicitud.pasajero}</p>
                      <p>Origen: {solicitud.origen}</p>
                      <p>Destino: {solicitud.destino}</p>
                      <p>Fecha de Salida: {new Date(solicitud.fechasalida).toLocaleString()}</p>
                      <p>Asientos Reservados: {solicitud.asientosreservados}</p>
                      <p>Estado de Reserva: {solicitud.estadoreserva}</p>
                      {solicitud.estadoreserva === "pendiente" && (
                          <>
                              <button onClick={() => handleConfirmarReserva(solicitud.reserva_id)}>Confirmar Reserva</button>
                              <button onClick={() => handleCancelarReserva(solicitud.reserva_id)}>Cancelar Reserva</button>
                          </>
                      )}
                  </li>
              ))}
          </ul>

      </div>
  );
};

