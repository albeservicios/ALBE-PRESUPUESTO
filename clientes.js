// ==========================================
// ALBE PRESUPUESTOS V4.0
// CLIENTES.JS
// PARTE 3
// ==========================================

let baseClientes = [];

// ==========================================
// CARGAR BASE JSON
// ==========================================

async function cargarBaseClientes() {

    try {

        const respuesta = await fetch("clientes.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar clientes.json");
        }

        const datos = await respuesta.json();

        baseClientes = datos.clientes || [];

        mostrarClientes();

        cargarEmpresas();

        console.log("Base de clientes V4 cargada.");

    } catch (error) {

        console.error("Error cargando clientes:", error);

        alert(
            "No se pudo cargar la base de clientes."
        );

    }

}

// ==========================================
// MOSTRAR CLIENTES
// ==========================================

function mostrarClientes() {

    const lista =
        document.getElementById("listaClientes");

    if (!lista) return;

    lista.innerHTML = "";

    baseClientes.forEach(cliente => {

        const div =
            document.createElement("div");

        div.className = "cliente-item";

        div.innerHTML = `
            <strong>${cliente.empresa}</strong>
            <span>${cliente.razonSocial || ""}</span>
            <small>
                ${cliente.sucursales.length} sucursales
            </small>
        `;

        lista.appendChild(div);

    });

}

// ==========================================
// CARGAR EMPRESAS EN SELECT
// ==========================================

function cargarEmpresas() {

    const select =
        document.getElementById("empresaCliente");

    if (!select) return;

    select.innerHTML =
        `<option value="">Seleccione empresa...</option>`;

    baseClientes.forEach((cliente, indice) => {

        const option =
            document.createElement("option");

        option.value = indice;

        option.textContent =
            cliente.empresa;

        select.appendChild(option);

    });

    select.addEventListener(
        "change",
        cargarProvincias
    );

}

// ==========================================
// PROVINCIAS
// ==========================================

function cargarProvincias() {

    const empresa =
        baseClientes[
            document.getElementById("empresaCliente").value
        ];

    const provincia =
        document.getElementById("provinciaCliente");

    const localidad =
        document.getElementById("localidadCliente");

    const sucursal =
        document.getElementById("sucursalCliente");

    if (!provincia) return;

    provincia.innerHTML =
        `<option value="">Seleccione provincia...</option>`;

    localidad.innerHTML =
        `<option value="">Seleccione localidad...</option>`;

    sucursal.innerHTML =
        `<option value="">Seleccione sucursal...</option>`;

    if (!empresa) return;

    const provincias = [
        ...new Set(
            empresa.sucursales.map(
                s => s.provincia
            )
        )
    ];

    provincias.forEach(nombre => {

        provincia.innerHTML +=
            `<option value="${nombre}">
                ${nombre}
            </option>`;

    });

    provincia.onchange =
        cargarLocalidades;

}

// ==========================================
// LOCALIDADES
// ==========================================

function cargarLocalidades() {

    const indice =
        document.getElementById("empresaCliente").value;

    const empresa =
        baseClientes[indice];

    const provincia =
        document.getElementById("provinciaCliente").value;

    const localidad =
        document.getElementById("localidadCliente");

    const sucursal =
        document.getElementById("sucursalCliente");

    localidad.innerHTML =
        `<option value="">Seleccione localidad...</option>`;

    sucursal.innerHTML =
        `<option value="">Seleccione sucursal...</option>`;

    const localidades = [
        ...new Set(
            empresa.sucursales
                .filter(s => s.provincia === provincia)
                .map(s => s.localidad)
        )
    ];

    localidades.forEach(nombre => {

        localidad.innerHTML +=
            `<option value="${nombre}">
                ${nombre}
            </option>`;

    });

    localidad.onchange =
        cargarSucursales;

}

// ==========================================
// SUCURSALES
// ==========================================

function cargarSucursales() {

    const indice =
        document.getElementById("empresaCliente").value;

    const empresa =
        baseClientes[indice];

    const provincia =
        document.getElementById("provinciaCliente").value;

    const localidad =
        document.getElementById("localidadCliente").value;

    const sucursal =
        document.getElementById("sucursalCliente");

    sucursal.innerHTML =
        `<option value="">Seleccione sucursal...</option>`;

    empresa.sucursales
        .filter(s =>
            s.provincia === provincia &&
            s.localidad === localidad
        )
        .forEach((s, i) => {

            const option =
                document.createElement("option");

            option.value =
                JSON.stringify(s);

            option.textContent =
                s.sucursal;

            sucursal.appendChild(option);

        });

    sucursal.onchange =
        completarSucursal;

}

// ==========================================
// COMPLETAR DATOS
// ==========================================

function completarSucursal() {

    const valor =
        document.getElementById("sucursalCliente").value;

    if (!valor) return;

    const sucursal =
        JSON.parse(valor);

    const direccion =
        document.getElementById("direccionCliente");

    const telefono =
        document.getElementById("telefonoCliente");

    if (direccion) {
        direccion.value =
            sucursal.direccion || "";
    }

    if (telefono) {
        telefono.value =
            sucursal.telefono || "";
    }

}

// ==========================================
// INICIO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    cargarBaseClientes
);
