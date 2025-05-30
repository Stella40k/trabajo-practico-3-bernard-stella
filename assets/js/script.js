const contenedorPadre = document.getElementById("contenedor-padre");
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
});
