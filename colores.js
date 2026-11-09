// Seleccionar elementos de HTML

const boton = document.getElementById("generar-paleta");
const selectorCantidad = document.getElementById("cantidad-colores");
const contenedorPaleta = document.getElementById("paleta");
const botonHSL = document.getElementById("formato-hsl");
const botonHEX = document.getElementById("formato-hex");

let colores = [];
let formato = "HSL";


// Crear tarjetas de colores

function crearTarjeta(color) {

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("color-card");

    const vistaColor = document.createElement("div");
    vistaColor.classList.add("color-preview");

    const colorHSL = "hsl(" + color.h + ", " + color.s + "%, " + color.l + "%)";

    vistaColor.style.backgroundColor = colorHSL;

    const codigo = document.createElement("p");
    codigo.classList.add("color-code");

    if (formato === "HSL") {
        codigo.textContent = colorHSL;
    } else {
        codigo.textContent = hslAHex(color.h, color.s, color.l);
    }

    tarjeta.appendChild(vistaColor);
    tarjeta.appendChild(codigo);

    return tarjeta;
}


// Generar un color aleatorio
    
function generarColor() {

    const tono = Math.floor(Math.random() * 360);
    const saturacion = Math.floor(Math.random() * 51) + 40;
    const luminosidad = Math.floor(Math.random() * 41) + 30;

    return {
        h: tono,
        s: saturacion,
        l: luminosidad
    };
}


// Convertir HSL a HEX

function hslAHex(h, s, l) {
    s = s / 100;
    l = l / 100;

    const a = s * Math.min(l, 1 - l);

    function convertir(n) {
        const k = (n + h / 30) % 12;
        const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

        return Math.round(255 * c).toString(16).padStart(2, "0");
    }

    return ("#" + convertir(0) + convertir(8) + convertir(4)).toUpperCase();
}


// Detectar click en el botón y mostrar la paleta

boton.addEventListener("click", function() {
    const cantidad = Number(selectorCantidad.value);
    colores = generarPaleta(cantidad);

    formato = "HSL";
    botonHSL.classList.add("activo");
    botonHEX.classList.remove("activo");

    mostrarPaleta();
});


// Generar una paleta con la cantidad seleccionada

function generarPaleta(cantidad) {
    const paleta = [];

    for (let i = 0; i < cantidad; i++) {
        paleta.push(generarColor());
    }

    return paleta;
}

// Mostrar la paleta de colores

function mostrarPaleta() {

    contenedorPaleta.innerHTML = "";

    colores.forEach(function(color) {
        const tarjeta = crearTarjeta(color);

        contenedorPaleta.appendChild(tarjeta);
    });

}

// Cambiar el formato a HSL

botonHSL.addEventListener("click", function() {
    formato = "HSL";

    botonHSL.classList.add("activo");
    botonHEX.classList.remove("activo");

    mostrarPaleta();
});


// Cambiar el formato a HEX

botonHEX.addEventListener("click", function() {
    formato = "HEX";

    botonHEX.classList.add("activo");
    botonHSL.classList.remove("activo");

    mostrarPaleta();
});