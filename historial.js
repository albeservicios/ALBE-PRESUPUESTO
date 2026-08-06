// =====================================
// ALBE SERVICIOS GENERALES
// HISTORIAL.JS
// PARTE 1
// =====================================

let presupuestos = [];
let presupuestoSeleccionado = -1;

function cargarHistorial(){

    presupuestos =
    JSON.parse(localStorage.getItem("presupuestos")) || [];

    mostrarHistorial();

}

function mostrarHistorial(){

    const tbody =
    document.getElementById("historialBody");

    tbody.innerHTML = "";

    presupuestos.forEach((p,indice)=>{

        tbody.innerHTML += `
        <tr onclick="seleccionarPresupuesto(${indice})">

            <td>${p.agenda}</td>
            <td>${p.fecha}</td>
            <td>${p.empresa}</td>
            <td>${p.sucursal}</td>
            <td>${p.provincia}</td>
            <td>${p.localidad}</td>
            <td>${p.total}</td>

        </tr>
        `;

    });

}

function seleccionarPresupuesto(indice){

    presupuestoSeleccionado = indice;

}

window.addEventListener("load",cargarHistorial);
// =====================================
// PARTE 2
// BUSCAR - ELIMINAR
// =====================================

// Buscar presupuestos
document.getElementById("buscar").addEventListener("input", function(){

    const texto = this.value.toLowerCase();

    const tbody = document.getElementById("historialBody");

    tbody.innerHTML = "";

    presupuestos
    .filter(p =>

        p.agenda.toLowerCase().includes(texto) ||

        p.empresa.toLowerCase().includes(texto) ||

        p.sucursal.toLowerCase().includes(texto) ||

        p.localidad.toLowerCase().includes(texto)

    )
    .forEach((p, indice) => {

        tbody.innerHTML += `

        <tr onclick="seleccionarPresupuesto(${indice})">

            <td>${p.agenda}</td>
            <td>${p.fecha}</td>
            <td>${p.empresa}</td>
            <td>${p.sucursal}</td>
            <td>${p.provincia}</td>
            <td>${p.localidad}</td>
            <td>${p.total}</td>

        </tr>

        `;

    });

});

// Eliminar presupuesto
document.getElementById("btnEliminar").addEventListener("click",()=>{

    if(presupuestoSeleccionado < 0){

        alert("Seleccione un presupuesto.");

        return;

    }

    if(confirm("¿Desea eliminar este presupuesto?")){

        presupuestos.splice(presupuestoSeleccionado,1);

        localStorage.setItem(
            "presupuestos",
            JSON.stringify(presupuestos)
        );

        presupuestoSeleccionado = -1;

        mostrarHistorial();

    }

});
// =====================================
// PARTE 3
// ABRIR - DUPLICAR - IMPRIMIR
// =====================================

// Abrir presupuesto
document.getElementById("btnAbrir").addEventListener("click",()=>{

    if(presupuestoSeleccionado < 0){

        alert("Seleccione un presupuesto.");

        return;

    }

    localStorage.setItem(
        "presupuestoActual",
        JSON.stringify(
            presupuestos[presupuestoSeleccionado]
        )
    );

    location.href="presupuesto.html";

});

// Duplicar presupuesto
document.getElementById("btnDuplicar").addEventListener("click",()=>{

    if(presupuestoSeleccionado < 0){

        alert("Seleccione un presupuesto.");

        return;

    }

    const copia = {

        ...presupuestos[presupuestoSeleccionado],

        agenda:""

    };

    presupuestos.push(copia);

    localStorage.setItem(
        "presupuestos",
        JSON.stringify(presupuestos)
    );

    mostrarHistorial();

    alert("Presupuesto duplicado.");

});

// Imprimir
document.getElementById("btnImprimir").addEventListener("click",()=>{

    window.print();

});
