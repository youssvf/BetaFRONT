const RESERVAS_URL = "http://34.201.190.251:8080/api/reservas/";

export const reservarViaje = async (idViaje) => {
    try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        console.log(token);

        if (!token) {
            throw new Error("No se encontró el token en sessionStorage");
        }

        const cantidadAsientos = prompt("Ingrese la cantidad de asientos a reservar:");

        if (!cantidadAsientos || isNaN(cantidadAsientos) || cantidadAsientos <= 0) {
            throw new Error("La cantidad de asientos ingresada no es válida");
        }

        const response = await fetch(RESERVAS_URL+'/realizar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ viaje:idViaje, asientosreservados: cantidadAsientos }),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const reservaConfirmada = await response.json();
        return reservaConfirmada;
    } catch (error) {
        console.error("Error al realizar la reserva:", error);
        throw new Error("Error al realizar la reserva");
    }
};


export const cancelarReserva = async (idReserva) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("token"));

    const response = await fetch(RESERVAS_URL+ '/cancelar/'+ idReserva, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const mensaje = await response.json();
    return mensaje;
  } catch (error) {
    console.error("Error al cancelar la reserva:", error);
    throw new Error("Error al cancelar la reserva");
  }
};

export const getReservasUsuario = async () => {
  try { 
    const token = JSON.parse(sessionStorage.getItem("token"));

    const response = await fetch(RESERVAS_URL + 'historial', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const reservas = await response.json();
    return reservas;
  } catch (error) {
    console.error("Error al obtener las reservas del usuario:", error);
    throw new Error("Error al obtener las reservas del usuario");
  }
};


export const getSolicitudesViaje = async () => {
  try {
    const token = JSON.parse(sessionStorage.getItem("token"));

    const response = await fetch(RESERVAS_URL+'solicitudes', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const solicitudesViaje = await response.json();
    return solicitudesViaje;
  } catch (error) {
    console.error("Error al obtener las solicitudes de viaje:", error);
    throw new Error("Error al obtener las solicitudes de viaje");
  }
};



export const confirmarReserva = async (reservaId) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('token'));

    const response = await fetch(RESERVAS_URL + 'confirmar/' + reservaId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const resultado = await response.json();
    return resultado;
  } catch (error) {
    console.error('Error al confirmar la reserva:', error);
    throw new Error('Error al confirmar la reserva');
  }
};


