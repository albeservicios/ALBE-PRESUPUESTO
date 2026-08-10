// ==========================================
// ALBE PRESUPUESTOS V4.0
// PRESUPUESTO.JS
// PARTE 1 — BASES DE DATOS
// ==========================================


// ==========================================
// VARIABLES
// ==========================================

let materialesBase = [];
let manoObraBase = [];
let serviciosBase = [];

let materialesPresupuesto = [];
let manoObraPresupuesto = [];
let serviciosPresupuesto = [];


// ==========================================
// LEER LOCALSTORAGE
// ==========================================

function leerLocalStorage(clave) {

    try {

        const datos =
            localStorage.getItem(clave);

        if (!datos) {
            return [];
        }

        const resultado =
            JSON.parse(datos);

        return Array.isArray(resultado)
            ? resultado
            : [];

    } catch (error) {

        console.error(
            "Error leyendo:",
            clave,
            error
        );

        return [];

    }

}


// ==========================================
// CONVERTIR NUMERO
// ==========================================

function convertirNumero(valor) {

    if (
        valor === null ||
        valor === undefined ||
        valor === ""
    ) {
        return 0;
    }

    if (typeof valor === "number") {
        return isNaN(valor) ? 0 : valor;
    }

    let texto =
        String(valor)
            .trim()
            .replace(/\$/g, "")
            .replace(/\s/g, "");

    // Formato argentino:
    // 20.800,50 → 20800.50

    if (
        texto.includes(".") &&
        texto.includes(",")
    ) {

        texto =
            texto
                .replace(/\./g, "")
                .replace(",", ".");

    } else if (
        texto.includes(",")
    ) {

        texto =
            texto.replace(",", ".");

    }

    const numero =
        Number(texto);

    return isNaN(numero)
        ? 0
        : numero;

}


// ==========================================
// FORMATEAR DINERO
// ==========================================

function formatearDinero(valor) {

    const numero =
        convertirNumero(valor);

    return numero.toLocaleString(
        "es-AR",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

}


// ==========================================
// CARGAR BASES
// ==========================================

function cargarBases() {

    materialesBase =
        leerLocalStorage(
            "albe_materiales"
        );

    manoObraBase =
        leerLocalStorage(
            "albe_mano_obra"
        );

    serviciosBase =
        leerLocalStorage(
            "albe_servicios"
        );


    console.log(
        "ALBE — Materiales:",
        materialesBase
    );

    console.log(
        "ALBE — Mano de obra:",
        manoObraBase
    );

    console.log(
        "ALBE — Servicios:",
        serviciosBase
    );


    cargarSelectMateriales();

    cargarSelectManoObra();

    cargarSelectServicios();

}


// ==========================================
// SELECT MATERIALES
// ==========================================

function cargarSelectMateriales() {

    const select =
        document.getElementById(
            "materialBase"
        );

    if (!select) return;

    select.innerHTML =
        `
        <option value="">
            Seleccione material...
        </option>
        `;


    materialesBase.forEach(
        (material, indice) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                indice;

            option.textContent =
                material.nombre ||
                material.descripcion ||
                "Material";

            select.appendChild(
                option
            );

        }
    );

}


// ==========================================
// SELECT MANO DE OBRA
// ==========================================

function cargarSelectManoObra() {

    const select =
        document.getElementById(
            "manoObraBase"
        );

    if (!select) return;

    select.innerHTML =
        `
        <option value="">
            Seleccione un trabajo...
        </option>
        `;


    manoObraBase.forEach(
        (trabajo, indice) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                indice;

            option.textContent =
                trabajo.nombre ||
                trabajo.descripcion ||
                "Mano de obra";

            select.appendChild(
                option
            );

        }
    );

}


// ==========================================
// SELECT SERVICIOS
// ==========================================

function cargarSelectServicios() {

    const select =
        document.getElementById(
            "servicioBase"
        );

    if (!select) return;

    select.innerHTML =
        `
        <option value="">
            Seleccione un servicio...
        </option>
        `;


    serviciosBase.forEach(
        (servicio, indice) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                indice;

            option.textContent =
                servicio.nombre ||
                servicio.descripcion ||
                "Servicio";

            select.appendChild(
                option
            );

        }
    );

}


// ==========================================
// INICIO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarBases();

    }
);
