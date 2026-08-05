// ======================================
// CLIENTES.JS - PARTE 1
// ======================================

let clientes = [];

function guardarClientes() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

function cargarClientes() {

    clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    mostrarClientes();

}

function mostrarClientes() {

    const tbody = document.getElementById("clientesBody");

    tbody.innerHTML = "";

    clientes.forEach((c, i) => {

        tbody.innerHTML += `
        <tr onclick="seleccionarCliente(${i})">

            <td>${c.empresa}</td>
            <td>${c.sucursal}</td>
            <td>${c.contacto}</td>
            <td>${c.telefono}</td>
            <td>${c.localidad}</td>

        </tr>
        `;

    });

}

function seleccionarCliente(i){

    const c = clientes[i];

    document.getElementById("empresa").value = c.empresa;
    document.getElementById("sucursal").value = c.sucursal;
    document.getElementById("contacto").value = c.contacto;
    document.getElementById("telefono").value = c.telefono;
    document.getElementById("correo").value = c.correo;
    document.getElementById("provincia").value = c.provincia;
    document.getElementById("localidad").value = c.localidad;
    document.getElementById("direccion").value = c.direccion;
    document.getElementById("observaciones").value = c.observaciones;

    document.getElementById("btnGuardarCliente").dataset.editar = i;

}

window.onload = cargarClientes;

// ======================================
// CLIENTES.JS - PARTE 2
// Guardar - Editar - Eliminar - Nuevo
// ======================================

document.getElementById("btnGuardarCliente").addEventListener("click", () => {

    const cliente = {

        empresa: document.getElementById("empresa").value,
        sucursal: document.getElementById("sucursal").value,
        contacto: document.getElementById("contacto").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        provincia: document.getElementById("provincia").value,
        localidad: document.getElementById("localidad").value,
        direccion: document.getElementById("direccion").value,
        observaciones: document.getElementById("observaciones").value

    };

    const editar = document.getElementById("btnGuardarCliente").dataset.editar;

    if (editar !== undefined && editar !== "") {

        clientes[editar] = cliente;

        delete document.getElementById("btnGuardarCliente").dataset.editar;

    } else {

        clientes.push(cliente);

    }

    guardarClientes();

    mostrarClientes();

    limpiarFormulario();

    alert("Cliente guardado correctamente.");

});

function limpiarFormulario(){

    document.getElementById("empresa").value = "";
    document.getElementById("sucursal").value = "";
    document.getElementById("contacto").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("provincia").value = "";
    document.getElementById("localidad").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("observaciones").value = "";

}

document.getElementById("btnNuevoCliente").addEventListener("click", () => {

    limpiarFormulario();

});

document
