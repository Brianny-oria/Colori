// Seleccionar elementos de HTML

const boton = document.getElementById("generar-paleta");
const selectorCantidad = document.getElementById("cantidad-colores");
const contenedorPaleta = document.getElementById("paleta");
const botonHSL = document.getElementById("formato-hsl");
const botonHEX = document.getElementById("formato-hex");
const botonGuardar = document.getElementById("guardar-paleta");

let colores = [];
let formato = "HSL";


// Recuperar el historial de paletas guardadas

let historialPaletas = JSON.parse(localStorage.getItem("historialColori")) || [];

    
// Crear tarjetas de colores

function crearTarjeta(color) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("color-card");

    const vistaColor = document.createElement("div");
    vistaColor.classList.add("color-preview");

    
// Crear botón para bloquear el color
   
    const botonBloqueo = document.createElement("button");
    botonBloqueo.classList.add("boton-bloqueo");
    botonBloqueo.setAttribute("aria-label", "Bloquear o desbloquear color");

    function actualizarCandado() {
    if (color.bloqueado) {
        botonBloqueo.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="10" width="14" height="11" rx="2"/>
                <path d="M8 10V7a4 4 0 0 1 8 0v3"/>
            </svg>
        `;
    } else {
        botonBloqueo.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="10" width="14" height="11" rx="2"/>
                <path d="M8 10V7a4 4 0 0 1 8 0"/>
            </svg>
        `;
    }
}

actualizarCandado();

botonBloqueo.addEventListener("click", function() {
    color.bloqueado = !color.bloqueado;
    actualizarCandado();
});

vistaColor.appendChild(botonBloqueo);

    const colorHSL = "hsl(" + color.h + ", " + color.s + "%, " + color.l + "%)";
    vistaColor.style.backgroundColor = colorHSL;

    const codigo = document.createElement("p");
    codigo.classList.add("color-code");

    let botonCopiar = null;

    if (formato === "HSL") {
        codigo.textContent = colorHSL;
    } else {
        const colorHEX = hslAHex(color.h, color.s, color.l);
        codigo.textContent = colorHEX;

        botonCopiar = document.createElement("button");
        botonCopiar.textContent = "Copiar código";
        botonCopiar.classList.add("boton-copiar");

        botonCopiar.addEventListener("click", function() {
            navigator.clipboard.writeText(colorHEX).then(function() {
                botonCopiar.textContent = "¡Copiado!";

                setTimeout(function() {
                    botonCopiar.textContent = "Copiar código";
                }, 1500);
            });
        });
    }

    tarjeta.appendChild(vistaColor);
    tarjeta.appendChild(codigo);

    if (botonCopiar !== null) {
        tarjeta.appendChild(botonCopiar);
    }

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
        l: luminosidad,
        bloqueado: false
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
        
        if (colores[i] && colores[i].bloqueado) {
            paleta.push(colores[i]);
            } else {
            paleta.push(generarColor());
        }

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


// Mostrar el historial de paletas guardadas

function mostrarHistorial() {
    const contenedorHistorial = document.getElementById("historial-paletas");

    contenedorHistorial.innerHTML = "";

    historialPaletas.forEach(function(paleta, indice) {

        const tarjetaHistorial = document.createElement("div");
        tarjetaHistorial.classList.add("tarjeta-historial");

        const miniPaleta = document.createElement("div");
        miniPaleta.classList.add("mini-paleta");

        paleta.forEach(function(color) {
            const muestra = document.createElement("div");

            muestra.style.backgroundColor =
                "hsl(" + color.h + ", " + color.s + "%, " + color.l + "%)";

            miniPaleta.appendChild(muestra);
        });

        const botonCargar = document.createElement("button");
        botonCargar.textContent = "Volver a usar";

        botonCargar.addEventListener("click", function() {
            colores = paleta.map(function(color) {
                return {
                    h: color.h,
                    s: color.s,
                    l: color.l,
                    bloqueado: color.bloqueado
                };
            });

            selectorCantidad.value = colores.length;
            mostrarPaleta();
        });

        tarjetaHistorial.appendChild(miniPaleta);
        tarjetaHistorial.appendChild(botonCargar);

        contenedorHistorial.appendChild(tarjetaHistorial);
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


// Mostrar las paletas guardadas al abrir la página

mostrarHistorial();



// Guardar una paleta en el historial

botonGuardar.addEventListener("click", function() {

    if (colores.length === 0) {
        alert("Primero genera una paleta.");
        return;
    }

    const nuevaPaleta = colores.map(function(color) {
        return {
            h: color.h,
            s: color.s,
            l: color.l,
            bloqueado: color.bloqueado
        };
    });

    historialPaletas.push(nuevaPaleta);

    localStorage.setItem("historialColori", JSON.stringify(historialPaletas));
    mostrarHistorial();


});