const API_URL_BASE = "https://dragonball-api.com/api/characters"; //٭ el url para las peticiones
//٭ este es la funcion para el btn del buscador
const btnBuscar = document.getElementById("boton.buscar");
//٭  el document es la representacion de html
//٭  getElementById es hace q encuentre mas facil el elemnto por el id
const contenedorPadre = document.getElementById("contenedor-data");

//٭ esta parte es para la funcion q carga datos en la API

//٭ cargarDatos sera la caja donde estara guardado los arrays, esta caja despues
//se usara cada q querramos manipualar lo de la pagina
//٭ asyn = asincrono, funcion asincrona es la q hace las peticiones http a la API
const cargarDatos = async () => {
  try {
    //٭ try catch= se usa por si pasa un error, si existe un error con la API
    //muestra el error, por eso el if els, esta evaluando el valor del fetch
    //٭ response = aca guardan las respuestas del fetch (medio obvio pero si no anoto me pierdo sola despues xd)
    const response = await fetch(API_URL_BASE);
    //٭f etch pide los datos a la url, puede tardar
    //٭ el await sirve para q el fetch espera a q se termine

    //٭ el signo de exclamacion es la negacion del resoinse.ok, se lee "si no existe el response ok"
    //mostra el error
    if (!response.ok) {
      throw new error(
        "Error en la API: ${response.status} - ${response.statusText}"
      ); //el mensaje mostrara el mensaje y el estado guardado dentro de esas variables
    }

    //٭ esta es la otra parte de la condicion, si no hay error entonces la respuesta etra en data
    //٭ .json = es la forma q se piden los datos, la forma en la q se comunican con http
    const data = await response.json();

    console.log("Datos cargados de la API:", data);

    //٭ al retornard data contendra los items q seria la lista de los pj
    return data;
  } catch (error) {
    console.error("Error al cargar datos:", error);
    return null; //٭ pongo esto para evitar bugs
  }
};

//esta parte  es de la funcion para ver los detalles de un pj en especifico (por la id)
//٭  esto es para guardar los dealles del personaje
const verDetalles = async (id) => {
  try {
    //٭ esta funcion hace lo mismo q la otra, en verDetalles esta guardando la id del
    //personaje, usa el response (q es la url + el identificador de cada pj), verifica
    //el valor de verdad y segun el valor muestra el error o muestra la descripcion de todo
    const response = await fetch(`${API_URL_BASE}/${id}`);

    if (!response.ok) {
      throw new error(
        "Error en la API: ${response.status} - ${response.statusText}"
      );
    }

    const data = await response.json();

    //esta parte debe mostrar la descripcion del pj en un alert
    alert(data.description);
  } catch (error) {
    console.error("No se cargaron los datos: ", error);
  }
};

//aca estaran las funciones (logica) de los pj en el DOM

//٭ esta funcion es la q va a evitar el bug de las cartas duplicadas cuando buscamos un pj
const renderizarPersonajes = (personajes) => {
  if (contenedorPadre) {
    contenedorPadre.innerHTML = "";
  } else {
    console.error(
      "Error: El elemento con ID 'contenedor-data' no fue encontrado en el DOM."
    );
    return; // Salir de la función si no hay contenedor.
  }
  //٭ si el contenido de contPadre es null es pq ese id no existe en la API
};

document.addEventListener("DOMContentLoaded", async () => {
  if (contenedorPadre) {
    contenedorPadre.innerHTML = "";
  }
  const data = await cargarDatos();

  console.log(dataPersonajes);
});

//٭ esta funcion sera lo q interactuara con todo el api y nos da la respuesta
dataPersonajes.forEach((personaje) => {
  contenedorPadre.innerHTML += `
            <div class="col-3 pb-2 d-flex justify-content-center" id="${personaje.id}">
              <div class="card" style="width: 20rem;">
               <img src=${personaje.image} class="card-img-top" alt="Imagen personaje"/>
                <div class="card-body">
                  <h5 class="card-title">${personaje.name}</h5>
                  <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                  <button class="btn btn-primary btn-ver-detalles">Ver más</button>                </div>
              </div>
            </div>
    `;
});

// parte de la funcion del boton y del click

//٭ .addEventLister es para escuchar eventos q pasan en elementos especificos
//٭  click es el evento q estamos escuchando cuando se hace click
btnBuscar.addEventListener("click", async (event) => {
  event.preventDefault(); //٭ este codigo es para q no recargue el formulario

  const data = await cargarDatos();
  if (!data) return; //si cargaDatos retorna null (pq hubo error) se sale de la funcion

  //la API devuelve los pj en un array en la propiedad de items
  const dataPersonajes = data.items;

  console.log(dataPersonajes);

  renderizarPersonajes(dataPersonajes); //aca se llaman a las cartas para renderizar
});

//esta parte sera para el evento del btn ver mas

//٭ para no tener q ponerle un evento listener a cada boton le añadi uno solo en el contenedorPadre
//queda mejor pq hay muchos pjs y para cuando se añadan nuevas no sea tan engorroso
if (contenedorPadre) {
  //٭ esta condicion evalua el valor de verdad con la id "contenedor-data"
  contenedorPadre.addEventListener("click", (e) => {
    //٭ e.target' es el elemento en el q se hizo clic
    //٭ verificamos si el elemento clicado contiene la clase 'btn-ver-detalles'
    if (e.target.classList.contains("btn-ver-detalles")) {
      const cardPadre = e.target.closest(".col-3");

      //٭ si se encuentra el div padre de la carta se hace esta funcion
      //obtenemos el id del pj con su atributo data-id
      if (cardPadre) {
        const id = cardPadre.dataset.id;
        //se llama a la funcion para mostrar los detalles del pj
        verDetalles(id);
      }
    }
  });
}

//esta parte sera para la carga inicial de los personajes por default

//٭la parte DOMCont... se dispara cuando el html se cargue completamente
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM completado");

  //٭ cargamos los datos de la API
  const data = await cargarDatos();
  // hi hay un error al cargar no se hace nada
  if (!data) return;

  // ٭esto hara q tengamos toda la lista de los pj
  const dataPersonajes = data.items;

  console.log("Personajes cargados:", dataPersonajes);

  renderizarPersonajes(dataPersonajes);
});
