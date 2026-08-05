// =====================================
// PRESUPUESTO.JS - PARTE 1
// =====================================

let clientes = [];

// Cargar clientes
function cargarClientes() {

    clientes = JSON.parse(localStorage.getItem("clientes")) || [];

}

// Llenar selector
function cargarSelectorClientes() {

    const select = document.getElementById("cliente");

    if (!select) return;

    select.innerHTML =
        '<option value="">Seleccione un cliente...</option>';

    clientes.forEach((c, i) => {

        select.innerHTML += `
            <option value="${i}">
                ${c.empresa} - ${c.sucursal}
            </option>
        `;

    });

}

// Completar datos
function seleccionarCliente() {

    const indice =
        document.getElementById("cliente").value;

    if (indice === "") return;

    const c = clientes[indice];

    document.getElementById("empresa").value = c.empresa;
    document.getElementById("sucursal").value = c.sucursal;
    document.getElementById("provincia").value = c.provincia;
    document.getElementById("localidad").value = c.localidad;
    document.getElementById("direccion").value = c.direccion;

}

// Iniciar
window.addEventListener("load", () => {

    cargarClientes();

    cargarSelectorClientes();

});
// =====================================
// PRESUPUESTO.JS - PARTE 2
// Materiales y Mano de Obra
// =====================================

function agregarMaterial(){

    const tbody = document.getElementById("materialesBody");

    if(!tbody) return;

    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td><input type="text" placeholder="Descripción"></td>
        <td><input type="number" value="1" min="1" oninput="calcularTodo()"></td>
        <td><input type="number" value="0" min="0" oninput="calcularTodo()"></td>
        <td class="subtotal">$0</td>
        <td><button onclick="eliminarFila(this)">❌</button></td>
    `;

    calcularTodo();

}

function agregarMano(){

    const tbody = document.getElementById("manoBody");

    if(!tbody) return;

    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td><input type="text" placeholder="Trabajo realizado"></td>
        <td><input type="number" value="1" min="1" oninput="calcularTodo()"></td>
        <td><input type="number" value="0" min="0" oninput="calcularTodo()"></td>
        <td class="subtotal">$0</td>
        <td><button onclick="eliminarFila(this)">❌</button></td>
    `;

    calcularTodo();

}

function eliminarFila(btn){

    btn.closest("tr").remove();

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

    const btnMat =
        document.getElementById("agregarMaterial");

    if(btnMat)
        btnMat.addEventListener("click",agregarMaterial);

    const btnMano =
        document.getElementById("agregarMano");

    if(btnMano)
        btnMano.addEventListener("click",agregarMano);

});

// =====================================
// PRESUPUESTO.JS - PARTE 4
// Guardar - PDF - WhatsApp
// =====================================

// Guardar presupuesto
function guardarPresupuesto(){

    const presupuesto = {

        numero: document.getElementById("agenda")?.value || "",
        fecha: document.getElementById("fecha")?.value || "",
        empresa: document.getElementById("empresa")?.value || "",
        sucursal: document.getElementById("sucursal")?.value || "",
        provincia: document.getElementById("provincia")?.value || "",
        localidad: document.getElementById("localidad")?.value || "",
        direccion: document.getElementById("direccion")?.value || "",
        total: document.getElementById("totalGeneral")?.innerText || "$0"

    };

    const lista =
        JSON.parse(localStorage.getItem("presupuestos")) || [];

    lista.push(presupuesto);

    localStorage.setItem(
        "presupuestos",
        JSON.stringify(lista)
    );

    let ultimo =
        Number(localStorage.getItem("ultimoNumero")) || 1;

    ultimo++;

    localStorage.setItem("ultimoNumero", ultimo);

    alert("Presupuesto guardado correctamente.");

}

// PDF
function generarPDF(){

    window.print();

}

// WhatsApp
function enviarWhatsApp(){

    const empresa =
        document.getElementById("empresa")?.value || "";

    const sucursal =
        document.getElementById("sucursal")?.value || "";

    const total =
        document.getElementById("totalGeneral")?.innerText || "";

    const mensaje =
`*ALBE SERVICIOS GENERALES*

Empresa: ${empresa}
Sucursal: ${sucursal}

Total: ${total}`;

    window.open(
        "https://wa.me/?text="+
        encodeURIComponent(mensaje),
        "_blank"
    );

}

// Eventos
window.addEventListener("load",()=>{

    const btnGuardar =
        document.getElementById("btnGuardar");

    if(btnGuardar)
        btnGuardar.addEventListener("click",guardarPresupuesto);

    const btnPDF =
        document.getElementById("btnPDF");

    if(btnPDF)
        btnPDF.addEventListener("click",generarPDF);

    const btnWhatsapp =
        document.getElementById("btnWhatsapp");

    if(btnWhatsapp)
        btnWhatsapp.addEventListener("click",enviarWhatsApp);

});
