// ==========================================================
// ALBE PRESUPUESTOS V4.0
// PRESUPUESTO.JS
// VERSION LIMPIA Y COMPLETA
// ==========================================================


// ==========================================================
// VARIABLES
// ==========================================================

let materialesBase = [];
let manoObraBase = [];
let serviciosBase = [];

let materialesPresupuesto = [];
let manoObraPresupuesto = [];
let serviciosPresupuesto = [];


// ==========================================================
// LOCAL STORAGE
// ==========================================================

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
            "ALBE - Error leyendo:",
            clave,
            error
        );

        return [];

    }

}


// ==========================================================
// NUMEROS
// ==========================================================

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


// ==========================================================
// DINERO
// ==========================================================

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


// ==========================================================
// PRECIO DESDE LA BASE
// ==========================================================

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


// ==========================================================
// NOMBRE
// ==========================================================

function obtenerNombre(item, defecto) {

    if (!item) {
        return defecto;
    }

    return (
        item.nombre ||
        item.descripcion ||
        item.detalle ||
        defecto
    );

}


// ==========================================================
// UNIDAD
// ==========================================================

function obtenerUnidad(item) {

    if (!item) {
        return "";
    }

    return (
        item.unidad ||
        item.unidadMedida ||
        ""
    );

}


// ==========================================================
// CARGAR BASES
// ==========================================================

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
        "ALBE MATERIALes:",
        materialesBase
    );

    console.log(
        "ALBE MANO DE OBRA:",
        manoObraBase
    );

    console.log(
        "ALBE SERVICIOS:",
        serviciosBase
    );


    cargarSelectMateriales();

    cargarSelectManoObra();

    cargarSelectServicios();

}


// ==========================================================
// SELECT MATERIALES
// ==========================================================

function cargarSelectMateriales() {

    const select =
        document.getElementById(
            "materialBase"
        );

    if (!select) {
        return;
    }


    select.innerHTML = "";

    const opcion =
        document.createElement(
            "option"
        );

    opcion.value = "";

    opcion.textContent =
        "Seleccione un material...";

    select.appendChild(
        opcion
    );


    materialesBase.forEach(
        (material, indice) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                indice;

            option.textContent =
                obtenerNombre(
                    material,
                    "Material"
                );

            select.appendChild(
                option
            );

        }
    );

}


// ==========================================================
// SELECT MANO DE OBRA
// ==========================================================

function cargarSelectManoObra() {

    const select =
        document.getElementById(
            "manoObraBase"
        );

    if (!select) {
        return;
    }


    select.innerHTML = "";

    const opcion =
        document.createElement(
            "option"
        );

    opcion.value = "";

    opcion.textContent =
        "Seleccione un trabajo...";

    select.appendChild(
        opcion
    );


    manoObraBase.forEach(
        (trabajo, indice) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                indice;

            option.textContent =
                obtenerNombre(
                    trabajo,
                    "Mano de obra"
                );

            select.appendChild(
                option
            );

        }
    );

}


// ==========================================================
// SELECT SERVICIOS
// ==========================================================

function cargarSelectServicios() {

    const select =
        document.getElementById(
            "servicioBase"
        );

    if (!select) {
        return;
    }


    select.innerHTML = "";

    const opcion =
        document.createElement(
            "option"
        );

    opcion.value = "";

    opcion.textContent =
        "Seleccione un servicio...";

    select.appendChild(
        opcion
    );


    serviciosBase.forEach(
        (servicio, indice) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                indice;

            option.textContent =
                obtenerNombre(
                    servicio,
                    "Servicio"
                );

            select.appendChild(
                option
            );

        }
    );

}


// ==========================================================
// INFORMACION MATERIAL
// ==========================================================

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
        obtenerNombre(
            material,
            "Material"
        );

    const unidad =
        obtenerUnidad(
            material
        );

    const precio =
        obtenerPrecio(
            material
        );


    info.style.display =
        "block";

    info.innerHTML =
        `
        <strong>${nombre}</strong><br>
        Unidad: ${unidad || "Sin unidad"}<br>
        Precio: $ ${formatearDinero(precio)}
        `;

}


// ==========================================================
// INFORMACION MANO DE OBRA
// ==========================================================

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
        obtenerNombre(
            trabajo,
            "Mano de obra"
        );

    const unidad =
        obtenerUnidad(
            trabajo
        );

    const precio =
        obtenerPrecio(
            trabajo
        );


    info.style.display =
        "block";

    info.innerHTML =
        `
        <strong>${nombre}</strong><br>
        Unidad: ${unidad || "Sin unidad"}<br>
        Precio: $ ${formatearDinero(precio)}
        `;

}


// ==========================================================
// INFORMACION SERVICIO
// ==========================================================

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
        obtenerNombre(
            servicio,
            "Servicio"
        );

    const unidad =
        obtenerUnidad(
            servicio
        );

    const precio =
        obtenerPrecio(
            servicio
        );


    info.style.display =
        "block";

    info.innerHTML =
        `
        <strong>${nombre}</strong><br>
        Unidad: ${unidad || "Sin unidad"}<br>
        Precio: $ ${formatearDinero(precio)}
        `;

}


// ==========================================================
// AGREGAR MATERIAL
// ==========================================================

function agregarMaterial() {

    const select =
        document.getElementById(
            "materialBase"
        );

    if (!select) {
        return;
    }


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


    if (!material) {
        return;
    }


    materialesPresupuesto.push({

        nombre:
            obtenerNombre(
                material,
                "Material"
            ),

        unidad:
            obtenerUnidad(
                material
            ),

        cantidad: 1,

        precio:
            obtenerPrecio(
                material
            )

    });


    mostrarMateriales();

    select.value = "";

    mostrarInfoMaterial();

    actualizarTotales();

}


// ==========================================================
// MOSTRAR MATERIALES
// ==========================================================

function mostrarMateriales() {

    const body =
        document.getElementById(
            "materialesBody"
        );

    if (!body) {
        return;
    }


    body.innerHTML = "";


    materialesPresupuesto.forEach(
        (material, indice) => {

            const cantidad =
                convertirNumero(
                    material.cantidad
                );

            const precio =
                convertirNumero(
                    material.precio
                );

            const subtotal =
                cantidad * precio;


            const fila =
                document.createElement(
                    "tr"
                );


            fila.innerHTML =
                `
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
                        value="${cantidad}"
                        data-material-cantidad="${indice}"
                    >
                </td>

                <td>
                    $ ${formatearDinero(precio)}
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


            body.appendChild(
                fila
            );

        }
    );


    conectarEventosMateriales();

}


// ==========================================================
// EVENTOS MATERIALES
// ==========================================================

function conectarEventosMateriales() {

    const body =
        document.getElementById(
            "materialesBody"
        );

    if (!body) {
        return;
    }


    body.querySelectorAll(
        "[data-material-cantidad]"
    ).forEach(
        input => {

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


                    if (!material) {
                        return;
                    }


                    material.cantidad =
                        convertirNumero(
                            this.value
                        );


                    const subtotal =
                        material.cantidad *
                        material.precio;


                    const elemento =
                        body.querySelector(
                            `[data-material-subtotal="${indice}"]`
                        );


                    if (elemento) {

                        elemento.textContent =
                            formatearDinero(
                                subtotal
                            );

                    }


                    actualizarTotales();

                }
            );

        }
    );


    body.querySelectorAll(
        "[data-eliminar-material]"
    ).forEach(
        boton => {

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

                    actualizarTotales();

                }
            );

        }
    );

}


// ==========================================================
// AGREGAR MANO DE OBRA
// ==========================================================

function agregarManoObra() {

    const select =
        document.getElementById(
            "manoObraBase"
        );

    if (!select) {
        return;
    }


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


    if (!trabajo) {
        return;
    }


    manoObraPresupuesto.push({

        nombre:
            obtenerNombre(
                trabajo,
                "Mano de obra"
            ),

        unidad:
            obtenerUnidad(
                trabajo
            ),

        cantidad: 1,

        precio:
            obtenerPrecio(
                trabajo
            )

    });


    mostrarManoObra();

    select.value = "";

    mostrarInfoManoObra();

    actualizarTotales();

}


// ==========================================================
// MOSTRAR MANO DE OBRA
// ==========================================================

function mostrarManoObra() {

    const body =
        document.getElementById(
            "manoBody"
        );

    if (!body) {
        return;
    }


    body.innerHTML = "";


    manoObraPresupuesto.forEach(
        (trabajo, indice) => {

            const cantidad =
                convertirNumero(
                    trabajo.cantidad
                );

            const precio =
                convertirNumero(
                    trabajo.precio
                );

            const subtotal =
                cantidad * precio;


            const fila =
                document.createElement(
                    "tr"
                );


            fila.innerHTML =
                `
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
                        value="${cantidad}"
                        data-mano-cantidad="${indice}"
                    >
                </td>

                <td>
                    $ ${formatearDinero(precio)}
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


            body.appendChild(
                fila
            );

        }
    );


    conectarEventosManoObra();

}


// ==========================================================
// EVENTOS MANO DE OBRA
// ==========================================================

function conectarEventosManoObra() {

    const body =
        document.getElementById(
            "manoBody"
        );

    if (!body) {
        return;
    }


    body.querySelectorAll(
        "[data-mano-cantidad]"
    ).forEach(
        input => {

            input.addEventListener(
                "input",
                function () {

                    const indice =
                        Number(
                            this.dataset
                                .manoCantidad
                        );


                    const trabajo =
                        manoObraPresupuesto[
                            indice
                        ];


                    if (!trabajo) {
                        return;
                    }


                    trabajo.cantidad =
                        convertirNumero(
                            this.value
                        );


                    const subtotal =
                        trabajo.cantidad *
                        trabajo.precio;


                    const elemento =
                        body.querySelector(
                            `[data-mano-subtotal="${indice}"]`
                        );


                    if (elemento) {

                        elemento.textContent =
                            formatearDinero(
                                subtotal
                            );

                    }


                    actualizarTotales();

                }
            );

        }
    );


    body.querySelectorAll(
        "[data-eliminar-mano]"
    ).forEach(
        boton => {

            boton.addEventListener(
                "click",
                function () {

                    const indice =
                        Number(
                            this.dataset
                                .eliminarMano
                        );


                    manoObraPresupuesto.splice(
                        indice,
                        1
                    );


                    mostrarManoObra();

                    actualizarTotales();

                }
            );

        }
    );

}


// ==========================================================
// AGREGAR SERVICIO
// ==========================================================

function agregarServicio() {

    const select =
        document.getElementById(
            "servicioBase"
        );

    if (!select) {
        return;
    }


    const indice =
        select.value;


    if (indice === "") {

        alert(
            "Seleccione un servicio."
        );

        return;

    }


    const servicio =
        serviciosBase[
            Number(indice)
        ];


    if (!servicio) {
        return;
    }


    serviciosPresupuesto.push({

        nombre:
            obtenerNombre(
                servicio,
                "Servicio"
            ),

        unidad:
            obtenerUnidad(
                servicio
            ),

        cantidad: 1,

        precio:
            obtenerPrecio(
                servicio
            )

    });


    mostrarServicios();

    select.value = "";

    mostrarInfoServicio();

    actualizarTotales();

}


// ==========================================================
// MOSTRAR SERVICIOS
// ==========================================================

function mostrarServicios() {

    const body =
        document.getElementById(
            "serviciosBody"
        );

    if (!body) {
        return;
    }


    body.innerHTML = "";


    serviciosPresupuesto.forEach(
        (servicio, indice) => {

            const cantidad =
                convertirNumero(
                    servicio.cantidad
                );

            const precio =
                convertirNumero(
                    servicio.precio
                );

            const subtotal =
                cantidad * precio;


            const fila =
                document.createElement(
                    "tr"
                );


            fila.innerHTML =
                `
                <td>
                    ${servicio.nombre}
                    ${
                        servicio.unidad
                        ? " (" +
                          servicio.unidad +
                          ")"
                        : ""
                    }
                </td>

                <td>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value="${cantidad}"
                        data-servicio-cantidad="${indice}"
                    >
                </td>

                <td>
                    $ ${formatearDinero(precio)}
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


            body.appendChild(
                fila
            );

        }
    );


    conectarEventosServicios();

}


// ==========================================================
// EVENTOS SERVICIOS
// ==========================================================

function conectarEventosServicios() {

    const body =
        document.getElementById(
            "serviciosBody"
        );

    if (!body) {
        return;
    }


    body.querySelectorAll(
        "[data-servicio-cantidad]"
    ).forEach(
        input => {

            input.addEventListener(
                "input",
                function () {

                    const indice =
                        Number(
                            this.dataset
                                .servicioCantidad
                        );


                    const servicio =
                        serviciosPresupuesto[
                            indice
                        ];


                    if (!servicio) {
                        return;
                    }


                    servicio.cantidad =
                        convertirNumero(
                            this.value
                        );


                    const subtotal =
                        servicio.cantidad *
                        servicio.precio;


                    const elemento =
                        body.querySelector(
                            `[data-servicio-subtotal="${indice}"]`
                        );


                    if (elemento) {

                        elemento.textContent =
                            formatearDinero(
                                subtotal
                            );

                    }


                    actualizarTotales();

                }
            );

        }
    );


    body.querySelectorAll(
        "[data-eliminar-servicio]"
    ).forEach(
        boton => {

            boton.addEventListener(
                "click",
                function () {

                    const indice =
                        Number(
                            this.dataset
                                .eliminarServicio
                        );


                    serviciosPresupuesto.splice(
                        indice,
                        1
                    );


                    mostrarServicios();

                    actualizarTotales();

                }
            );

        }
    );

}


// ==========================================================
// CALCULAR TOTAL DE UNA LISTA
// ==========================================================

function calcularLista(lista) {

    return lista.reduce(
        (
            total,
            item
        ) => {

            return total +
                (
                    convertirNumero(
                        item.cantidad
                    ) *
                    convertirNumero(
                        item.precio
                    )
                );

        },
        0
    );

}


// ==========================================================
// ACTUALIZAR TOTALES
// ==========================================================

function actualizarTotales() {

    const totalMateriales =
        calcularLista(
            materialesPresupuesto
        );

    const totalMano =
        calcularLista(
            manoObraPresupuesto
        );

    const totalServicios =
        calcularLista(
            serviciosPresupuesto
        );


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


    const totalGeneral =
        totalMateriales +
        totalMano +
        totalServicios +
        viaticos +
        hospedaje +
        otros;


    // ------------------------------------------
    // TOTALES DE CATEGORIAS
    // ------------------------------------------

    const elementoMateriales =
        document.getElementById(
            "totalMateriales"
        );

    if (elementoMateriales) {

        elementoMateriales.textContent =
            formatearDinero(
                totalMateriales
            );

    }


    const elementoMano =
        document.getElementById(
            "totalMano"
        );

    if (elementoMano) {

        elementoMano.textContent =
            formatearDinero(
                totalMano
            );

    }


    const elementoServicios =
        document.getElementById(
            "totalServicios"
        );

    if (elementoServicios) {

        elementoServicios.textContent =
            formatearDinero(
                totalServicios
            );

    }


    // ------------------------------------------
    // TOTAL GENERAL
    // ------------------------------------------

    const elementoGeneral =
        document.getElementById(
            "totalGeneral"
        );

    if (elementoGeneral) {

        elementoGeneral.value =
            "$ " +
            formatearDinero(
                totalGeneral
            );

    }


    const elementoGeneralTexto =
        document.getElementById(
            "totalGeneralTexto"
        );

    if (elementoGeneralTexto) {

        elementoGeneralTexto.textContent =
            formatearDinero(
                totalGeneral
            );

    }


    // ------------------------------------------
    // RESUMEN
    // ------------------------------------------

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


    return totalGeneral;

}


// ==========================================================
// GUARDAR PRESUPUESTO
// ==========================================================

function guardarPresupuesto() {

    const presupuesto = {

        fechaGuardado:
            new Date().toISOString(),

        numero:
            document.getElementById(
                "agenda"
            )?.value || "",

        fecha:
            document.getElementById(
                "fecha"
            )?.value || "",

        estado:
            document.getElementById(
                "estado"
            )?.value || "Borrador",

        empresa:
            document.getElementById(
                "empresa"
            )?.value || "",

        sucursal:
            document.getElementById(
                "sucursal"
            )?.value || "",

        provincia:
            document.getElementById(
                "provincia"
            )?.value || "",

        localidad:
            document.getElementById(
                "localidad"
            )?.value || "",

        direccion:
            document.getElementById(
                "direccion"
            )?.value || "",

        lugar:
            document.getElementById(
                "lugar"
            )?.value || "",

        tareas:
            document.getElementById(
                "tareas"
            )?.value || "",

        validez:
            document.getElementById(
                "validez"
            )?.value || "",

        condicionesPago:
            document.getElementById(
                "condicionesPago"
            )?.value || "",

        viaticos:
            convertirNumero(
                document.getElementById(
                    "viaticos"
                )?.value
            ),

        hospedaje:
            convertirNumero(
                document.getElementById(
                    "hospedajeTotal"
                )?.value
            ),

        otrosGastos:
            convertirNumero(
                document.getElementById(
                    "otrosGastos"
                )?.value
            ),

        otros:
            document.getElementById(
                "otros"
            )?.value || "",

        observaciones:
            document.getElementById(
                "observaciones"
            )?.value || "",

        materiales:
            materialesPresupuesto,

        manoObra:
            manoObraPresupuesto,

        servicios:
            serviciosPresupuesto,

        total:
            actualizarTotales()

    };


    let historial = [];


    try {

        historial =
            JSON.parse(
                localStorage.getItem(
                    "albe_presupuestos"
                )
            ) || [];

    } catch (error) {

        historial = [];

    }


    historial.push(
        presupuesto
    );


    localStorage.setItem(
        "albe_presupuestos",
        JSON.stringify(
            historial
        )
    );


    alert(
        "Presupuesto guardado correctamente."
    );

}


// ==========================================================
// NUEVO PRESUPUESTO
// ==========================================================

function nuevoPresupuesto() {

    const confirmar =
        confirm(
            "¿Desea iniciar un nuevo presupuesto?"
        );


    if (!confirmar) {
        return;
    }


    materialesPresupuesto = [];

    manoObraPresupuesto = [];

    serviciosPresupuesto = [];


    const formulario =
        document.querySelector(
            "form"
        );


    if (formulario) {

        formulario.reset();

    }


    mostrarMateriales();

    mostrarManoObra();

    mostrarServicios();

    actualizarTotales();


    const fecha =
        document.getElementById(
            "fecha"
        );


    if (fecha) {

        const hoy =
            new Date();

        const año =
            hoy.getFullYear();

        const mes =
            String(
                hoy.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const dia =
            String(
                hoy.getDate()
            ).padStart(
                2,
                "0"
            );


        fecha.value =
            `${año}-${mes}-${dia}`;

    }

}


// ==========================================================
// WHATSAPP
// ==========================================================

function enviarWhatsApp() {

    const empresa =
        document.getElementById(
            "empresa"
        )?.value || "Cliente";


    const numero =
        document.getElementById(
            "agenda"
        )?.value || "";


    const total =
        document.getElementById(
            "totalGeneral"
        )?.value || "$ 0,00";


    const lugar =
        document.getElementById(
            "lugar"
        )?.value || "";


    const mensaje =
        `ALBE SERVICIOS GENERALES

Presupuesto N°: ${numero}

Cliente: ${empresa}

Lugar: ${lugar}

TOTAL: ${total}

Saludos.
ALBE Servicios Generales`;


    const url =
        "https://wa.me/?text=" +
        encodeURIComponent(
            mensaje
        );


    window.open(
        url,
        "_blank"
    );

}


// ==========================================================
// EVENTOS
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ------------------------------------------
        // CARGAR BASES
        // ------------------------------------------

        cargarBases();


        // ------------------------------------------
        // MATERIAL
        // ------------------------------------------

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


        const selectMaterial =
            document.getElementById(
                "materialBase"
            );

        if (selectMaterial) {

            selectMaterial.addEventListener(
                "change",
                mostrarInfoMaterial
            );

        }


        // ------------------------------------------
        // MANO DE OBRA
        // ------------------------------------------

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


        const selectMano =
            document.getElementById(
                "manoObraBase"
            );

        if (selectMano) {

            selectMano.addEventListener(
                "change",
                mostrarInfoManoObra
            );

        }


        // ------------------------------------------
        // SERVICIOS
        // ------------------------------------------

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


        const selectServicio =
            document.getElementById(
                "servicioBase"
            );

        if (selectServicio) {

            selectServicio.addEventListener(
                "change",
                mostrarInfoServicio
            );

        }


        // ------------------------------------------
        // GASTOS
        // ------------------------------------------

        [
            "viaticos",
            "hospedajeTotal",
            "otrosGastos"
        ]
        .forEach(
            id => {

                const campo =
                    document.getElementById(
                        id
                    );

                if (campo) {

                    campo.addEventListener(
                        "input",
                        actualizarTotales
                    );

                }

            }
        );


        // ------------------------------------------
        // GUARDAR
        // ------------------------------------------

        const btnGuardar =
            document.getElementById(
                "btnGuardar"
            );

        if (btnGuardar) {

            btnGuardar.addEventListener(
                "click",
                guardarPresupuesto
            );

        }


        // ------------------------------------------
        // NUEVO
        // ------------------------------------------

        const btnNuevo =
            document.getElementById(
                "btnNuevo"
            );

        if (btnNuevo) {

            btnNuevo.addEventListener(
                "click",
                nuevoPresupuesto
            );

        }


        // ------------------------------------------
        // WHATSAPP
        // ------------------------------------------

        const btnWhatsapp =
            document.getElementById(
                "btnWhatsapp"
            );

        if (btnWhatsapp) {

            btnWhatsapp.addEventListener(
                "click",
                enviarWhatsApp
            );

        }


        // ------------------------------------------
        // TOTAL INICIAL
        // ------------------------------------------

        actualizarTotales();


        console.log(
            "ALBE PRESUPUESTOS V4.0 - OK"
        );

    }
);
