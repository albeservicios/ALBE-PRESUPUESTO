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

mostrarMateriales();

actualizarTotalMateriales();

select.value = "";

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
// ==========================================
// ALBE PRESUPUESTOS V4.0
// PARTE 2
// AGREGAR MATERIAL Y MANO DE OBRA
// ==========================================


// ==========================================
// AGREGAR MATERIAL
// ==========================================

function agregarMaterial() {

    const select =
        document.getElementById(
            "materialBase"
        );

    if (!select) return;

    const indice =
        select.value;

    if (indice === "") {

        alert(
            "Seleccione un material primero."
        );

        return;

    }

    const material =
        materialesBase[
            Number(indice)
        ];

    if (!material) {

        alert(
            "No se encontró el material."
        );

        return;

    }


    const nombre =
        material.nombre ||
        material.descripcion ||
        "Material";


    const unidad =
        material.unidad ||
        "";


    const precio =
        convertirNumero(
            material.precioALBE ??
            material.precio ??
            material.precioUnitario
        );


    materialesPresupuesto.push({

        nombre: nombre,

        unidad: unidad,

        precio: precio,

        cantidad: 1

    });


    mostrarMateriales();


    select.value = "";


    const info =
        document.getElementById(
            "infoMaterialBase"
        );

    if (info) {

        info.style.display =
            "none";

        info.innerHTML =
            "";

    }

}


// ==========================================
// MOSTRAR MATERIALES
// ==========================================

function mostrarMateriales() {
actualizarTodosLosTotales();
    const body =
        document.getElementById(
            "materialesBody"
        );

    if (!body) return;


    body.innerHTML = "";


    materialesPresupuesto.forEach(
        (material, indice) => {

            const fila =
                document.createElement(
                    "tr"
                );


            fila.innerHTML = `

                <td>
                    ${material.nombre}
                    ${
                        material.unidad
                        ? " (" +
                          material.unidad +
                          ")"
                        : ""
                    }
                </td>

                <td>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value="${material.cantidad}"
                        data-material-cantidad="${indice}"
                    >

                </td>

                <td>

                    $ ${formatearDinero(
                        material.precio
                    )}

                </td>

                <td>

                    $ <span
                        data-material-subtotal="${indice}"
                    >
                        ${formatearDinero(
                            material.cantidad *
                            material.precio
                        )}
                    </span>

                </td>

                <td>

                    <button
                        type="button"
                        class="btn-eliminar"
                        data-eliminar-material="${indice}"
                    >
                        🗑️
                    </button>

                </td>

            `;


            body.appendChild(
                fila
            );

        }
    );


    conectarEventosMateriales();

}


// ==========================================
// EVENTOS DE MATERIALES
// ==========================================

function conectarEventosMateriales() {

    const body =
        document.getElementById(
            "materialesBody"
        );

    if (!body) return;


    body
        .querySelectorAll(
            "[data-material-cantidad]"
        )
        .forEach(
            input => {

                input.addEventListener(
                    "input",
                    function () {

                        const indice =
                            Number(
                                this.dataset
                                    .materialCantidad
                            );


                        materialesPresupuesto[
                            indice
                        ].cantidad =
                            convertirNumero(
                                this.value
                            );


                        actualizarSubtotalMaterial(
                            indice
                        );


                        actualizarTotalMateriales();

                    }
                );

            }
        );


    body
        .querySelectorAll(
            "[data-eliminar-material]"
        )
        .forEach(
            boton => {

                boton.addEventListener(
                    "click",
                    function () {

                        const indice =
                            Number(
                                this.dataset
                                    .eliminarMaterial
                            );


                        materialesPresupuesto
                            .splice(
                                indice,
                                1
                            );


                        mostrarMateriales();

                    }
                );

            }
        );

}


// ==========================================
// SUBTOTAL MATERIAL
// ==========================================

function actualizarSubtotalMaterial(
    indice
) {

    const material =
        materialesPresupuesto[
            indice
        ];

    if (!material) return;


    const subtotal =
        material.cantidad *
        material.precio;


    const elemento =
        document.querySelector(
            `[data-material-subtotal="${indice}"]`
        );


    if (elemento) {

        elemento.textContent =
            formatearDinero(
                subtotal
            );

    }

}


// ==========================================
// TOTAL MATERIALES
// ==========================================

function actualizarTotalMateriales() {

    let total = 0;


    materialesPresupuesto.forEach(
        material => {

            total +=
                material.cantidad *
                material.precio;

        }
    );


    const totalElemento =
        document.getElementById(
            "totalMateriales"
        );


    if (totalElemento) {

        totalElemento.textContent =
            formatearDinero(
                total
            );

    }


    const resumen =
        document.getElementById(
            "resumenMateriales"
        );


    if (resumen) {

        resumen.value =
            "$ " +
            formatearDinero(
                total
            );

    }

}


// ==========================================
// AGREGAR MANO DE OBRA
// ==========================================

function agregarManoObra() {
actualizarTodosLosTotales();
    const select =
        document.getElementById(
            "manoObraBase"
        );


    if (!select) {

        alert(
            "Todavía falta agregar el selector de Mano de Obra en presupuesto.html."
        );

        return;

    }


    const indice =
        select.value;


    if (indice === "") {

        alert(
            "Seleccione una mano de obra primero."
        );

        return;

    }


    const trabajo =
        manoObraBase[
            Number(indice)
        ];


    if (!trabajo) {

        alert(
            "No se encontró el trabajo."
        );

        return;

    }


    const nombre =
        trabajo.nombre ||
        trabajo.descripcion ||
        "Mano de obra";


    const unidad =
        trabajo.unidad ||
        "";


    const precio =
        convertirNumero(
            trabajo.precio ??
            trabajo.precioALBE ??
            trabajo.precioUnitario
        );


    manoObraPresupuesto.push({

        nombre: nombre,

        unidad: unidad,

        precio: precio,

        cantidad: 1

    });


    mostrarManoObra();


    select.value = "";


    const info =
        document.getElementById(
            "infoManoObraBase"
        );


    if (info) {

        info.style.display =
            "none";

        info.innerHTML =
            "";

    }

}


// ==========================================
// MOSTRAR MANO DE OBRA
// ==========================================

function mostrarManoObra() {

    const body =
        document.getElementById(
            "manoBody"
        );


    if (!body) return;


    body.innerHTML = "";


    manoObraPresupuesto.forEach(
        (trabajo, indice) => {

            const fila =
                document.createElement(
                    "tr"
                );


            fila.innerHTML = `

                <td>

                    ${trabajo.nombre}

                    ${
                        trabajo.unidad
                        ? " (" +
                          trabajo.unidad +
                          ")"
                        : ""
                    }

                </td>

                <td>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value="${trabajo.cantidad}"
                        data-mano-cantidad="${indice}"
                    >

                </td>

                <td>

                    $ ${formatearDinero(
                        trabajo.precio
                    )}

                </td>

                <td>

                    $ <span
                        data-mano-subtotal="${indice}"
                    >
                        ${formatearDinero(
                            trabajo.cantidad *
                            trabajo.precio
                        )}
                    </span>

                </td>

                <td>

                    <button
                        type="button"
                        class="btn-eliminar"
                        data-eliminar-mano="${indice}"
                    >
                        🗑️
                    </button>

                </td>

            `;


            body.appendChild(
                fila
            );

        }
    );


    conectarEventosManoObra();

}


// ==========================================
// EVENTOS MANO DE OBRA
// ==========================================

function conectarEventosManoObra() {

    const body =
        document.getElementById(
            "manoBody"
        );


    if (!body) return;


    body
        .querySelectorAll(
            "[data-mano-cantidad]"
        )
        .forEach(
            input => {

                input.addEventListener(
                    "input",
                    function () {

                        const indice =
                            Number(
                                this.dataset
                                    .manoCantidad
                            );


                        manoObraPresupuesto[
                            indice
                        ].cantidad =
                            convertirNumero(
                                this.value
                            );


                        actualizarSubtotalMano(
                            indice
                        );


                        actualizarTotalMano();

                    }
                );

            }
        );


    body
        .querySelectorAll(
            "[data-eliminar-mano]"
        )
        .forEach(
            boton => {

                boton.addEventListener(
                    "click",
                    function () {

                        const indice =
                            Number(
                                this.dataset
                                    .eliminarMano
                            );


                        manoObraPresupuesto
                            .splice(
                                indice,
                                1
                            );


                        mostrarManoObra();

                    }
                );

            }
        );

}


// ==========================================
// SUBTOTAL MANO DE OBRA
// ==========================================

function actualizarSubtotalMano(
    indice
) {

    const trabajo =
        manoObraPresupuesto[
            indice
        ];


    if (!trabajo) return;


    const subtotal =
        trabajo.cantidad *
        trabajo.precio;


    const elemento =
        document.querySelector(
            `[data-mano-subtotal="${indice}"]`
        );


    if (elemento) {

        elemento.textContent =
            formatearDinero(
                subtotal
            );

    }

}


// ==========================================
// TOTAL MANO DE OBRA
// ==========================================

function actualizarTotalMano() {

    let total = 0;

    manoObraPresupuesto.forEach(
        trabajo => {

            const cantidad =
                convertirNumero(
                    trabajo.cantidad
                );

            const precio =
                convertirNumero(
                    trabajo.precio
                );

            total +=
                cantidad * precio;

        }
    );


    const totalElemento =
        document.getElementById(
            "totalMano"
        );


    if (totalElemento) {

        totalElemento.textContent =
            formatearDinero(
                total
            );

    }


    const resumen =
        document.getElementById(
            "resumenMano"
        );


    if (resumen) {

        resumen.value =
            "$ " +
            formatearDinero(
                total
            );

    }

}

// ==========================================
// CONECTAR BOTONES
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const btnMaterial =
            document.getElementById(
                "btnAgregarMaterial"
            );


        if (btnMaterial) {

            btnMaterial.addEventListener(
                "click",
                agregarMaterial
            );

        }


        const btnMano =
            document.getElementById(
                "btnAgregarMano"
            );


        if (btnMano) {

            btnMano.addEventListener(
                "click",
                agregarManoObra
            );

        }

    }
);
// ==========================================
// ALBE PRESUPUESTOS V4.0
// PARTE 3
// CALCULOS AUTOMATICOS
// ==========================================


// ==========================================
// TOTAL MATERIALES
// ==========================================

function actualizarTotalMateriales() {

    let total = 0;
    
    materialesPresupuesto.forEach(material => {

        const cantidad =
            convertirNumero(material.cantidad);

        const precio =
            convertirNumero(material.precio);

        total += cantidad * precio;

    });

    const elemento =
        document.getElementById("totalMateriales");

    if (elemento) {

        elemento.textContent =
            formatearDinero(total);

    }

    return total;
}


// ==========================================
// TOTAL MANO DE OBRA
// ==========================================

function actualizarTotalMano() {

    let total = 0;

    manoObraPresupuesto.forEach(trabajo => {

        const cantidad =
            convertirNumero(trabajo.cantidad);

        const precio =
            convertirNumero(trabajo.precio);

        total += cantidad * precio;

    });

    const elemento =
        document.getElementById("totalMano");

    if (elemento) {

        elemento.textContent =
            formatearDinero(total);

    }

    return total;
}


// ==========================================
// TOTAL SERVICIOS
// ==========================================

function actualizarTotalServicios() {

    let total = 0;

    serviciosPresupuesto.forEach(servicio => {

        const cantidad =
            convertirNumero(servicio.cantidad);

        const precio =
            convertirNumero(servicio.precio);

        total += cantidad * precio;

    });

    const elemento =
        document.getElementById("totalServicios");

    if (elemento) {

        elemento.textContent =
            formatearDinero(total);

    }

    return total;
}


// ==========================================
// TOTAL GENERAL
// ==========================================

function actualizarTotalGeneral() {

    const materiales =
        actualizarTotalMateriales();

    const mano =
        actualizarTotalMano();

    const servicios =
        actualizarTotalServicios();

    const totalGeneral =
        materiales +
        mano +
        servicios;


    const elemento =
        document.getElementById("totalGeneral");

    if (elemento) {

        elemento.textContent =
            formatearDinero(totalGeneral);

    }


    console.log(
        "Total general:",
        totalGeneral
    );

}


// ==========================================
// ACTUALIZAR TODO
// ==========================================

function actualizarTodosLosTotales() {

    actualizarTotalMateriales();

    actualizarTotalMano();

    actualizarTotalServicios();

    actualizarTotalGeneral();

}
