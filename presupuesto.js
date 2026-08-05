// ===========================================
// ALBE SERVICIOS GENERALES
// PRESUPUESTO.JS
// PARTE 1
// Materiales y Mano de Obra
// ===========================================

function agregarMaterial(){

    const tbody=document.getElementById("materialesBody");

    const fila=tbody.insertRow();

    fila.innerHTML=`
    <td><input type="text" placeholder="Descripción"></td>

    <td><input type="number" value="1" min="1"
    oninput="calcularTodo()"></td>

    <td><input type="number" value="0" min="0"
    oninput="calcularTodo()"></td>

    <td class="subtotal">$ 0</td>

    <td>
    <button onclick="eliminarFila(this)">
    ❌
    </button>
    </td>
    `;

    calcularTodo();

}

function agregarMano(){

    const tbody=document.getElementById("manoBody");

    const fila=tbody.insertRow();

    fila.innerHTML=`
    <td><input type="text" placeholder="Trabajo"></td>

    <td><input type="number" value="1" min="1"
    oninput="calcularTodo()"></td>

    <td><input type="number" value="0" min="0"
    oninput="calcularTodo()"></td>

    <td class="subtotal">$ 0</td>

    <td>
    <button onclick="eliminarFila(this)">
    ❌
    </button>
    </td>
    `;

    calcularTodo();

}

function eliminarFila(boton){

    boton.closest("tr").remove();

    calcularTodo();

}

function calcularTabla(id){

    let total=0;

    document.querySelectorAll(`#${id} tr`).forEach(fila=>{

        const cantidad=
        Number(fila.cells[1].querySelector("input").value);

        const precio=
        Number(fila.cells[2].querySelector("input").value);

        const subtotal=cantidad*precio;

        fila.cells[3].innerHTML=
        "$ "+subtotal.toLocaleString("es-AR");

        total+=subtotal;

    });

    return total;

}

window.onload=function(){

    agregarMaterial();

    agregarMano();

}
// ===========================================
// PARTE 2
// VIÁTICOS - HOSPEDAJE - TOTALES
// ===========================================

function calcularTodo(){

    const totalMateriales =
        calcularTabla("materialesBody");

    const totalMano =
        calcularTabla("manoBody");

    document.getElementById("totalMateriales").innerHTML =
        "$ " + totalMateriales.toLocaleString("es-AR");

    document.getElementById("totalMano").innerHTML =
        "$ " + totalMano.toLocaleString("es-AR");

    const km =
        Number(document.getElementById("km").value || 0);

    const tarifa =
        Number(document.getElementById("tarifa").value || 570);

    const viaticos = km * tarifa;

    document.getElementById("viaticos").value =
        viaticos;

    const dias =
        Number(document.getElementById("dias").value || 0);

    const valorDia =
        Number(document.getElementById("valorDia").value || 60000);

    const hospedaje =
        dias * valorDia;

    document.getElementById("hospedajeTotal").value =
        hospedaje;

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
// ===========================================
// PARTE 3
// GUARDAR PRESUPUESTOS
// ===========================================

// Número automático
function generarNumeroPresupuesto(){

    let numero =
    Number(localStorage.getItem("ultimoPresupuesto")) || 1;

    document.getElementById("agenda").value =
    "ALBE-" + String(numero).padStart(6,"0");

}

// Fecha automática
function cargarFecha(){

    const hoy = new Date();

    document.getElementById("fecha").value =
    hoy.toISOString().split("T")[0];

}

// Guardar presupuesto
function guardarPresupuesto(){

    const presupuesto = {

        agenda:document.getElementById("agenda").value,
        fecha:document.getElementById("fecha").value,

        empresa:document.getElementById("empresa").value,
        sucursal:document.getElementById("sucursal").value,
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
    Number(localStorage.getItem("ultimoPresupuesto")) || 1;

    numero++;

    localStorage.setItem(
        "ultimoPresupuesto",
        numero
    );

    alert("Presupuesto guardado correctamente.");

    generarNumeroPresupuesto();

}

// Al iniciar
window.addEventListener("load",()=>{

    generarNumeroPresupuesto();

    cargarFecha();

});

// Botón guardar
document.getElementById("btnGuardar")
.addEventListener("click",guardarPresupuesto);
// ===========================================
// PARTE 4
// PDF - WHATSAPP - NUEVO PRESUPUESTO
// ===========================================

// Generar PDF
function generarPDF(){

    window.print();

}

// Enviar WhatsApp
function enviarWhatsApp(){

    const empresa = document.getElementById("empresa").value;
    const sucursal = document.getElementById("sucursal").value;
    const total = document.getElementById("totalGeneral").innerText;

    const mensaje =
`*ALBE SERVICIOS GENERALES*

Presupuesto: ${document.getElementById("agenda").value}
