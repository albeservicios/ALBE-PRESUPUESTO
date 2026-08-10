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
// ==========================================
// ALBE PRESUPUESTOS V4.0
// PARTE 2 — AGREGAR ITEMS
// ==========================================


// ==========================================
// OBTENER PRECIO
// ==========================================

function obtenerPrecio(item) {

    return convertirNumero(
        item.precio ??
        item.precioALBE ??
        item.precioUnitario ??
        item.valor ??
        0
    );

}


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
            "Seleccione un material."
        );

        return;

    }

    const material =
        materialesBase[
            Number(indice)
        ];

    if (!material) return;

    materialesPresupuesto.push({

        nombre:
            material.nombre ||
            material.descripcion ||
            "Material",

        unidad:
            material.unidad || "",

        cantidad: 1,

        precio:
            obtenerPrecio(material)

    });


    mostrarMateriales();

    select.value = "";

}


// ==========================================
// MOSTRAR MATERIALES
// ==========================================

function mostrarMateriales() {

    const body =
        document.getElementById(
            "materialesBody"
        );

    if (!body) return;

    body.innerHTML = "";


    materialesPresupuesto.forEach(
        (material, indice) => {

            const subtotal =
                material.cantidad *
                material.precio;


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
                            subtotal
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
// EVENTOS MATERIALES
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
        .forEach(input => {

            input.addEventListener(
                "input",
                function () {

                    const indice =
                        Number(
                            this.dataset
                                .materialCantidad
                        );

                    const material =
                        materialesPresupuesto[
                            indice
                        ];

                    if (!material) return;

                    material.cantidad =
                        convertirNumero(
                            this.value
                        );


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
            );

        });


    body
        .querySelectorAll(
            "[data-eliminar-material]"
        )
        .forEach(boton => {

            boton.addEventListener(
                "click",
                function () {

                    const indice =
                        Number(
                            this.dataset
                                .eliminarMaterial
                        );

                    materialesPresupuesto.splice(
                        indice,
                        1
                    );

                    mostrarMateriales();

                }
            );

        });

}


// ==========================================
// AGREGAR MANO DE OBRA
// ==========================================

function agregarManoObra() {

    const select =
        document.getElementById(
            "manoObraBase"
        );

    if (!select) return;

    const indice =
        select.value;

    if (indice === "") {

        alert(
            "Seleccione una mano de obra."
        );

        return;

    }

    const trabajo =
        manoObraBase[
            Number(indice)
        ];

    if (!trabajo) return;


    manoObraPresupuesto.push({

        nombre:
            trabajo.nombre ||
            trabajo.descripcion ||
            "Mano de obra",

        unidad:
            trabajo.unidad || "",

        cantidad: 1,

        precio:
            obtenerPrecio(trabajo)

    });


    mostrarManoObra();

    select.value = "";

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

            const subtotal =
                trabajo.cantidad *
                trabajo.precio;


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
// ==========================================
// ALBE PRESUPUESTOS V4.0
// PARTE 3 — TOTALES
// ==========================================


// ==========================================
// TOTAL MATERIALES
// ==========================================

function actualizarTotalMateriales() {

    let total = 0;

    materialesPresupuesto.forEach(material => {

        total +=
            convertirNumero(material.cantidad) *
            convertirNumero(material.precio);

    });

    const elemento =
        document.getElementById(
            "totalMateriales"
        );

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

        total +=
            convertirNumero(trabajo.cantidad) *
            convertirNumero(trabajo.precio);

    });

    const elemento =
        document.getElementById(
            "totalMano"
        );

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

        total +=
            convertirNumero(servicio.cantidad) *
            convertirNumero(servicio.precio);

    });

    const elemento =
        document.getElementById(
            "totalServicios"
        );

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

    const totalMateriales =
        actualizarTotalMateriales();

    const totalMano =
        actualizarTotalMano();

    const totalServicios =
        actualizarTotalServicios();


    const totalGeneral =
        totalMateriales +
        totalMano +
        totalServicios;


    const elemento =
        document.getElementById(
            "totalGeneral"
        );

    if (elemento) {

        elemento.textContent =
            formatearDinero(
                totalGeneral
            );

    }


    console.log(
        "TOTAL GENERAL:",
        totalGeneral
    );

}


// ==========================================
// ACTUALIZAR TODOS
// ==========================================

function actualizarTodosLosTotales() {

    actualizarTotalGeneral();

                        }
                        // ==========================================
// ALBE PRESUPUESTOS V4.0
// PARTE 4 — VIÁTICOS + HOSPEDAJE + TOTAL FINAL
// ==========================================


// ==========================================
// ACTUALIZAR GASTOS ADICIONALES
// ==========================================

function actualizarGastosAdicionales() {

    const viaticos =
        convertirNumero(
            document.getElementById(
                "viaticos"
            )?.value
        );

    const hospedaje =
        convertirNumero(
            document.getElementById(
                "hospedajeTotal"
            )?.value
        );

    const otros =
        convertirNumero(
            document.getElementById(
                "otrosGastos"
            )?.value
        );


    // -------------------------------
    // RESUMEN VIÁTICOS
    // -------------------------------

    const resumenViaticos =
        document.getElementById(
            "resumenViaticos"
        );

    if (resumenViaticos) {

        resumenViaticos.value =
            "$ " +
            formatearDinero(
                viaticos
            );

    }


    // -------------------------------
    // RESUMEN HOSPEDAJE
    // -------------------------------

    const resumenHospedaje =
        document.getElementById(
            "resumenHospedaje"
        );

    if (resumenHospedaje) {

        resumenHospedaje.value =
            "$ " +
            formatearDinero(
                hospedaje
            );

    }


    // -------------------------------
    // RESUMEN OTROS
    // -------------------------------

    const resumenOtros =
        document.getElementById(
            "resumenOtros"
        );

    if (resumenOtros) {

        resumenOtros.value =
            "$ " +
            formatearDinero(
                otros
            );

    }


    return (
        viaticos +
        hospedaje +
        otros
    );

}


// ==========================================
// TOTAL FINAL
// ==========================================

function actualizarTotalFinal() {

    const totalMateriales =
        materialesPresupuesto.reduce(
            (total, material) => {

                return total +
                    convertirNumero(
                        material.cantidad
                    ) *
                    convertirNumero(
                        material.precio
                    );

            },
            0
        );


    const totalMano =
        manoObraPresupuesto.reduce(
            (total, trabajo) => {

                return total +
                    convertirNumero(
                        trabajo.cantidad
                    ) *
                    convertirNumero(
                        trabajo.precio
                    );

            },
            0
        );


    const totalServicios =
        serviciosPresupuesto.reduce(
            (total, servicio) => {

                return total +
                    convertirNumero(
                        servicio.cantidad
                    ) *
                    convertirNumero(
                        servicio.precio
                    );

            },
            0
        );


    const gastos =
        actualizarGastosAdicionales();


    const totalFinal =
        totalMateriales +
        totalMano +
        totalServicios +
        gastos;


    // -------------------------------
    // TOTAL GENERAL INPUT
    // -------------------------------

    const totalGeneral =
        document.getElementById(
            "totalGeneral"
        );

    if (totalGeneral) {

        totalGeneral.value =
            "$ " +
            formatearDinero(
                totalFinal
            );

    }


    // -------------------------------
    // TOTAL GENERAL TEXTO
    // -------------------------------

    const totalGeneralTexto =
        document.getElementById(
            "totalGeneralTexto"
        );

    if (totalGeneralTexto) {

        totalGeneralTexto.textContent =
            formatearDinero(
                totalFinal
            );

    }


    // -------------------------------
    // RESUMEN MATERIALES
    // -------------------------------

    const resumenMateriales =
        document.getElementById(
            "resumenMateriales"
        );

    if (resumenMateriales) {

        resumenMateriales.value =
            "$ " +
            formatearDinero(
                totalMateriales
            );

    }


    // -------------------------------
    // RESUMEN MANO DE OBRA
    // -------------------------------

    const resumenMano =
        document.getElementById(
            "resumenMano"
        );

    if (resumenMano) {

        resumenMano.value =
            "$ " +
            formatearDinero(
                totalMano
            );

    }


    console.log(
        "TOTAL FINAL:",
        totalFinal
    );


    return totalFinal;

}


// ==========================================
// EVENTOS VIÁTICOS / HOSPEDAJE / OTROS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const campos =
            [
                "viaticos",
                "hospedajeTotal",
                "otrosGastos"
            ];


        campos.forEach(
            id => {

                const campo =
                    document.getElementById(
                        id
                    );

                if (campo) {

                    campo.addEventListener(
                        "input",
                        actualizarTotalFinal
                    );

                }

            }
        );


        // Calcular al cargar

        actualizarTotalFinal();

    }
);
