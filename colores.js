// Seleccionar elementos de HTML

const boton = document.getElementById("generar-paleta");
const selectorCantidad = document.getElementById("cantidad-colores");
const contenedorPaleta = document.getElementById("paleta");



// Convertir HSL a RGB

function hslARgb(tono, saturacion, luminosidad) {
    const s = saturacion / 100;
    const l = luminosidad / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((tono / 60) % 2 - 1));
    const m = l - c / 2;

    let rojo, verde, azul;

    if (tono < 60) {
        rojo = c;
        verde = x;
        azul = 0;
    }

    else if (tono < 120) {
        rojo = x;
        verde = c;
        azul = 0;
    }

     else if (tono < 180) {
        rojo = 0;
        verde = c;
        azul = x;
    }
    else if (tono < 240) {
        rojo = 0;
        verde = x;
        azul = c;
    }
    else if (tono < 300) {
        rojo = x;
        verde = 0;
        azul = c;
    }
    else {
        rojo = c;
        verde = 0;
        azul = x;
    }

    return [
        Math.round((rojo + m) * 255),
        Math.round((verde + m) * 255),
        Math.round((azul + m) * 255)
    ];


}


// Crear tarjetas de colores

function crearTarjeta(color) {

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("color-card");

    const vistaColor = document.createElement("div");
    vistaColor.classList.add("color-preview");
    vistaColor.style.backgroundColor = color.hsl;

    const codigoHSL = document.createElement("p");
    codigoHSL.classList.add("color-code");
    codigoHSL.textContent = color.hsl;

    const codigoHEX = document.createElement("p");
    codigoHEX.classList.add("color-code");
    codigoHEX.textContent = color.hex;

    tarjeta.appendChild(vistaColor);
    tarjeta.appendChild(codigoHSL);
    tarjeta.appendChild(codigoHEX);

    return tarjeta;
}


// Generar un color aleatorio

function generarColor() {
    
    const tono = Math.floor(Math.random() * 360);
    const saturacion = Math.floor(Math.random() * 101);
    const luminosidad = Math.floor(Math.random() * 101);

    const colorHSL = "hsl(" + tono + ", " + saturacion + "%, " + luminosidad + "%)";

    const rgb = hslARgb(tono, saturacion, luminosidad);

    const colorHEX = convertirRGBaHex(rgb[0], rgb[1], rgb[2]);

    return {
        hsl: colorHSL,
        hex: colorHEX
    };
}


// Convertir RGB a HEX

function convertirRGBaHex(rojo, verde, azul) {

    const rojoHex = rojo.toString(16).padStart(2, "0");
    const verdeHex = verde.toString(16).padStart(2, "0");
    const azulHex = azul.toString(16).padStart(2, "0");

    return ("#" + rojoHex + verdeHex + azulHex).toUpperCase();

}


// Detectar click en el botón y mostrar la paleta

boton.addEventListener("click", function() {
    const cantidad = Number(selectorCantidad.value);

    const colores = generarPaleta(cantidad);

    contenedorPaleta.innerHTML = "";

    colores.forEach(function(color) {
        const tarjeta = crearTarjeta(color);

        contenedorPaleta.appendChild(tarjeta);
    });
});


// Generar una paleta con la cantidad seleccionada

function generarPaleta(cantidad) {
    const paleta = [];

    for (let i = 0; i < cantidad; i++) {
        paleta.push(generarColor());
    }

    return paleta;
}
