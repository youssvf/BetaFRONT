const RESERVAR_URL = "http://localhost:8080/api/reservas/realizar";

export const reservarViaje = async (idViaje) => {
    try {
        const token = JSON.parse(sessionStorage.getItem("token"));

        if (!token) {
            throw new Error("No se encontró el token en sessionStorage");
        }

        const cantidadAsientos = prompt("Ingrese la cantidad de asientos a reservar:");

        if (!cantidadAsientos || isNaN(cantidadAsientos) || cantidadAsientos <= 0) {
            throw new Error("La cantidad de asientos ingresada no es válida");
        }

        const response = await fetch(`${RESERVAR_URL}/${idViaje}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ asientosreservados: cantidadAsientos }),
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
