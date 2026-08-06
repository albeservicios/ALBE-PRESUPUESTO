// =====================================
// ALBE SERVICIOS GENERALES
// CLIENTES.JS
// PARTE 1
// =====================================

let clientes = [];

function cargarClientes(){

    clientes =
    JSON.parse(localStorage.getItem("clientes")) || [];

    mostrarClientes();

}

function guardarClientes(){

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

}

function mostrarClientes(){

    const tbody =
    document.getElementById("clientesBody");

    tbody.innerHTML = "";

    clientes.forEach((c, indice)=>{

        tbody.innerHTML += `
        <tr onclick="seleccionarCliente(${indice})">

            <td>${c.empresa}</td>
            <td>${c.sucursal}</td>
            <td>${c.contacto}</td>
            <td>${c.telefono}</td>
            <td>${c.provincia}</td>
            <td>${c.localidad}</td>

        </tr>
        `;

    });

}

window.addEventListener("load",cargarClientes);
// =====================================
// PARTE 2
// GUARDAR - EDITAR - LIMPIAR
// =====================================

let clienteSeleccionado = -1;

function obtenerDatosFormulario(){

    return {

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

}

function seleccionarCliente(indice){

    clienteSeleccionado = indice;

    const c = clientes[indice];

    document.getElementById("empresa").value = c.empresa;
    document.getElementById("sucursal").value = c.sucursal;
    document.getElementById("contacto").value = c.contacto;
    document.getElementById("telefono").value = c.telefono;
    document.getElementById("correo").value = c.correo;
    document.getElementById("provincia").value = c.provincia;
    document.getElementById("localidad").value = c.localidad;
    document.getElementById("direccion").value = c.direccion;
    document.getElementById("observaciones").value = c.observaciones;

}

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

    clienteSeleccionado = -1;

}

document.getElementById("btnGuardar").addEventListener("click",()=>{

    const datos = obtenerDatosFormulario();

    if(clienteSeleccionado >= 0){

        clientes[clienteSeleccionado] = datos;

    }else{

        clientes.push(datos);

    }

    guardarClientes();

    mostrarClientes();

    limpiarFormulario();

    alert("Cliente guardado correctamente.");

});

document.getElementById("btnNuevo").addEventListener("click",limpiarFormulario);
// =====================================
// PARTE 2
// GUARDAR - EDITAR - LIMPIAR
// =====================================

let clienteSeleccionado = -1;

function obtenerDatosFormulario(){

    return {

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

}

function seleccionarCliente(indice){

    clienteSeleccionado = indice;

    const c = clientes[indice];

    document.getElementById("empresa").value = c.empresa;
    document.getElementById("sucursal").value = c.sucursal;
    document.getElementById("contacto").value = c.contacto;
    document.getElementById("telefono").value = c.telefono;
    document.getElementById("correo").value = c.correo;
    document.getElementById("provincia").value = c.provincia;
    document.getElementById("localidad").value = c.localidad;
    document.getElementById("direccion").value = c.direccion;
    document.getElementById("observaciones").value = c.observaciones;

}

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

    clienteSeleccionado = -1;

}

document.getElementById("btnGuardar").addEventListener("click",()=>{

    const datos = obtenerDatosFormulario();

    if(clienteSeleccionado >= 0){

        clientes[clienteSeleccionado] = datos;

    }else{

        clientes.push(datos);

    }

    guardarClientes();

    mostrarClientes();

    limpiarFormulario();

    alert("Cliente guardado correctamente.");

});

document.getElementById("btnNuevo").addEventListener("click",limpiarFormulario);
// =====================================
// PARTE 3
// ELIMINAR - BUSCAR
// =====================================

// Eliminar cliente
document.getElementById("btnEliminar").addEventListener("click",()=>{

    if(clienteSeleccionado < 0){

        alert("Seleccione un cliente.");

        return;

    }

    if(confirm("¿Desea eliminar este cliente?")){

        clientes.splice(clienteSeleccionado,1);

        guardarClientes();

        mostrarClientes();

        limpiarFormulario();

    }

});

// Buscar cliente
document.getElementById("buscarCliente").addEventListener("input",function(){

    const texto=this.value.toLowerCase();

    const tbody=document.getElementById("clientesBody");

    tbody.innerHTML="";

    clientes
    .filter(c=>

        c.empresa.toLowerCase().includes(texto) ||

        c.sucursal.toLowerCase().includes(texto) ||

        c.contacto.toLowerCase().includes(texto) ||

        c.localidad.toLowerCase().includes(texto)

    )
    .forEach((c,indice)=>{

        tbody.innerHTML+=`

        <tr onclick="seleccionarCliente(${indice})">

            <td>${c.empresa}</td>
            <td>${c.sucursal}</td>
            <td>${c.contacto}</td>
            <td>${c.telefono}</td>
            <td>${c.provincia}</td>
            <td>${c.localidad}</td>

        </tr>

        `;

    });

});
// =====================================
// PARTE 4
// SELECCIÓN PARA PRESUPUESTOS
// =====================================

// Obtener un cliente por índice
function obtenerCliente(indice){

    if(indice < 0 || indice >= clientes.length){
        return null;
    }

    return clientes[indice];

}

// Obtener todos los clientes
function obtenerListaClientes(){

    return clientes;

}

// Exportar a localStorage para el presupuesto
function actualizarClientesPresupuesto(){

    localStorage.setItem(
        "clientesPresupuesto",
        JSON.stringify(clientes)
    );

}

// Actualizar automáticamente cada vez que cambia la lista
const guardarOriginal = guardarClientes;

guardarClientes = function(){

    guardarOriginal();

    actualizarClientesPresupuesto();

}

// Crear el almacenamiento si no existe
actualizarClientesPresupuesto();
