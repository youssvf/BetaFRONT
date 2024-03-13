const VIAJES_URL = "http://localhost:8080/api/viajes";

export const getViajes = async () => {
  try {
    const response = await fetch(VIAJES_URL);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const viajesDisponibles = await response.json();
    return viajesDisponibles;
  } catch (error) {
    console.error("Error al obtener los viajes:", error);
    throw new Error("Error al obtener los viajes");
  }
};


export const crearViaje = async (viaje) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log(token)
    console.log(viaje);

    const response = await fetch(VIAJES_URL+'/crear', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(viaje),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const viajeCreado = await response.json();
    return viajeCreado;
  } catch (error) {
    console.error("Error al crear el viaje:", error);
    throw new Error("Error al crear el viaje");
  }
};

