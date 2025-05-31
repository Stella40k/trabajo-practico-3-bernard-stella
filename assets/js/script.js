const API_URL_BASE = "https://dragonball-api.com/api/characters"; //el url para las peticiones

//cargarDatos sera la caja donde estara guardado los arrays, esta caja despues se usara cada q querramos manipualar lo de la pagina
const cargarDatos = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new error("Error en la API");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
x;
