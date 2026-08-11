// ==========================================
// ALBE PRESUPUESTOS
// PRESUPUESTO.JS
// VERSION LIMPIA
// ==========================================

let materialesBase = [];
let manoObraBase = [];
let serviciosBase = [];

let materialesPresupuesto = [];
let manoObraPresupuesto = [];
let serviciosPresupuesto = [];


// ==========================================
// LOCAL STORAGE
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
            "Error leyendo " + clave,
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

        return isNaN(valor)
            ? 0
            : valor;

    }

    let texto =
        String(valor)
            .trim()
            .replace(/\$/g, "")
            .replace(/\s/g, "");

    // 20.800,50
    if (
        texto.includes(".") &&
        texto.includes(",")
    ) {

        texto =
            texto
                .replace(/\./g, "")
                .replace(",", ".");

    }

    // 20800,50
    else if (
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

    return convertirNumero(valor)
        .toLocaleString(
            "es-AR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


// ==========================================
// OBTENER PRECIO
// ==========================================

function obtenerPrecio(item) {

    if (!item) {
        return 0;
    }

    return convertirNumero(
        item.precio ??
        item.precioALBE ??
        item.precioUnitario ??
        item.valor ??
        0
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
        "ALBE - Materiales:",
        materialesBase
    );

    console.log(
        "ALBE - Mano de obra:",
        manoObraBase
    );

    console.log(
        "ALBE - Servicios:",
        serviciosBase
    );


    cargarSelectMateriales();

    cargarSelectManoObra();

    cargarSelectServicios();

}


// ==========================================
// MATERIAL BASE
// ==========================================

function cargarSelectMateriales() {

    const select =
        document.getElementById(
            "materialBase"
        );

    if (!select) {
        return;
    }

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
// MANO DE OBRA BASE
// ==========================================

function cargarSelectManoObra() {

    const select =
        document.getElementById(
            "manoObraBase"
        );

    if (!select) {
        return;
    }

    select.innerHTML =
        `
        <option value="">
            Seleccione mano de obra...
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
// SERVICIOS BASE
// ==========================================

function cargarSelectServicios() {

    const select =
        document.getElementById(
            "servicioBase"
        );

    if (!select) {
        return;
    }

    select.innerHTML =
        `
        <option value="">
            Seleccione servicio...
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
);// ==========================================
// PARTE 2 — AGREGAR Y MOSTRAR ITEMS
// ==========================================


// ==========================================
// AGREGAR MATERIAL
// ==========================================

function agregarMaterial() {

    const select =
        document.getElementById("materialBase");

    if (!select) return;

    const indice = select.value;

    if (indice === "") {
        alert("Seleccione un material.");
        return;
    }

    const material =
        materialesBase[Number(indice)];

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
        document.getElementById("materialesBody");

    if (!body) return;

    body.innerHTML = "";

    materialesPresupuesto.forEach(
        (material, indice) => {

            const subtotal =
                convertirNumero(material.cantidad) *
                convertirNumero(material.precio);

            const fila =
                document.createElement("tr");

            fila.innerHTML = `

                <td>
                    ${material.nombre}
                    ${
                        material.unidad
                        ? " (" + material.unidad + ")"
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
                    $ ${formatearDinero(material.precio)}
                </td>

                <td>
                    $ <span
                        data-material-subtotal="${indice}"
                    >
                        ${formatearDinero(subtotal)}
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

            body.appendChild(fila);
        }
    );

    conectarEventosMateriales();
}


// ==========================================
// EVENTOS MATERIALES
// ==========================================

function conectarEventosMateriales() {

    const body =
        document.getElementById("materialesBody");

    if (!body) return;


    body.querySelectorAll(
        "[data-material-cantidad]"
    ).forEach(input => {

        input.addEventListener(
            "input",
            function () {

                const indice =
                    Number(
                        this.dataset.materialCantidad
                    );

                const material =
                    materialesPresupuesto[indice];

                if (!material) return;

                material.cantidad =
                    convertirNumero(this.value);

                const subtotal =
                    material.cantidad *
                    material.precio;

                const elemento =
                    body.querySelector(
                        `[data-material-subtotal="${indice}"]`
                    );

                if (elemento) {

                    elemento.textContent =
                        formatearDinero(subtotal);

                }

            }
        );

    });


    body.querySelectorAll(
        "[data-eliminar-material]"
    ).forEach(boton => {

        boton.addEventListener(
            "click",
            function () {

                const indice =
                    Number(
                        this.dataset.eliminarMaterial
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
        document.getElementById("manoObraBase");

    if (!select) return;

    const indice = select.value;

    if (indice === "") {
        alert("Seleccione una mano de obra.");
        return;
    }

    const trabajo =
        manoObraBase[Number(indice)];

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
        document.getElementById("manoBody");

    if (!body) return;

    body.innerHTML = "";

    manoObraPresupuesto.forEach(
        (trabajo, indice) => {

            const subtotal =
                convertirNumero(trabajo.cantidad) *
                convertirNumero(trabajo.precio);

            const fila =
                document.createElement("tr");

            fila.innerHTML = `

                <td>
                    ${trabajo.nombre}
                    ${
                        trabajo.unidad
                        ? " (" + trabajo.unidad + ")"
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
                    $ ${formatearDinero(trabajo.precio)}
                </td>

                <td>
                    $ <span
                        data-mano-subtotal="${indice}"
                    >
                        ${formatearDinero(subtotal)}
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

            body.appendChild(fila);
        }
    );

    conectarEventosManoObra();
}


// ==========================================
// EVENTOS MANO DE OBRA
// ==========================================

function conectarEventosManoObra() {

    const body =
        document.getElementById("manoBody");

    if (!body) return;


    body.querySelectorAll(
        "[data-mano-cantidad]"
    ).forEach(input => {

        input.addEventListener(
            "input",
            function () {

                const indice =
                    Number(
                        this.dataset.manoCantidad
                    );

                const trabajo =
                    manoObraPresupuesto[indice];

                if (!trabajo) return;

                trabajo.cantidad =
                    convertirNumero(this.value);

                const subtotal =
                    trabajo.cantidad *
                    trabajo.precio;

                const elemento =
                    body.querySelector(
                        `[data-mano-subtotal="${indice}"]`
                    );

                if (elemento) {

                    elemento.textContent =
                        formatearDinero(subtotal);

                }

            }
        );

    });


    body.querySelectorAll(
        "[data-eliminar-mano]"
    ).forEach(boton => {

        boton.addEventListener(
            "click",
            function () {

                const indice =
                    Number(
                        this.dataset.eliminarMano
                    );

                manoObraPresupuesto.splice(
                    indice,
                    1
                );

                mostrarManoObra();

            }
        );

    });

}


// ==========================================
// AGREGAR SERVICIO
// ==========================================

function agregarServicio() {

    const select =
        document.getElementById("servicioBase");

    if (!select) return;

    const indice = select.value;

    if (indice === "") {
        alert("Seleccione un servicio.");
        return;
    }

    const servicio =
        serviciosBase[Number(indice)];

    if (!servicio) return;

    serviciosPresupuesto.push({

        nombre:
            servicio.nombre ||
            servicio.descripcion ||
            "Servicio",

        unidad:
            servicio.unidad || "",

        cantidad: 1,

        precio:
            obtenerPrecio(servicio)

    });

    mostrarServicios();

    select.value = "";
}


// ==========================================
// MOSTRAR SERVICIOS
// ==========================================

function mostrarServicios() {

    const body =
        document.getElementById("serviciosBody");

    if (!body) return;

    body.innerHTML = "";

    serviciosPresupuesto.forEach(
        (servicio, indice) => {

            const subtotal =
                convertirNumero(servicio.cantidad) *
                convertirNumero(servicio.precio);

            const fila =
                document.createElement("tr");

            fila.innerHTML = `

                <td>
                    ${servicio.nombre}
                    ${
                        servicio.unidad
                        ? " (" + servicio.unidad + ")"
                        : ""
                    }
                </td>

                <td>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value="${servicio.cantidad}"
                        data-servicio-cantidad="${indice}"
                    >
                </td>

                <td>
                    $ ${formatearDinero(servicio.precio)}
                </td>

                <td>
                    $ <span
                        data-servicio-subtotal="${indice}"
                    >
                        ${formatearDinero(subtotal)}
                    </span>
                </td>

                <td>
                    <button
                        type="button"
                        class="btn-eliminar"
                        data-eliminar-servicio="${indice}"
                    >
                        🗑️
                    </button>
                </td>
            `;

            body.appendChild(fila);
        }
    );

    conectarEventosServicios();
}


// ==========================================
// EVENTOS SERVICIOS
// ==========================================

function conectarEventosServicios() {

    const body =
        document.getElementById("serviciosBody");

    if (!body) return;


    body.querySelectorAll(
        "[data-servicio-cantidad]"
    ).forEach(input => {

        input.addEventListener(
            "input",
            function () {

                const indice =
                    Number(
                        this.dataset.servicioCantidad
                    );

                const servicio =
                    serviciosPresupuesto[indice];

                if (!servicio) return;

                servicio.cantidad =
                    convertirNumero(this.value);

                const subtotal =
                    servicio.cantidad *
                    servicio.precio;

                const elemento =
                    body.querySelector(
                        `[data-servicio-subtotal="${indice}"]`
                    );

                if (elemento) {

                    elemento.textContent =
                        formatearDinero(subtotal);

                }

            }
        );

    });


    body.querySelectorAll(
        "[data-eliminar-servicio]"
    ).forEach(boton => {

        boton.addEventListener(
            "click",
            function () {

                const indice =
                    Number(
                        this.dataset.eliminarServicio
                    );

                serviciosPresupuesto.splice(
                    indice,
                    1
                );

                mostrarServicios();

            }
        );

    });

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


        const btnServicio =
            document.getElementById(
                "btnAgregarServicio"
            );

        if (btnServicio) {

            btnServicio.addEventListener(
                "click",
                agregarServicio
            );

        }

    }
);
    
// ==========================================
// PARTE 3 FINAL — TOTALES
// ==========================================


// ==========================================
// TOTAL MATERIALES
// ==========================================

function calcularTotalMateriales() {

    let total = 0;

    materialesPresupuesto.forEach(material => {

        total +=
            convertirNumero(material.cantidad) *
            convertirNumero(material.precio);

    });

    return total;
}


// ==========================================
// TOTAL MANO DE OBRA
// ==========================================

function calcularTotalMano() {

    let total = 0;

    manoObraPresupuesto.forEach(trabajo => {

        total +=
            convertirNumero(trabajo.cantidad) *
            convertirNumero(trabajo.precio);

    });

    return total;
}


// ==========================================
// TOTAL SERVICIOS
// ==========================================

function calcularTotalServicios() {

    let total = 0;

    serviciosPresupuesto.forEach(servicio => {

        total +=
            convertirNumero(servicio.cantidad) *
            convertirNumero(servicio.precio);

    });

    return total;
}


// ==========================================
// ACTUALIZAR TOTALES
// ==========================================

function actualizarTotales() {

    const totalMateriales =
        calcularTotalMateriales();

    const totalMano =
        calcularTotalMano();

    const totalServicios =
        calcularTotalServicios();


    // -------------------------------
    // VIÁTICOS
    // -------------------------------

    const viaticos =
        convertirNumero(
            document.getElementById(
                "viaticos"
            )?.value
        );


    // -------------------------------
    // HOSPEDAJE
    // -------------------------------

    const hospedaje =
        convertirNumero(
            document.getElementById(
                "hospedajeTotal"
            )?.value
        );


    // -------------------------------
    // OTROS GASTOS
    // -------------------------------

    const otros =
        convertirNumero(
            document.getElementById(
                "otrosGastos"
            )?.value
        );


    // -------------------------------
    // TOTAL GENERAL
    // -------------------------------

    const totalGeneral =
        totalMateriales +
        totalMano +
        totalServicios +
        viaticos +
        hospedaje +
        otros;


    // -------------------------------
    // MOSTRAR TOTALES
    // -------------------------------

    const totalMaterialesElemento =
        document.getElementById(
            "totalMateriales"
        );

    if (totalMaterialesElemento) {

        totalMaterialesElemento.textContent =
            formatearDinero(
                totalMateriales
            );

    }


    const totalManoElemento =
        document.getElementById(
            "totalMano"
        );

    if (totalManoElemento) {

        totalManoElemento.textContent =
            formatearDinero(
                totalMano
            );

    }


    const totalServiciosElemento =
        document.getElementById(
            "totalServicios"
        );

    if (totalServiciosElemento) {

        totalServiciosElemento.textContent =
            formatearDinero(
                totalServicios
            );

    }


    const totalGeneralElemento =
        document.getElementById(
            "totalGeneral"
        );

    if (totalGeneralElemento) {

        if (
            totalGeneralElemento.tagName ===
            "INPUT"
        ) {

            totalGeneralElemento.value =
                "$ " +
                formatearDinero(
                    totalGeneral
                );

        } else {

            totalGeneralElemento.textContent =
                formatearDinero(
                    totalGeneral
                );

        }

    }


    const totalGeneralTexto =
        document.getElementById(
            "totalGeneralTexto"
        );

    if (totalGeneralTexto) {

        totalGeneralTexto.textContent =
            formatearDinero(
                totalGeneral
            );

    }


    // -------------------------------
    // RESUMEN
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


    console.log(
        "TOTAL GENERAL:",
        totalGeneral
    );

    return totalGeneral;

}


// ==========================================
// ACTUALIZAR AL CAMBIAR CANTIDADES
// ==========================================

document.addEventListener(
    "input",
    function (evento) {

        if (
            evento.target.matches(
                'input[type="number"]'
            )
        ) {

            actualizarTotales();

        }

    }
);


// ==========================================
// ACTUALIZAR AL AGREGAR / ELIMINAR
// ==========================================

const mostrarMaterialesOriginal =
    mostrarMateriales;

mostrarMateriales = function () {

    mostrarMaterialesOriginal();

    actualizarTotales();

};


const mostrarManoObraOriginal =
    mostrarManoObra;

mostrarManoObra = function () {

    mostrarManoObraOriginal();

    actualizarTotales();

};


const mostrarServiciosOriginal =
    mostrarServicios;

mostrarServicios = function () {

    mostrarServiciosOriginal();

    actualizarTotales();

};


// ==========================================
// INICIO DE TOTALES
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        actualizarTotales();

    }
);
