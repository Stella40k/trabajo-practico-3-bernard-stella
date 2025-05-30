const API_URL_BASE = "https://dragonball-api.com/api/characters";
const botonAccion = document.getElementById("btn-buscar");
const campoTextoBusqueda = document.getElementById("input-busqueda");
const contenedorResultados = document.getElementById("contenedor-data");

const modalInfoElemento = document.getElementById('modal-detalles');
const instanciaModal = new bootstrap.Modal(modalInfoElemento);
const tituloModal = document.getElementById('modal-titulo');
const cuerpoModal = document.getElementById('modal-cuerpo');

const indicadorCarga = document.getElementById('spinner');
const mensajeAlertaBusqueda = document.getElementById('mensaje-error');


// AcáA VA PERSONAJESSs
let totalPersonajes = [];

/* Carga los datos de la API*/
const cargarDatos = async (dbz_api) => {
    try {
        const response = await fetch(dbz_api);
        if (!response.ok) {
            throw new Error("Error de la Api");
        }
        const data = await response.json();
        totalPersonajes = data.items; // Guardamos en una variable global
        mostrarPersonajes(totalPersonajes);
    } catch (error) {
        console.log(error);
        contenedorPadre.innerHTML = <p class="mensaje-error">Error: ${error.message}</p>;
    }
};



/* esta funcion va a mostrarme los personajes */
const mostrarPersonajes = (personajes) => {
    if (personajes.length === 0) {
        contenedorPadre.innerHTML = '<p class="mensaje-error">No se encontraron personajes.</p>';
        return;
    }
    contenedorPadre.innerHTML = "";
    personajes.forEach(personaje => {
        contenedorPadre.innerHTML += `
            <div class="col-md-6 col-lg-3 pb-3">
                <div class="card h-100">
                    <img src="${personaje.image}" class="card-img" alt="${personaje.name}" style="height: 200px; object-fit: contain;">
                    <div class="card-body">
                        <h5 class="card-title">${personaje.name}</h5>
                        <p class="card-text">Raza: ${personaje.race || "Raza desconocida"}</p>
                        <p class="card-text">Género: ${personaje.gender || "Género desconocido"}</p>
                    </div>
                </div>
            </div>
        `;
    });
};

/* Función para buscar a los personajes */
function buscarPersonajes() {
    const texto = searchInput.value.trim().toLowerCase();
    
    if (!texto) {
        mostrarPersonajes(totalPersonajes);
        return;
    }

    const filtrados = totalPersonajes.filter(p => 
        p.name.toLowerCase().includes(texto)
    );
    
    mostrarPersonajes(filtrados);
}

// Eventos
btnBuscar.addEventListener("click", buscarPersonajes);
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") buscarPersonajes();
});
document.addEventListener("DOMContentLoaded", cargarDatos);

/* const contenedorPadre = document.getElementById("contenedor-padre");
const urlDragonBall = "https://dragonball-api.com/api/characters";
const btnTraerDatos = document.getElementById("btn-traer-datos")


const cargarDatos = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new error("Error en la API");
        }

        const data = await response.json();

        // retornando el arreglo
        return data.items
    } catch (error) {
        console.log(error);
    }
};

cargarDatos(urlDragonBall);

// para dragon ball
btnTraerDatos.addEventListener("click", async () => {
    console.log("si llega")
    // guardando el arreglo en una variable para poder recorrerla despues 
    // data es un arreglo 
    const personajes = await cargarDatos(urlDragonBall)

    console.log(personajes[0])


    personajes.forEach((personaje) => {
        contenedorPadre.innerHTML += `
        <div class="card mt-4" style="width: 18rem;">
            <img src=${personaje.image} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <p class="card-text">${personaje.gender}</p>
                <a href="#" class="btn btn-primary">Ver más</a>
            </div>
        </div>
      `;
    });
}); */
