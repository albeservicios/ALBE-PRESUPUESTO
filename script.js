// ===== ALBE PRESUPUESTOS - PARTE 1 =====

window.onload = function () {

  document.getElementById("fecha").value =
    new Date().toISOString().split("T")[0];

  document
    .getElementById("btnAgregar")
    .addEventListener("click", agregarMaterial);

  document
    .getElementById("btnCalcular")
    .addEventListener("click", calcular);

};

function agregarMaterial() {

  const cuerpo =
    document.getElementById("cuerpoMateriales");

  const fila =
    document.createElement("tr");

  fila.innerHTML = `
<td><input type="text" placeholder="Material"></td>

<td><input type="number" value="1" min="1"></td>

<td><input type="number" value="0" min="0"></td>

<td class="subtotal">$0</td>

<td>
<button type="button" class="eliminar">🗑️</button>
</td>
`;

  cuerpo.appendChild(fila);

  fila.querySelectorAll("input").forEach(input => {

    input.addEventListener("input", actualizarMateriales);

  });

  fila
    .querySelector(".eliminar")
    .addEventListener("click", function () {

      fila.remove();

      actualizarMateriales();

    });

  actualizarMateriales();

}

function actualizarMateriales() {

  let totalMateriales = 0;

  document
    .querySelectorAll("#cuerpoMateriales tr")
    .forEach(fila => {

      const cantidad =
        Number(fila.cells[1].querySelector("input").value) || 0;

      const precio =
        Number(fila.cells[2].querySelector("input").value) || 0;

      const subtotal =
        cantidad * precio;

      fila.cells[3].inner
      // ===== ALBE PRESUPUESTOS - PARTE 2 =====

// Eventos
document.getElementById("btnWhatsApp")
  .addEventListener("click", compartirWhatsApp);

document.getElementById("btnPDF")
  .addEventListener("click", generarPDF);

// Compartir por WhatsApp
function compartirWhatsApp(){

  calcular();

  const mensaje =
`🏗️ ALBE SERVICIOS GENERALES

📋 PRESUPUESTO

Agenda: ${document.getElementById("agenda").value}
Fecha: ${document.getElementById("fecha").value}

Cliente: ${document.getElementById("cliente").value}
Sucursal: ${document.getElementById("sucursal").value}
Provincia: ${document.getElementById("provincia").value}
Localidad: ${document.getElementById("localidad").value}

Lugar:
${document.getElementById("lugar").value}

Tareas:
${document.getElementById("tareas").value}

Materiales: $${document.getElementById("materiales").value}
Mano de obra: $${document.getElementById("mano").value}
Viáticos: $${document.getElementById("viaticos").value}
Flete: $${document.getElementById("flete").value}

💰 TOTAL: $${document.getElementById("total").textContent}`;

  window.open(
    "https://wa.me/?text=" + encodeURIComponent(mensaje),
    "_blank"
  );

}

// Generar PDF
function generarPDF(){

  calcular();

  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text("ALBE SERVICIOS GENERALES", 20, 20);

  pdf.setFontSize(12);

  pdf.text("PRESUPUESTO",20,30);

  pdf.text("Agenda: " + document.getElementById("agenda").value,20,40);
  pdf.text("Fecha: " + document.getElementById("fecha").value,20,48);

  pdf.text("Cliente: " + document.getElementById("cliente").value,20,58);
  pdf.text("Sucursal: " + document.getElementById("sucursal").value,20,66);

  pdf.text("Provincia: " + document.getElementById("provincia").value,20,76);
  pdf.text("Localidad: " + document.getElementById("localidad").value,20,84);

  pdf.text("Lugar: " + document.getElementById("lugar").value,20,94);

  pdf.text("Tareas:",20,106);

  pdf.text(
    pdf.splitTextToSize(
      document.getElementById("tareas").value,
      170
    ),
    20,
    114
  );

  let y = 150;

  pdf.text("Materiales: $" + document.getElementById("materiales").value,20,y);
  y += 10;

  pdf.text("Mano de obra: $" + document.getElementById("mano").value,20,y);
  y += 10;

  pdf.text("Viáticos: $" + document.getElementById("viaticos").value,20,y);
  y += 10;

  pdf.text("Flete: $" + document.getElementById("flete").value,20,y);
  y += 15;

  pdf.setFontSize(16);

  pdf.text(
    "TOTAL: $" + document.getElementById("total").textContent,
    20,
    y
  );

  pdf.save("Presupuesto_ALBE.pdf");

}

// Recalcular automáticamente
["mano","viaticos","flete"].forEach(id=>{

  document.getElementById(id)
    .addEventListener("input", calcular);

});
