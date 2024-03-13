const USUARIOS_URL = "http://34.201.190.251:8080/api/usuarios/";

export const registrar = async (usuario) => {
  try {
    const response = await fetch(USUARIOS_URL+'registro', {
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

export const login = async (credenciales) => {
  try {
    const response = await fetch(USUARIOS_URL+'/login', {
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

