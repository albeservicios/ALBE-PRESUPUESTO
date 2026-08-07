// ==========================================
// ALBE SERVICIOS GENERALES
// PRESUPUESTO.JS V2.0
// PARTE 1
// ==========================================

// Datos
let clientes = [];
let materiales = [];
let manoObra = [];

// Cargar clientes
function cargarClientes(){

    clientes =
    JSON.parse(localStorage.getItem("clientes")) || [];

    const combo =
    document.getElementById("cliente");

    if(!combo) return;

    combo.innerHTML =
    '<option value="">Seleccione un cliente...</option>';

    clientes.forEach((c,i)=>{

        combo.innerHTML +=
        `<option value="${i}">
        ${c.empresa} - ${c.sucursal}
        </option>`;

    });

}

// Completar datos
function seleccionarCliente(){

    const indice =
    document.getElementById("cliente").value;

    if(indice==="") return;

    const c = clientes[indice];

    document.getElementById("empresa").value = c.empresa;
    document.getElementById("sucursal").value = c.sucursal;
    document.getElementById("contacto").value = c.contacto;
    document.getElementById("provincia").value = c.provincia;
    document.getElementById("localidad").value = c.localidad;
    document.getElementById("direccion").value = c.direccion;

}

// Inicio
window.onload=function(){

    cargarClientes();

    const cliente =
    document.getElementById("cliente");

    if(cliente){

        cliente.addEventListener(
            "change",
            seleccionarCliente
        );

    }

};
// ==========================================
// PARTE 2
// MATERIALES Y MANO DE OBRA
// ==========================================

function agregarMaterial(){

    const tbody =
    document.getElementById("materialesBody");

    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td><input type="text" placeholder="Descripción"></td>
        <td><input type="number" value="1" min="1" oninput="calcularTodo()"></td>
        <td><input type="number" value="0" min="0" oninput="calcularTodo()"></td>
        <td class="subtotal">$ 0</td>
        <td><button onclick="eliminarFila(this)">❌</button></td>
    `;

    calcularTodo();

}

function agregarMano(){

    const tbody =
    document.getElementById("manoBody");

    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td><input type="text" placeholder="Trabajo"></td>
        <td><input type="number" value="1" min="1" oninput="calcularTodo()"></td>
        <td><input type="number" value="0" min="0" oninput="calcularTodo()"></td>
        <td class="subtotal">$ 0</td>
        <td><button onclick="eliminarFila(this)">❌</button></td>
    `;

    calcularTodo();

}

function eliminarFila(boton){

    boton.closest("tr").remove();

    calcularTodo();

}

function calcularTabla(idTabla){

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

    return total;

}

window.addEventListener("load",()=>{

    const btnMaterial =
    document.getElementById("agregarMaterial");

    if(btnMaterial){

        btnMaterial.onclick = agregarMaterial;

    }

    const btnMano =
    document.getElementById("agregarMano");

    if(btnMano){

        btnMano.onclick = agregarMano;

    }

    agregarMaterial();
    agregarMano();

});
// ==========================================
// PARTE 3
// TOTALES - VIÁTICOS - HOSPEDAJE
// ==========================================

function calcularTodo(){

    const totalMateriales = calcularTabla("materialesBody");
    const totalMano = calcularTabla("manoBody");

    document.getElementById("totalMateriales").innerHTML =
        "$ " + totalMateriales.toLocaleString("es-AR");

    document.getElementById("totalMano").innerHTML =
        "$ " + totalMano.toLocaleString("es-AR");

    const km = Number(document.getElementById("km").value || 0);
    const tarifa = Number(document.getElementById("tarifa").value || 570);

    const viaticos = km * tarifa;

    document.getElementById("viaticos").value = viaticos;

    const dias = Number(document.getElementById("dias").value || 0);
    const valorDia = Number(document.getElementById("valorDia").value || 60000);

    const hospedaje = dias * valorDia;

    document.getElementById("hospedajeTotal").value = hospedaje;

    const totalGeneral =
        totalMateriales +
        totalMano +
        viaticos +
        hospedaje;

    document.getElementById("totalGeneral").innerHTML =
        "$ " + totalGeneral.toLocaleString("es-AR");

}

// Recalcular automáticamente
["km","tarifa","dias","valorDia"].forEach(id=>{

    const campo = document.getElementById(id);

    if(campo){

        campo.addEventListener("input",calcularTodo);

    }

});
// ==========================================
// PARTE 4
// GUARDAR - PDF - WHATSAPP
// ==========================================

// Número de presupuesto
function generarNumero(){

    let numero =
    Number(localStorage.getItem("ultimoNumero")) || 1;

    document.getElementById("agenda").value =
    "ALBE-" + String(numero).padStart(6,"0");

}

// Fecha actual
function cargarFecha(){

    const hoy = new Date();

    document.getElementById("fecha").value =
    hoy.toISOString().substring(0,10);

}

// Guardar presupuesto
function guardarPresupuesto(){

    const presupuesto = {

        agenda:document.getElementById("agenda").value,
        fecha:document.getElementById("fecha").value,

        empresa:document.getElementById("empresa").value,
        sucursal:document.getElementById("sucursal").value,
        contacto:document.getElementById("contacto").value,
        provincia:document.getElementById("provincia").value,
        localidad:document.getElementById("localidad").value,
        direccion:document.getElementById("direccion").value,

        supervisor:document.getElementById("supervisor").value,
        descripcion:document.getElementById("descripcion").value,
        observaciones:document.getElementById("observaciones").value,

        total:document.getElementById("totalGeneral").innerText

    };

    let lista =
    JSON.parse(localStorage.getItem("presupuestos")) || [];

    lista.push(presupuesto);

    localStorage.setItem(
        "presupuestos",
        JSON.stringify(lista)
    );

    let numero =
    Number(localStorage.getItem("ultimoNumero")) || 1;

    localStorage.setItem(
        "ultimoNumero",
        numero + 1
    );

    alert("Presupuesto guardado correctamente.");

    generarNumero();

}

// PDF
async function generarPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF("p", "mm", "a4");

    // Logo
    doc.addImage("img/logo.png", "PNG", 10, 8, 30, 30);

    // Empresa
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("ALBE SERVICIOS GENERALES", 105, 18, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("PRESUPUESTO", 105, 26, { align: "center" });

    // Línea
    doc.line(10, 40, 200, 40);

    // Datos
    doc.text("N°: " + document.getElementById("agenda").value, 10, 50);
    doc.text("Fecha: " + document.getElementById("fecha").value, 140, 50);

    doc.text("Empresa: " + document.getElementById("empresa").value, 10, 60);
    doc.text("Sucursal: " + document.getElementById("sucursal").value, 10, 68);
    doc.text("Provincia: " + document.getElementById("provincia").value, 10, 76);
    doc.text("Localidad: " + document.getElementById("localidad").value, 10, 84);

    doc.save(document.getElementById("agenda").value + ".pdf");

}
// WhatsApp
function enviarWhatsApp(){

    const mensaje =

`*ALBE SERVICIOS GENERALES*

Presupuesto:
${document.getElementById("agenda").value}

Empresa:
${document.getElementById("empresa").value}

Sucursal:
${document.getElementById("sucursal").value}

Total:
${document.getElementById("totalGeneral").innerText}`;

    window.open(

        "https://wa.me/?text=" +
        encodeURIComponent(mensaje),

        "_blank"

    );

}

// Eventos
window.addEventListener("load",()=>{

    generarNumero();

    cargarFecha();

    document.getElementById("btnGuardar").onclick =
    guardarPresupuesto;

    document.getElementById("btnPDF").onclick =
    generarPDF;

    document.getElementById("btnWhatsapp").onclick =
    enviarWhatsApp;

});
// ==========================================
// PARTE 8
// PESTAÑAS DEL SISTEMA
// ==========================================

function abrirPestana(nombre){

    const pestañas =
    document.querySelectorAll(".tabcontent");

    pestañas.forEach(p=>{

        p.style.display = "none";

    });

    const actual =
    document.getElementById(nombre);

    if(actual){

        actual.style.display = "block";

    }

}

// Mostrar la primera pestaña
window.addEventListener("load",()=>{

    abrirPestana("cliente");

});

// Nuevo presupuesto
const btnNuevo =
document.getElementById("btnNuevo");

if(btnNuevo){

    btnNuevo.addEventListener("click",()=>{

        if(confirm("¿Desea crear un nuevo presupuesto?")){

            location.reload();

        }

    });

}
