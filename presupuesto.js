// ==========================================
// ALBE PRESUPUESTOS V4.0
// PRESUPUESTO.JS
// PARTE 1/3
// ==========================================

"use strict";


// ==========================================
// VARIABLES PRINCIPALES
// ==========================================

let materialesBase = [];
let manoObraBase = [];
let serviciosBase = [];

let materialesPresupuesto = [];
let manoObraPresupuesto = [];
let serviciosPresupuesto = [];


// ==========================================
// FORMATO DE DINERO
// ==========================================

function formatearDinero(valor) {

    const numero =
        Number(valor) || 0;

    return numero.toLocaleString(
        "es-AR",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );
}


// ==========================================
// CONVERTIR PRECIO
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
        return valor;
    }

    let texto =
        String(valor)
            .trim()
            .replace(/\$/g, "")
            .replace(/\s/g, "");

    /*
       Acepta:

       1500
       1500.50
       1.500,50
       $ 1.500,50
    */

    if (
        texto.includes(",") &&
        texto.includes(".")
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
        parseFloat(texto);

    return Number.isFinite(numero)
        ? numero
        : 0;
}


// ==========================================
// LOCALSTORAGE SEGURO
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
// CARGAR BASES ALBE
// ==========================================

function cargarBasesALBE() {

    /*
       BASE DE MATERIALES
    */

    materialesBase =
        leerLocalStorage(
            "albe_materiales"
        );


    /*
       BASE DE MANO DE OBRA
    */

    manoObraBase =
        leerLocalStorage(
            "albe_mano_obra"
        );


    /*
       BASE DE SERVICIOS
    */

    serviciosBase =
        leerLocalStorage(
            "albe_servicios"
        );


    console.log(
        "BASE ALBE CARGADA"
    );

    console.log(
        "Materiales:",
        materialesBase
    );

    console.log(
        "Mano de obra:",
        manoObraBase
    );

    console.log(
        "Servicios:",
        serviciosBase
    );


    cargarSelectMateriales();

    cargarSelectManoObra();

    cargarSelectServicios();

}


// ==========================================
// MATERIAL → SELECT
// ==========================================

function cargarSelectMateriales() {

    const select =
        document.getElementById(
            "materialBase"
        );

    if (!select) {

        console.warn(
            "No existe #materialBase"
        );

        return;

    }


    select.innerHTML =
        `
        <option value="">
            Seleccione un material...
        </option>
        `;


    materialesBase.forEach(
        (material, indice) => {

            const nombre =
                material.nombre ||
                material.descripcion ||
                material.material ||
                "Material sin nombre";

            const unidad =
                material.unidad ||
                "";

            const precio =
                convertirNumero(
                    material.precioALBE ??
                    material.precio ??
                    material.precioUnitario
                );


            const option =
                document.createElement(
                    "option"
                );


            option.value =
                indice;


            option.textContent =
                `${nombre}` +
                `${unidad ? " - " + unidad : ""}` +
                ` - $ ${formatearDinero(precio)}`;


            select.appendChild(
                option
            );

        }
    );

}


// ==========================================
// MANO DE OBRA → SELECT
// ==========================================

function cargarSelectManoObra() {

    const select =
        document.getElementById(
            "manoObraBase"
        );

    if (!select) {

        console.warn(
            "No existe #manoObraBase"
        );

        return;

    }


    select.innerHTML =
        `
        <option value="">
            Seleccione un trabajo...
        </option>
        `;


    manoObraBase.forEach(
        (trabajo, indice) => {

            const nombre =
                trabajo.nombre ||
                trabajo.descripcion ||
                "Trabajo sin nombre";

            const unidad =
                trabajo.unidad ||
                "";

            const precio =
                convertirNumero(
                    trabajo.precio ??
                    trabajo.precioALBE ??
                    trabajo.precioUnitario
                );


            const option =
                document.createElement(
                    "option"
                );


            option.value =
                indice;


            option.textContent =
                `${nombre}` +
                `${unidad ? " - " + unidad : ""}` +
                ` - $ ${formatearDinero(precio)}`;


            select.appendChild(
                option
            );

        }
    );

}


// ==========================================
// SERVICIOS → SELECT
// ==========================================

function cargarSelectServicios() {

    const select =
        document.getElementById(
            "servicioBase"
        );

    if (!select) {

        console.warn(
            "No existe #servicioBase"
        );

        return;

    }


    select.innerHTML =
        `
        <option value="">
            Seleccione un servicio...
        </option>
        `;


    serviciosBase.forEach(
        (servicio, indice) => {

            const nombre =
                servicio.nombre ||
                servicio.descripcion ||
                "Servicio sin nombre";

            const unidad =
                servicio.unidad ||
                "";

            const precio =
                convertirNumero(
                    servicio.precio ??
                    servicio.precioALBE ??
                    servicio.precioUnitario
                );


            const tipo =
                servicio.tipo ||
                "";


            const option =
                document.createElement(
                    "option"
                );


            option.value =
                indice;


            option.textContent =
                `${nombre}` +
                `${unidad ? " - " + unidad : ""}` +
                ` - $ ${formatearDinero(precio)}` +
                `${tipo ? " (" + tipo + ")" : ""}`;


            select.appendChild(
                option
            );

        }
    );

}


// ==========================================
// MOSTRAR INFORMACIÓN DEL MATERIAL
// ==========================================

function mostrarInfoMaterial() {

    const select =
        document.getElementById(
            "materialBase"
        );

    const info =
        document.getElementById(
            "infoMaterialBase"
        );


    if (!select || !info) {
        return;
    }


    const indice =
        select.value;


    if (indice === "") {

        info.style.display =
            "none";

        info.innerHTML =
            "";

        return;

    }


    const material =
        materialesBase[
            Number(indice)
        ];


    if (!material) {
        return;
    }


    const nombre =
        material.nombre ||
        material.descripcion ||
        "";

    const unidad =
        material.unidad ||
        "";

    const precio =
        convertirNumero(
            material.precioALBE ??
            material.precio ??
            material.precioUnitario
        );


    info.style.display =
        "block";


    info.innerHTML =
        `
        <strong>${nombre}</strong><br>
        Unidad: ${unidad || "Sin unidad"}<br>
        Precio ALBE:
        $ ${formatearDinero(precio)}
        `;

}


// ==========================================
// MOSTRAR INFORMACIÓN MANO DE OBRA
// ==========================================

function mostrarInfoManoObra() {

    const select =
        document.getElementById(
            "manoObraBase"
        );

    const info =
        document.getElementById(
            "infoManoObraBase"
        );


    if (!select || !info) {
        return;
    }


    const indice =
        select.value;


    if (indice === "") {

        info.style.display =
            "none";

        info.innerHTML =
            "";

        return;

    }


    const trabajo =
        manoObraBase[
            Number(indice)
        ];


    if (!trabajo) {
        return;
    }


    const nombre =
        trabajo.nombre ||
        trabajo.descripcion ||
        "";

    const unidad =
        trabajo.unidad ||
        "";

    const precio =
        convertirNumero(
            trabajo.precio ??
            trabajo.precioALBE ??
            trabajo.precioUnitario
        );


    info.style.display =
        "block";


    info.innerHTML =
        `
        <strong>${nombre}</strong><br>
        Unidad: ${unidad || "Sin unidad"}<br>
        Precio:
        $ ${formatearDinero(precio)}
        `;

}


// ==========================================
// MOSTRAR INFORMACIÓN SERVICIO
// ==========================================

function mostrarInfoServicio() {

    const select =
        document.getElementById(
            "servicioBase"
        );

    const info =
        document.getElementById(
            "infoServicioBase"
        );


    if (!select || !info) {
        return;
    }


    const indice =
        select.value;


    if (indice === "") {

        info.style.display =
            "none";

        info.innerHTML =
            "";

        return;

    }


    const servicio =
        serviciosBase[
            Number(indice)
        ];


    if (!servicio) {
        return;
    }


    const nombre =
        servicio.nombre ||
        servicio.descripcion ||
        "";

    const unidad =
        servicio.unidad ||
        "";

    const precio =
        convertirNumero(
            servicio.precio ??
            servicio.precioALBE ??
            servicio.precioUnitario
        );

    const tipo =
        servicio.tipo ||
        "";


    info.style.display =
        "block";


    info.innerHTML =
        `
        <strong>${nombre}</strong><br>
        Unidad: ${unidad || "Sin unidad"}<br>
        Precio:
        $ ${formatearDinero(precio)}
        ${tipo
            ? `<br>Tipo: ${tipo}`
            : ""
        }
        `;

}


// ==========================================
// INICIO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarBasesALBE();


        const material =
            document.getElementById(
                "materialBase"
            );

        const mano =
            document.getElementById(
                "manoObraBase"
            );

        const servicio =
            document.getElementById(
                "servicioBase"
            );


        if (material) {

            material.addEventListener(
                "change",
                mostrarInfoMaterial
            );

        }


        if (mano) {

            mano.addEventListener(
                "change",
                mostrarInfoManoObra
            );

        }


        if (servicio) {

            servicio.addEventListener(
                "change",
                mostrarInfoServicio
            );

        }

    }
);
