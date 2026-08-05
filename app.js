// =====================================
// ALBE SERVICIOS GENERALES
// APP.JS
// =====================================

// Fecha y hora
function actualizarFechaHora() {

    const ahora = new Date();

    const opciones = {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    };

    const fechaHora = document.getElementById("fechaHora");

    if (fechaHora) {
        fechaHora.innerHTML =
            ahora.toLocaleDateString("es-AR", opciones);
    }

}

setInterval(actualizarFechaHora, 1000);
actualizarFechaHora();

// Botones del menú
const btnNuevo = document.getElementById("btnNuevo");
const btnClientes = document.getElementById("btnClientes");
const btnHistorial = document.getElementById("btnHistorial");
const btnConfiguracion = document.getElementById("btnConfiguracion");
const btnSalir = document.getElementById("btnSalir");

if (btnNuevo) {
    btnNuevo.onclick = () => location.href = "presupuesto.html";
}

if (btnClientes) {
    btnClientes.onclick = () => location.href = "clientes.html";
}

if (btnHistorial) {
    btnHistorial.onclick = () => location.href = "historial.html";
}

if (btnConfiguracion) {
    btnConfiguracion.onclick = () => location.href = "configuracion.html";
}

if (btnSalir) {
    btnSalir.onclick = () => {
        localStorage.removeItem("login");
        location.href = "login.html";
    };
}
