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
//==========================================
// PARTE 2
// Materiales y Mano de Obra
//==========================================

document.getElementById("agregarMaterial").addEventListener("click", agregarMaterial);
document.getElementById("agregarMano").addEventListener("click", agregarMano);

// AGREGAR MATERIAL
function agregarMaterial(){

    const tbody = document.getElementById("materialesBody");

    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td><input type="text" placeholder="Descripción"></td>
        <td><input type="number" value="1" min="1" onchange="calcularTodo()"></td>
        <td><input type="number" value="0" min="0" onchange="calcularTodo()"></td>
        <td class="subtotal">$0</td>
        <td><button onclick="eliminarFila(this)">❌</button></td>
    `;

    calcularTodo();

}

// AGREGAR MANO DE OBRA
function agregarMano(){

    const tbody = document.getElementById("manoBody");

    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td><input type="text" placeholder="Trabajo realizado"></td>
        <td><input type="number" value="1" min="1" onchange="calcularTodo()"></td>
        <td><input type="number" value="0" min="0" onchange="calcularTodo()"></td>
        <td class="subtotal">$0</td>
        <td><button onclick="eliminarFila(this)">❌</button></td>
    `;

    calcularTodo();

}

// ELIMINAR FILA
function eliminarFila(boton){

    boton.closest("tr").remove();

    calcularTodo();

}

// CALCULAR UNA TABLA
function calcularTabla(idTabla, idTotal){

    let total = 0;

    document.querySelectorAll(`#${idTabla} tr`).forEach(fila=>{

        const cantidad =
        Number(fila.cells[1].querySelector("input").value);

        const precio =
        Number(fila.cells[2].querySelector("input").value);

        const subtotal = cantidad * precio;

        fila.cells[3].innerHTML =
        "$ " + subtotal.toLocaleString("es-AR");

        total += subtotal;

    });

    document.getElementById(idTotal).innerHTML =
    "$ " + total.toLocaleString("es-AR");

    return total;

}
//==========================================
// PARTE 3
// Totales - Viáticos - Hospedaje
//==========================================

function calcularTodo(){

    const totalMateriales =
        calcularTabla("materialesBody","totalMateriales");

    const totalMano =
        calcularTabla("manoBody","totalMano");

    const km =
        Number(document.getElementById("km").value || 0);

    const tarifa =
        Number(document.getElementById("tarifa").value || 570);

    const viaticos = km * tarifa;

    document.getElementById("viaticos").value = viaticos;

    const dias =
        Number(document.getElementById("dias").value || 0);

    const valorDia =
        Number(document.getElementById("valorDia").value || 60000);

    const hospedaje = dias * valorDia;

    document.getElementById("hospedajeTotal").value = hospedaje;

    const total =
        totalMateriales +
        totalMano +
        viaticos +
        hospedaje;

    document.getElementById("totalGeneral").innerHTML =
        "$ " + total.toLocaleString("es-AR");

}

// Recalcular automáticamente
["km","tarifa","dias","valorDia"].forEach(id=>{

    const campo = document.getElementById(id);

    if(campo){

        campo.addEventListener("input",calcularTodo);

    }

});

// Crear una fila inicial
window.addEventListener("load",()=>{

    agregarMaterial();

    agregarMano();

    calcularTodo();

});
//==========================================
// PARTE 4
// PDF - WhatsApp - Guardar - Buscar
//==========================================

// PDF
function generarPDF(){

    window.print();

}

// WhatsApp
function enviarWhatsApp(){

    const cliente = document.getElementById("cliente").value;
    const sucursal = document.getElementById("sucursal").value;
    const total = document.getElementById("totalGeneral").innerText;

    const mensaje =
`*ALBE SERVICIOS GENERALES*

Cliente: ${cliente}
Sucursal: ${sucursal}

Total Presupuesto: ${total}`;

    window.open(
        "https://wa.me/?text="+
        encodeURIComponent(mensaje),
        "_blank"
    );

}

// Guardar
function guardarPresupuesto(){

    const datos = {

        agenda:document.getElementById("agenda").value,
        fecha:document.getElementById("fecha").value,
        cliente:document.getElementById("cliente").value,
        sucursal:document.getElementById("sucursal").value,
        provincia:document.getElementById("provincia").value,
        localidad:document.getElementById("localidad").value,
        direccion:document.getElementById("direccion").value,
        lugar:document.getElementById("lugar").value,
        supervisor:document.getElementById("supervisor").value,
        descripcion:document.getElementById("descripcion").value,
        total:document.getElementById("totalGeneral").innerText

    };

    let lista =
    JSON.parse(localStorage.getItem("presupuestos")) || [];

    lista.push(datos);

    localStorage.setItem(
        "presupuestos",
        JSON.stringify(lista)
    );

    alert("Presupuesto guardado.");

}

// Buscar
function buscarPresupuesto(){

    const agenda =
    prompt("Ingrese el N° de Agenda");

    if(!agenda) return;

    const lista =
    JSON.parse(localStorage.getItem("presupuestos")) || [];

    const dato =
    lista.find(x=>x.agenda===agenda);

    if(!dato){

        alert("No encontrado");

        return;

    }

    document.getElementById("agenda").value=dato.agenda;
    document.getElementById("fecha").value=dato.fecha;
    document.getElementById("cliente").value=dato.cliente;
    document.getElementById("sucursal").value=dato.sucursal;
    document.getElementById("provincia").value=dato.provincia;
    document.getElementById("localidad").value=dato.localidad;
    document.getElementById("direccion").value=dato.direccion;
    document.getElementById("lugar").value=dato.lugar;
    document.getElementById("supervisor").value=dato.supervisor;
    document.getElementById("descripcion").value=dato.descripcion;
    document.getElementById("totalGeneral").innerHTML=dato.total;

}

// Nuevo
function nuevoPresupuesto(){

    if(confirm("¿Crear un presupuesto nuevo?")){

        location.reload();

    }

}

//==========================================
// EVENTOS
//==========================================

const btnPDF = document.getElementById("btnPDF");
if (btnPDF) btnPDF.onclick = generarPDF;

const btnWhatsapp = document.getElementById("btnWhatsapp");
if (btnWhatsapp) btnWhatsapp.onclick = enviarWhatsApp;

const btnGuardar = document.getElementById("btnGuardar");
if (btnGuardar) btnGuardar.onclick = guardarPresupuesto;

const btnBuscar = document.getElementById("btnBuscar");
if (btnBuscar) btnBuscar.onclick = buscarPresupuesto;

const btnNuevo = document.getElementById("btnNuevo");
if (btnNuevo) btnNuevo.onclick = nuevoPresupuesto;
