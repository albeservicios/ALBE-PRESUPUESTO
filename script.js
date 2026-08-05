// =====================================
// ALBE PRESUPUESTOS PRO
// PARTE 1
// =====================================

let clientes = [];
let localidades = [];

// Cargar archivos JSON
async function iniciarSistema() {

    try {

        const respuestaClientes = await fetch("clientes.json");
        clientes = await respuestaClientes.json();

        const respuestaLocalidades = await fetch("localidades.json");
        localidades = await respuestaLocalidades.json();

        console.log("Clientes cargados");
        console.log("Localidades cargadas");

    } catch (error) {

        console.error("Error cargando datos:", error);

    }

}

// Elementos
const btnOncity = document.getElementById("btnOncity");
const btnCredito = document.getElementById("btnCredito");

const cliente = document.getElementById("cliente");
const sucursal = document.getElementById("sucursal");
const provincia = document.getElementById("provincia");
const localidad = document.getElementById("localidad");
const direccion = document.getElementById("direccion");

// Evento botones
btnOncity.addEventListener("click", () => {

    cliente.value = "ON CITY";

    cargarSucursales("ON CITY");

});

btnCredito.addEventListener("click", () => {

    cliente.value = "CRÉDITO ARGENTINO";

    cargarSucursales("CRÉDITO ARGENTINO");

});

// Cargar sucursales
function cargarSucursales(nombreCliente) {

    sucursal.innerHTML = "<option value=''>Seleccione...</option>";

    const lista = clientes.filter(c => c.cliente === nombreCliente);

    lista.forEach(c => {

        const opcion = document.createElement("option");

        opcion.value = c.sucursal;

        opcion.textContent = c.sucursal;

        sucursal.appendChild(opcion);

    });

}

// Cambio de sucursal
sucursal.addEventListener("change", () => {

    const dato = clientes.find(c =>
        c.sucursal === sucursal.value &&
        c.cliente === cliente.value
    );

    if (!dato) return;

    provincia.innerHTML =
        `<option>${dato.provincia}</option>`;

    localidad.innerHTML =
        `<option>${dato.localidad}</option>`;

    direccion.value =
        dato.direccion;

});

// Iniciar
window.addEventListener("load", iniciarSistema);
