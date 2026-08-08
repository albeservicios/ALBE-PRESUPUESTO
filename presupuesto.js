// ==========================================
// ALBE PRESUPUESTOS V3.0
// PARTE 1
// ==========================================

// Datos del sistema
let clientes = [];
let materiales = [];
let manoObra = [];

// Totales
let totalMateriales = 0;
let totalMano = 0;
let totalViaticos = 0;
let totalHospedaje = 0;

// ===============================
// PESTAÑAS
// ===============================

function abrirPestana(id){

    document.querySelectorAll(".tabcontent")
        .forEach(p => p.style.display = "none");

    const pestaña = document.getElementById(id);

    if(pestaña){
        pestaña.style.display = "block";
    }

}

// ===============================
// INICIO
// ===============================

document.addEventListener("DOMContentLoaded",()=>{

    abrirPestana("cliente");

    generarNumero();

    cargarFecha();

    cargarClientes();

});
// ==========================================
// PARTE 2
// FECHA - NÚMERO - CLIENTES
// ==========================================

// Fecha actual
function cargarFecha(){

    const fecha = document.getElementById("fecha");

    if(fecha){

        const hoy = new Date();

        fecha.value = hoy.toISOString().split("T")[0];

    }

}

// Número automático
function generarNumero(){

    let numero =
    localStorage.getItem("ultimoPresupuesto");

    if(!numero){

        numero = 1;

    }else{

        numero = parseInt(numero)+1;

    }

    localStorage.setItem(
        "ultimoPresupuesto",
        numero
    );

    const agenda =
    document.getElementById("agenda");

    if(agenda){

        agenda.value =
        "ALBE-" +
        String(numero).padStart(6,"0");

    }

}

// Cargar clientes
function cargarClientes(){

    clientes =
    JSON.parse(localStorage.getItem("clientes")) || [];

    const combo =
    document.getElementById("clienteSelect");

    if(!combo) return;

    combo.innerHTML =
    '<option value="">Seleccione un cliente...</option>';

    clientes.forEach((cliente,indice)=>{

        combo.innerHTML +=
        `<option value="${indice}">
        ${cliente.empresa} - ${cliente.sucursal}
        </option>`;

    });

    combo.addEventListener(
        "change",
        completarCliente
    );

}

// Completar datos
function completarCliente(){

    const indice =
    document.getElementById("clienteSelect").value;

    if(indice==="") return;

    const c = clientes[indice];

    document.getElementById("empresa").value =
    c.empresa || "";

    document.getElementById("sucursal").value =
    c.sucursal || "";

    document.getElementById("contacto").value =
    c.contacto || "";

    document.getElementById("telefono").value =
    c.telefono || "";

    document.getElementById("correo").value =
    c.correo || "";

    document.getElementById("provincia").value =
    c.provincia || "";

    document.getElementById("localidad").value =
    c.localidad || "";

    document.getElementById("direccion").value =
    c.direccion || "";

}
// ==========================================
// PARTE 3
// MATERIALES Y MANO DE OBRA
// ==========================================

function agregarMaterial() {

    const tbody = document.getElementById("materialesBody");

    if (!tbody) return;

    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td><input type="text" placeholder="Material"></td>
        <td><input type="text" placeholder="Unidad"></td>
        <td><input type="number" value="1" min="1" onchange="calcularTotales()"></td>
        <td><input type="number" value="0" min="0" onchange="calcularTotales()"></td>
        <td class="subtotal">$ 0</td>
        <td><button type="button" onclick="eliminarFila(this)">❌</button></td>
    `;

}

function agregarMano() {

    const tbody = document.getElementById("manoBody");

    if (!tbody) return;

    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td><input type="text" placeholder="Trabajo"></td>
        <td><input type="text" placeholder="Unidad"></td>
        <td><input type="number" value="1" min="1" onchange="calcularTotales()"></td>
        <td><input type="number" value="0" min="0" onchange="calcularTotales()"></td>
        <td class="subtotal">$ 0</td>
        <td><button type="button" onclick="eliminarFila(this)">❌</button></td>
    `;

}

function eliminarFila(btn) {

    btn.closest("tr").remove();

    calcularTotales();

}

document.addEventListener("DOMContentLoaded", () => {

    const btnMaterial = document.getElementById("agregarMaterial");

    if (btnMaterial) {
        btnMaterial.addEventListener("click", agregarMaterial);
    }

    const btnMano = document.getElementById("agregarMano");

    if (btnMano) {
        btnMano.addEventListener("click", agregarMano);
    }

});
// ==========================================
// PARTE 4
// CÁLCULO DE TOTALES
// ==========================================

function calcularTotales() {

    totalMateriales = 0;
    totalMano = 0;

    // Materiales
    document.querySelectorAll("#materialesBody tr").forEach(fila => {

        const cantidad = Number(fila.cells[2].querySelector("input").value) || 0;
        const precio = Number(fila.cells[3].querySelector("input").value) || 0;

        const subtotal = cantidad * precio;

        fila.cells[4].textContent =
            "$ " + subtotal.toLocaleString("es-AR");

        totalMateriales += subtotal;

    });

    // Mano de obra
    document.querySelectorAll("#manoBody tr").forEach(fila => {

        const cantidad = Number(fila.cells[2].querySelector("input").value) || 0;
        const precio = Number(fila.cells[3].querySelector("input").value) || 0;

        const subtotal = cantidad * precio;

        fila.cells[4].textContent =
            "$ " + subtotal.toLocaleString("es-AR");

        totalMano += subtotal;

    });

    // Viáticos
    const km = Number(document.getElementById("km")?.value || 0);
    const tarifa = Number(document.getElementById("tarifa")?.value || 570);

    totalViaticos = km * tarifa;

    const campoViaticos = document.getElementById("viaticos");

    if (campoViaticos) {
        campoViaticos.value = totalViaticos;
    }

    // Hospedaje
    const dias = Number(document.getElementById("dias")?.value || 0);
    const valorDia = Number(document.getElementById("valorDia")?.value || 60000);

    totalHospedaje = dias * valorDia;

    const campoHospedaje = document.getElementById("hospedajeTotal");

    if (campoHospedaje) {
        campoHospedaje.value = totalHospedaje;
    }

    // Mostrar totales
    document.getElementById("totalMateriales").textContent =
        "$ " + totalMateriales.toLocaleString("es-AR");

    document.getElementById("totalMano").textContent =
        "$ " + totalMano.toLocaleString("es-AR");

    document.getElementById("totalMaterialesResumen").value =
        "$ " + totalMateriales.toLocaleString("es-AR");

    document.getElementById("totalManoResumen").value =
        "$ " + totalMano.toLocaleString("es-AR");

    document.getElementById("totalViaticosResumen").value =
        "$ " + totalViaticos.toLocaleString("es-AR");

    document.getElementById("totalHospedajeResumen").value =
        "$ " + totalHospedaje.toLocaleString("es-AR");

    const totalGeneral =
        totalMateriales +
        totalMano +
        totalViaticos +
        totalHospedaje;

    document.getElementById("totalGeneral").value =
        "$ " + totalGeneral.toLocaleString("es-AR");

}
// ==========================================
// PARTE 5
// GUARDAR PRESUPUESTO
// ==========================================

function guardarPresupuesto() {

    calcularTotales();

    const presupuesto = {

        agenda: document.getElementById("agenda").value,
        fecha: document.getElementById("fecha").value,
        estado: document.getElementById("estado").value,

        empresa: document.getElementById("empresa").value,
        sucursal: document.getElementById("sucursal").value,
        contacto: document.getElementById("contacto").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        provincia: document.getElementById("provincia").value,
        localidad: document.getElementById("localidad").value,
        direccion: document.getElementById("direccion").value,

        proveedor: document.getElementById("proveedorEmpresa").value,
        supervisor: document.getElementById("supervisor").value,

        totalMateriales,
        totalMano,
        totalViaticos,
        totalHospedaje,

        totalGeneral: document.getElementById("totalGeneral").value,

        observaciones: document.getElementById("observaciones").value

    };

    let historial =
        JSON.parse(localStorage.getItem("presupuestos")) || [];

    historial.push(presupuesto);

    localStorage.setItem(
        "presupuestos",
        JSON.stringify(historial)
    );

    alert("✅ Presupuesto guardado correctamente.");

}

document.addEventListener("DOMContentLoaded", () => {

    const btnGuardar = document.getElementById("btnGuardar");

    if (btnGuardar) {

        btnGuardar.addEventListener("click", guardarPresupuesto);

    }

});
// ==========================================
// PARTE 6
// PDF + WHATSAPP
// ==========================================

// PDF Profesional
async function generarPDF() {

    calcularTotales();

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF("p", "mm", "a4");

    // Logo
    try{
        doc.addImage("img/logo.png","PNG",10,10,25,25);
    }catch(e){}

    doc.setFont("helvetica","bold");
    doc.setFontSize(18);
    doc.text("ALBE SERVICIOS GENERALES",105,18,{align:"center"});

    doc.setFontSize(12);
    doc.text("PRESUPUESTO",105,26,{align:"center"});

    doc.line(10,35,200,35);

    doc.setFont("helvetica","normal");

    doc.text("N°: " + document.getElementById("agenda").value,10,45);
    doc.text("Fecha: " + document.getElementById("fecha").value,140,45);

    doc.text("Empresa: " + document.getElementById("empresa").value,10,55);
    doc.text("Sucursal: " + document.getElementById("sucursal").value,10,63);
    doc.text("Localidad: " + document.getElementById("localidad").value,10,71);

    doc.line(10,78,200,78);

    doc.setFont("helvetica","bold");
    doc.text("RESUMEN",10,88);

    doc.setFont("helvetica","normal");

    doc.text("Materiales: " + document.getElementById("totalMaterialesResumen").value,10,98);

    doc.text("Mano de Obra: " + document.getElementById("totalManoResumen").value,10,106);

    doc.text("Viáticos: " + document.getElementById("totalViaticosResumen").value,10,114);

    doc.text("Hospedaje: " + document.getElementById("totalHospedajeResumen").value,10,122);

    doc.setFont("helvetica","bold");
    doc.setFontSize(16);

    doc.text(
        "TOTAL: " + document.getElementById("totalGeneral").value,
        10,
        140
    );

    doc.save(
        document.getElementById("agenda").value + ".pdf"
    );

}

// WhatsApp
function enviarWhatsApp(){

    calcularTotales();

    const mensaje =
`*ALBE SERVICIOS GENERALES*

Presupuesto: ${document.getElementById("agenda").value}

Empresa: ${document.getElementById("empresa").value}

Sucursal: ${document.getElementById("sucursal").value}

Total: ${document.getElementById("totalGeneral").value}`;

    window.open(
        "https://wa.me/?text=" +
        encodeURIComponent(mensaje),
        "_blank"
    );

}

document.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("btnPDF")
        ?.addEventListener("click",generarPDF);

    document.getElementById("btnWhatsapp")
        ?.addEventListener("click",enviarWhatsApp);

});
// ==========================================
// PARTE 7
// INICIALIZACIÓN GENERAL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // Primera pestaña
    abrirPestana("cliente");

    // Eventos de pestañas
    document.querySelectorAll(".tablink").forEach(btn => {

        btn.addEventListener("click", function(){

            const destino =
                this.getAttribute("onclick")
                    .match(/'([^']+)'/);

            if(destino){

                abrirPestana(destino[1]);

            }

        });

    });

    // Botón Nuevo
    document.getElementById("btnNuevo")?.addEventListener("click",()=>{

        if(confirm("¿Desea crear un nuevo presupuesto?")){

            location.reload();

        }

    });

    // Calcular automáticamente al modificar viáticos
    ["km","tarifa","dias","valorDia"].forEach(id=>{

        const campo = document.getElementById(id);

        if(campo){

            campo.addEventListener("input",calcularTotales);

        }

    });

    // Crear una fila inicial
    agregarMaterial();
    agregarMano();

    // Primer cálculo
    calcularTotales();

});
// ==========================================
// ALBE PRESUPUESTOS V4.0
// CONEXIÓN CLIENTE → PRESUPUESTO
// PARTE 5B
// ==========================================

function conectarClientePresupuesto() {

    const empresaCliente =
        document.getElementById("empresaCliente");

    const provinciaCliente =
        document.getElementById("provinciaCliente");

    const localidadCliente =
        document.getElementById("localidadCliente");

    const sucursalCliente =
        document.getElementById("sucursalCliente");

    if (!empresaCliente) return;

    function actualizarEmpresa() {

        const opcion =
            empresaCliente.selectedOptions[0];

        document.getElementById("empresa").value =
            opcion ? opcion.textContent.trim() : "";

        document.getElementById("provincia").value = "";
        document.getElementById("localidad").value = "";
        document.getElementById("sucursal").value = "";
        document.getElementById("direccion").value = "";
        document.getElementById("telefono").value = "";

    }

    function actualizarProvincia() {

        document.getElementById("provincia").value =
            provinciaCliente.value || "";

        document.getElementById("localidad").value = "";
        document.getElementById("sucursal").value = "";
        document.getElementById("direccion").value = "";
        document.getElementById("telefono").value = "";

    }

    function actualizarLocalidad() {

        document.getElementById("localidad").value =
            localidadCliente.value || "";

        document.getElementById("sucursal").value = "";
        document.getElementById("direccion").value = "";
        document.getElementById("telefono").value = "";

    }

    function actualizarSucursal() {

        if (!sucursalCliente.value) {

            document.getElementById("sucursal").value = "";
            document.getElementById("direccion").value = "";
            document.getElementById("telefono").value = "";

            return;
        }

        try {

            const datos =
                JSON.parse(sucursalCliente.value);

            document.getElementById("sucursal").value =
                datos.sucursal || "";

            document.getElementById("direccion").value =
                datos.direccion || "";

            document.getElementById("telefono").value =
                datos.telefono || "";

        } catch (error) {

            console.error(
                "Error leyendo datos de sucursal:",
                error
            );

        }

    }

    empresaCliente.addEventListener(
        "change",
        actualizarEmpresa
    );

    provinciaCliente.addEventListener(
        "change",
        actualizarProvincia
    );

    localidadCliente.addEventListener(
        "change",
        actualizarLocalidad
    );

    sucursalCliente.addEventListener(
        "change",
        actualizarSucursal
    );

}


// ==========================================
// INICIO CONEXIÓN CLIENTE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    conectarClientePresupuesto
);// ==========================================
// ALBE PRESUPUESTOS V4.0
// CONEXIÓN CLIENTE → PRESUPUESTO
// PARTE 5B
// ==========================================

function conectarClientePresupuesto() {

    const empresaCliente =
        document.getElementById("empresaCliente");

    const provinciaCliente =
        document.getElementById("provinciaCliente");

    const localidadCliente =
        document.getElementById("localidadCliente");

    const sucursalCliente =
        document.getElementById("sucursalCliente");

    if (!empresaCliente) return;

    function actualizarEmpresa() {

        const opcion =
            empresaCliente.selectedOptions[0];

        document.getElementById("empresa").value =
            opcion ? opcion.textContent.trim() : "";

        document.getElementById("provincia").value = "";
        document.getElementById("localidad").value = "";
        document.getElementById("sucursal").value = "";
        document.getElementById("direccion").value = "";
        document.getElementById("telefono").value = "";

    }

    function actualizarProvincia() {

        document.getElementById("provincia").value =
            provinciaCliente.value || "";

        document.getElementById("localidad").value = "";
        document.getElementById("sucursal").value = "";
        document.getElementById("direccion").value = "";
        document.getElementById("telefono").value = "";

    }

    function actualizarLocalidad() {

        document.getElementById("localidad").value =
            localidadCliente.value || "";

        document.getElementById("sucursal").value = "";
        document.getElementById("direccion").value = "";
        document.getElementById("telefono").value = "";

    }

    function actualizarSucursal() {

        if (!sucursalCliente.value) {

            document.getElementById("sucursal").value = "";
            document.getElementById("direccion").value = "";
            document.getElementById("telefono").value = "";

            return;
        }

        try {

            const datos =
                JSON.parse(sucursalCliente.value);

            document.getElementById("sucursal").value =
                datos.sucursal || "";

            document.getElementById("direccion").value =
                datos.direccion || "";

            document.getElementById("telefono").value =
                datos.telefono || "";

        } catch (error) {

            console.error(
                "Error leyendo datos de sucursal:",
                error
            );

        }

    }

    empresaCliente.addEventListener(
        "change",
        actualizarEmpresa
    );

    provinciaCliente.addEventListener(
        "change",
        actualizarProvincia
    );

    localidadCliente.addEventListener(
        "change",
        actualizarLocalidad
    );

    sucursalCliente.addEventListener(
        "change",
        actualizarSucursal
    );

}


// ==========================================
// INICIO CONEXIÓN CLIENTE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    conectarClientePresupuesto
);
console.log("ALBE PRESUPUESTOS V3.0 cargado correctamente.");

