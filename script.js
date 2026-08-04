<button id="btnOncity">ON CITY</button>

<button id="btnCredito">CRÉDITO ARGENTINO</button>
function agregarMaterial() {
    const tbody = document.getElementById("materialesBody");

    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td><input type="text"></td>
        <td><input type="number" value="1" oninput="calcularTodo()"></td>
        <td><input type="number" value="0" oninput="calcularTodo()"></td>
        <td class="subtotal">$0</td>
        <td><button onclick="eliminarFila(this)">❌</button></td>
    `;

    calcularTodo();
}

function agregarMano() {
    const tbody = document.getElementById("manoBody");

    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td><input type="text"></td>
        <td><input type="number" value="1" oninput="calcularTodo()"></td>
        <td><input type="number" value="0" oninput="calcularTodo()"></td>
        <td class="subtotal">$0</td>
        <td><button onclick="eliminarFila(this)">❌</button></td>
    `;

    calcularTodo();
}

function eliminarFila(btn) {
    btn.parentElement.parentElement.remove();
    calcularTodo();
}

function calcularTabla(id) {

    let total = 0;

    document.querySelectorAll(`#${id} tr`).forEach(fila => {

        const cantidad = Number(fila.cells[1].querySelector("input").value);
        const precio = Number(fila.cells[2].querySelector("input").value);

        const subtotal = cantidad * precio;

        fila.cells[3].textContent =
            "$" + subtotal.toLocaleString("es-AR");

        total += subtotal;

    });

    return total;
}

function calcularTodo() {

    const materiales = calcularTabla("materialesBody");

    const mano = calcularTabla("manoBody");

    const km = Number(document.getElementById("km").value);

    const tarifa = Number(document.getElementById("tarifa").value);

    const viaticos = km * tarifa;

    document.getElementById("viaticos").value = viaticos;

    const dias = Number(document.getElementById("dias").value);

    const valorDia = Number(document.getElementById("valorDia").value);

    const hospedaje = dias * valorDia;

    document.getElementById("hospedajeTotal").value = hospedaje;

    const total = materiales + mano + viaticos + hospedaje;

    document.getElementById("totalGeneral").innerHTML =
        "$" + total.toLocaleString("es-AR");

}

function generarPDF() {

    alert("La generación de PDF se agregará en la Parte 4.");

}

function enviarWhatsApp() {

    const cliente =
        document.getElementById("cliente").value;

    const total =
        document.getElementById("totalGeneral").innerText;

    const mensaje =
`Hola ${cliente}.
Adjuntamos el presupuesto.

TOTAL: ${total}

Albe Servicios Generales`;

    window.open(
        "https://wa.me/?text=" +
        encodeURIComponent(mensaje),
        "_blank"
    );

}

window.onload = function () {

    agregarMaterial();
    agregarMano();

};
