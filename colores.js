console.log("comprobar función");

const boton = document.getElementById("generar-paleta");
console.log(boton);

const selectorCantidad = document.getElementById("cantidad-colores");

const contenedorPaleta = document.getElementById("paleta");

console.log(selectorCantidad);


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
    
    console.log(generarPaleta(cantidad));

});


// Generar una paleta de colores al hacer clic en el botón

function generarPaleta(cantidad) {
    const paleta = [];

    for (let i = 0; i < cantidad; i++) {
        paleta.push(generarColor());
    }

    return paleta;
}