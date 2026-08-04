//==================================================
// ALBE PRESUPUESTOS PRO
// PARTE 1
//==================================================

//=====================
// CLIENTES
//=====================

const clientes = {

    "ON CITY": {

        sucursales: [

            {
                nombre: "Catriel",
                provincia: "Río Negro",
                localidad: "Catriel",
                direccion: ""
            },

            {
                nombre: "Neuquén",
                provincia: "Neuquén",
                localidad: "Neuquén",
                direccion: ""
            },

            {
                nombre: "General Roca",
                provincia: "Río Negro",
                localidad: "General Roca",
                direccion: ""
            }

        ]

    },

    "CRÉDITO ARGENTINO": {

        sucursales: [

            {
                nombre: "Catriel",
                provincia: "Río Negro",
                localidad: "Catriel",
                direccion: ""
            },

            {
                nombre: "Cinco Saltos",
                provincia: "Río Negro",
                localidad: "Cinco Saltos",
                direccion: ""
            },

            {
                nombre: "Cipolletti",
                provincia: "Río Negro",
                localidad: "Cipolletti",
                direccion: ""
            }

        ]

    }

};

//=====================
// ELEMENTOS
//=====================

const btnOncity = document.getElementById("btnOncity");
const btnCredito = document.getElementById("btnCredito");

const txtCliente = document.getElementById("cliente");

const cmbSucursal = document.getElementById("sucursal");

const cmbProvincia = document.getElementById("provincia");

const cmbLocalidad = document.getElementById("localidad");

//=====================
// CARGAR SUCURSALES
//=====================

function cargarCliente(nombre){

    txtCliente.value = nombre;

    cmbSucursal.innerHTML = "";

    clientes[nombre].sucursales.forEach(s=>{

        const op = document.createElement("option");

        op.value = s.nombre;

        op.textContent = s.nombre;

        cmbSucursal.appendChild(op);

    });

    cargarDatosSucursal();

}

//=====================
// CARGAR DATOS
//=====================

function cargarDatosSucursal(){

    const nombreCliente = txtCliente.value;

    const nombreSucursal = cmbSucursal.value;

    const datos = clientes[nombreCliente]
        .sucursales
        .find(x=>x.nombre===nombreSucursal);

    if(!datos) return;

    cmbProvincia.innerHTML =
        `<option>${datos.provincia}</option>`;

    cmbLocalidad.innerHTML =
        `<option>${datos.localidad}</option>`;

}

//=====================
// EVENTOS
//=====================

btnOncity.onclick = ()=>{

    cargarCliente("ON CITY");

}

btnCredito.onclick = ()=>{

    cargarCliente("CRÉDITO ARGENTINO");

}

cmbSucursal.onchange = cargarDatosSucursal;
//==================================================
// PARTE 2
// Materiales y Mano de Obra
//==================================================

// AGREGAR MATERIAL
function agregarMaterial(){

    const tbody = document.getElementById("materialesBody");

    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td><input type="text"></td>
        <td><input type="number" value="1" min="1" oninput="calcularTodo()"></td>
        <td><input type="number" value="0" min="0" oninput="calcularTodo()"></td>
        <td class="subtotal">$0</td>
        <td><button onclick="eliminarFila(this)">🗑</button></td>
    `;

    calcularTodo();
}

// AGREGAR MANO DE OBRA
function agregarMano(){

    const tbody = document.getElementById("manoBody");

    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td><input type="text"></td>
        <td><input type="number" value="1" min="1" oninput="calcularTodo()"></td>
        <td><input type="number" value="0" min="0" oninput="calcularTodo()"></td>
        <td class="subtotal">$0</td>
        <td><button onclick="eliminarFila(this)">🗑</button></td>
    `;

    calcularTodo();
}

// ELIMINAR FILA
function eliminarFila(btn){

    btn.closest("tr").remove();

    calcularTodo();

}

// CALCULAR TABLA
function calcularTabla(id){

    let total = 0;

    document.querySelectorAll(`#${id} tr`).forEach(fila=>{

        const cantidad =
        Number(fila.cells[1].querySelector("input").value);

        const precio =
        Number(fila.cells[2].querySelector("input").value);

        const subtotal = cantidad * precio;

        fila.cells[3].textContent =
        "$ " + subtotal.toLocaleString("es-AR");

        total += subtotal;

    });

    return total;

}
//==================================================
// PARTE 3
// Viáticos - Hospedaje - Total - PDF - WhatsApp
//==================================================

// CALCULAR TODO
function calcularTodo(){

    const materiales = calcularTabla("materialesBody");
    const mano = calcularTabla("manoBody");

    const km = Number(document.getElementById("km").value || 0);
    const tarifa = Number(document.getElementById("tarifa").value || 570);

    const viaticos = km * tarifa;

    document.getElementById("viaticos").value = viaticos;

    const dias = Number(document.getElementById("dias").value || 0);
    const valorDia = Number(document.getElementById("valorDia").value || 60000);

    const hospedaje = dias * valorDia;

    document.getElementById("hospedajeTotal").value = hospedaje;

    const total = materiales + mano + viaticos + hospedaje;

    document.getElementById("totalGeneral").innerHTML =
        "$ " + total.toLocaleString("es-AR");

}

// GENERAR PDF
function generarPDF(){

    window.print();

}

// WHATSAPP
function enviarWhatsApp(){

    const cliente =
        document.getElementById("cliente").value;

    const sucursal =
        document.getElementById("sucursal").value;

    const total =
        document.getElementById("totalGeneral").innerText;

    const mensaje =

`*ALBE SERVICIOS GENERALES*

Cliente: ${cliente}
Sucursal: ${sucursal}

Total Presupuesto: ${total}

Gracias por confiar en nosotros.`;

    window.open(
        "https://wa.me/?text=" +
        encodeURIComponent(mensaje),
        "_blank"
    );

}

// BOTONES
document.getElementById("btnPDF").onclick = generarPDF;
document.getElementById("btnWhatsapp").onclick = enviarWhatsApp;

// CALCULAR AL CAMBIAR
["km","tarifa","dias","valorDia"].forEach(id=>{

    const campo = document.getElementById(id);

    if(campo){

        campo.addEventListener("input",calcularTodo);

    }

});

// INICIO
window.onload = function(){

    agregarMaterial();
    agregarMano();

    calcularTodo();

};//==================================================
// PARTE 4
// Guardar - Buscar - Nuevo Presupuesto
//==================================================

// GUARDAR PRESUPUESTO
function guardarPresupuesto(){

    const presupuesto = {

        agenda: document.getElementById("agenda").value,

        fecha: document.getElementById("fecha").value,

        cliente: document.getElementById("cliente").value,

        sucursal: document.getElementById("sucursal").value,

        provincia: document.getElementById("provincia").value,

        localidad: document.getElementById("localidad").value,

        lugar: document.getElementById("lugar").value,

        supervisor: document.getElementById("supervisor").value,

        descripcion: document.getElementById("descripcion").value,

        total: document.getElementById("totalGeneral").innerText

    };

    let lista =
        JSON.parse(localStorage.getItem("presupuestos")) || [];

    lista.push(presupuesto);

    localStorage.setItem(
        "presupuestos",
        JSON.stringify(lista)
    );

    alert("Presupuesto guardado correctamente.");

}

// BUSCAR PRESUPUESTO
function buscarPresupuesto(){

    const agenda = prompt("Ingrese el N° de Agenda");

    if(!agenda) return;

    let lista =
        JSON.parse(localStorage.getItem("presupuestos")) || [];

    const encontrado =
        lista.find(x => x.agenda === agenda);

    if(!encontrado){

        alert("No se encontró el presupuesto.");

        return;

    }

    document.getElementById("agenda").value =
        encontrado.agenda;

    document.getElementById("fecha").value =
        encontrado.fecha;

    document.getElementById("cliente").value =
        encontrado.cliente;

    document.getElementById("lugar").value =
        encontrado.lugar;

    document.getElementById("supervisor").value =
        encontrado.supervisor;

    document.getElementById("descripcion").value =
        encontrado.descripcion;

    document.getElementById("totalGeneral").innerHTML =
        encontrado.total;

}

// NUEVO PRESUPUESTO
function nuevoPresupuesto(){

    if(confirm("¿Desea comenzar un presupuesto nuevo?")){

        location.reload();

    }

}

// BOTONES
document.getElementById("btnGuardar").onclick =
guardarPresupuesto;

document.getElementById("btnBuscar").onclick =
buscarPresupuesto;

document.getElementById("btnNuevo").onclick =
nuevoPresupuesto;
