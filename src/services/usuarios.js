const REGISTRO_URL = "http://34.201.190.251:8080/api/usuarios/registro";

export const registrar = async (usuario) => {
  try {
    const response = await fetch(REGISTRO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const usuarioRegistrado = await response.json();
    return usuarioRegistrado;
  } catch (error) {
    console.error("Error durante el registro:", error);
    throw new Error("Error durante el registro");
  }
};

const LOGIN_URL = "http://34.201.190.251:8080/api/usuarios/login";

export const login = async (credenciales) => {
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciales),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const usuarioAutenticado = await response.json();
    return usuarioAutenticado;
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    throw new Error("Error durante el inicio de sesión");
  }
};

