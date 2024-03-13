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
