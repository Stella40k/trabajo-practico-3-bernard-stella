const API_URL_BASE = "https://dragonball-api.com/api/characters"; //٭ el url para las peticiones

//٭ cargarDatos sera la caja donde estara guardado los arrays, esta caja despues
//se usara cada q querramos manipualar lo de la pagina
//٭ asyn = asincrono, funcion asincrona
const cargarDatos = async () => {
  try {
    //٭ try catch= se usa por si pasa un error, si existe un error con la API
    //muestra el error, por eso el if els, esta evaluando el valor del fetch
    //٭ response = aca guardan las respuestas del fetch (medio obvio pero si no anoto me pierdo sola despues xd)
    const response = await fetch();
    //٭f etch pide los datos a la url, puede tardar
    //٭ el await sirve para q el fetch espera a q se termine

    //٭ el signo de exclamacion es la negacion del resoinse.ok, se lee "si no existe el response ok"
    //mostra el error
    if (!response.ok) {
      throw new error("Error en la API");
    }

    //٭ esta es la otra parte de la condicion, si no hay error entonces la respuesta etra en data
    //٭ .json = es la forma q se piden los datos, la forma en la q se comunican con http
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

//٭  esto es para guardar los dealles del personaje
const verDetalles = async (id) => {
  try {
    const response = await fetch(`${API_URL_BASE}/${id}`);

    if (!response.ok) {
      throw new error("Error en la API");
    }

    const data = await response.json();

    alert(data.description);
  } catch (error) {
    console.log(error);
  }
};
