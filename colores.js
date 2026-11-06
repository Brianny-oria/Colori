console.log("comprobar función");

const boton = document.getElementById("generar-paleta");
console.log(boton);

const selectorCantidad = document.getElementById("cantidad-colores");

const contenedorPaleta = document.getElementById("paleta");

console.log(selectorCantidad);


// Crear tarjeta de color

function crearTarjeta(color) {

const tarjeta = document.createElement("div");
tarjeta.classList.add("color-card");


const vistaColor = document.createElement("div");
vistaColor.classList.add("color-preview");
vistaColor.style.backgroundColor = color;


const codigoColor = document.createElement("p");
codigoColor.classList.add("color-code");
codigoColor.textContent = color;

tarjeta.appendChild(vistaColor);
tarjeta.appendChild(codigoColor);

return tarjeta;
}

// Comprobar creación de la tarjeta

console.log(crearTarjeta("hsl(120, 50%, 60%)"));



// Generar un color aleatorio al hacer clic en el botón

function generarColor() {
    const tono = Math.floor(Math.random() * 360);

   const saturacion = Math.floor(Math.random() * 101);
   
   const luminosidad = Math.floor(Math.random() * 101);

   const color = "hsl(" + tono + ", " + saturacion + "%, " + luminosidad + "%)";
   
   return color;

}


// Botón para generar la paleta de colores

boton.addEventListener("click", function() {
    const cantidad = Number(selectorCantidad.value);

    const colores = generarPaleta(cantidad);

    contenedorPaleta.innerHTML = "";

    colores.forEach(function(color) {
        const tarjeta = crearTarjeta(color);

        contenedorPaleta.appendChild(tarjeta);
    });
});


// Generar una paleta de colores al hacer clic en el botón

function generarPaleta(cantidad) {
    const paleta = [];

    for (let i = 0; i < cantidad; i++) {
        paleta.push(generarColor());
    }

    return paleta;
}