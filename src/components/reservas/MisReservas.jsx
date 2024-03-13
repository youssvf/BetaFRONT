import React, { useEffect, useState } from "react";
import { cancelarReserva, getReservasUsuario } from "../../services/reservas";

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const reservasUsuario = await getReservasUsuario();
        setReservas(reservasUsuario);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  const handleCancelarReserva = async (idReserva) => {
    try {
      await cancelarReserva(idReserva);
      alert("Reserva cancelada exitosamente.");
      const reservasUsuario = await getReservasUsuario();
      setReservas(reservasUsuario);
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("Error al cancelar la reserva. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <h1>Mis Reservas</h1>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            <p>Viaje: {reserva.viaje}</p>
            <p>Asientos Reservados: {reserva.asientosreservados}</p>
            <p>Estado de la Reserva: {reserva.estadoreserva}</p>
            {reserva.estadoreserva === "pendiente" && (
              <>
                <button onClick={() => handleCancelarReserva(reserva.id)}>Cancelar Reserva</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
