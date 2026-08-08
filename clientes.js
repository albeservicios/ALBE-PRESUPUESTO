// ==========================================
// ALBE PRESUPUESTOS V4.0
// CLIENTES.JS
// CONEXIÓN CLIENTES + PRESUPUESTO
// ==========================================

let baseClientes = [];

// ==========================================
// CARGAR BASE JSON
// ==========================================

async function cargarBaseClientes() {

    try {

        const respuesta = await fetch(
            "/ALBE-PRESUPUESTO/clientes.json?v=4"
        );

        if (!respuesta.ok) {
            throw new Error(
                "Error HTTP " + respuesta.status
            );
        }

        const datos = await respuesta.json();

        baseClientes = Array.isArray(datos.clientes)
            ? datos.clientes
            : [];

        console.log(
            "CLIENTES V4:",
            baseClientes
        );

        if (baseClientes.length === 0) {

            throw new Error(
                "clientes.json no contiene clientes"
            );

        }

        cargarEmpresas();

        mostrarClientes();

        console.log(
            "Base de clientes V4 cargada correctamente."
        );

    } catch (error) {

        console.error(
            "ERROR CLIENTES V4:",
            error
        );

        alert(
            "Error cargando la base de clientes:\n\n" +
            error.message
        );

    }

}


// ==========================================
// MOSTRAR CLIENTES
// ==========================================

function mostrarClientes() {

    const lista =
        document.getElementById("listaClientes");

    if (!lista) return;

    lista.innerHTML = "";

    baseClientes.forEach(cliente => {

        const div =
            document.createElement("div");

        div.className =
            "cliente-item";

        div.innerHTML = `
            <strong>
                ${cliente.empresa || ""}
            </strong>

            <span>
                ${cliente.razonSocial || ""}
            </span>

            <small>
                ${
                    Array.isArray(cliente.sucursales)
                    ? cliente.sucursales.length
                    : 0
                }
                sucursales
            </small>
        `;

        lista.appendChild(div);

    });

}


// ==========================================
// EMPRESAS
// ==========================================

function cargarEmpresas() {

    const select =
        document.getElementById(
            "empresaCliente"
        );

    if (!select) {

        console.error(
            "No existe #empresaCliente"
        );

        return;

    }

    select.innerHTML =
        `<option value="">
            Seleccione empresa...
        </option>`;

    baseClientes.forEach(
        (cliente, indice) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                indice;

            option.textContent =
                cliente.empresa;

            select.appendChild(
                option
            );

        }
    );

}


// ==========================================
// EMPRESA → PROVINCIAS
// ==========================================

function cargarProvincias() {

    const selectEmpresa =
        document.getElementById(
            "empresaCliente"
        );

    const selectProvincia =
        document.getElementById(
            "provinciaCliente"
        );

    const selectLocalidad =
        document.getElementById(
            "localidadCliente"
        );

    const selectSucursal =
        document.getElementById(
            "sucursalCliente"
        );

    if (!selectEmpresa || !selectProvincia) {
        return;
    }

    const empresa =
        baseClientes[
            selectEmpresa.value
        ];

    selectProvincia.innerHTML =
        `<option value="">
            Seleccione provincia...
        </option>`;

    selectLocalidad.innerHTML =
        `<option value="">
            Seleccione localidad...
        </option>`;

    selectSucursal.innerHTML =
        `<option value="">
            Seleccione sucursal...
        </option>`;

    limpiarDatosCliente();

    if (!empresa) return;

    const sucursales =
        Array.isArray(empresa.sucursales)
        ? empresa.sucursales
        : [];

    const provincias = [
        ...new Set(
            sucursales.map(
                s => s.provincia
            )
        )
    ];

    provincias.forEach(
        provincia => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                provincia;

            option.textContent =
                provincia;

            selectProvincia.appendChild(
                option
            );

        }
    );

}


// ==========================================
// PROVINCIA → LOCALIDADES
// ==========================================

function cargarLocalidades() {

    const empresa =
        obtenerEmpresa();

    const provincia =
        document.getElementById(
            "provinciaCliente"
        ).value;

    const localidad =
        document.getElementById(
            "localidadCliente"
        );

    const sucursal =
        document.getElementById(
            "sucursalCliente"
        );

    localidad.innerHTML =
        `<option value="">
            Seleccione localidad...
        </option>`;

    sucursal.innerHTML =
        `<option value="">
            Seleccione sucursal...
        </option>`;

    limpiarDatosCliente();

    if (!empresa || !provincia) return;

    const localidades = [
        ...new Set(
            empresa.sucursales
                .filter(
                    s =>
                        s.provincia === provincia
                )
                .map(
                    s => s.localidad
                )
        )
    ];

    localidades.forEach(
        nombre => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                nombre;

            option.textContent =
                nombre;

            localidad.appendChild(
                option
            );

        }
    );

}


// ==========================================
// LOCALIDAD → SUCURSALES
// ==========================================

function cargarSucursales() {

    const empresa =
        obtenerEmpresa();

    const provincia =
        document.getElementById(
            "provinciaCliente"
        ).value;

    const localidad =
        document.getElementById(
            "localidadCliente"
        ).value;

    const sucursal =
        document.getElementById(
            "sucursalCliente"
        );

    sucursal.innerHTML =
        `<option value="">
            Seleccione sucursal...
        </option>`;

    limpiarDatosCliente();

    if (
        !empresa ||
        !provincia ||
        !localidad
    ) {
        return;
    }

    empresa.sucursales
        .filter(
            s =>
                s.provincia === provincia &&
                s.localidad === localidad
        )
        .forEach(
            (s, indice) => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    indice;

                option.textContent =
                    s.sucursal;

                option.dataset.datos =
                    JSON.stringify(s);

                sucursal.appendChild(
                    option
                );

            }
        );

}


// ==========================================
// SUCURSAL → DATOS
// ==========================================

function completarSucursal() {

    const empresa =
        obtenerEmpresa();

    const provincia =
        document.getElementById(
            "provinciaCliente"
        ).value;

    const localidad =
        document.getElementById(
            "localidadCliente"
        ).value;

    const indice =
        document.getElementById(
            "sucursalCliente"
        ).value;

    if (
        !empresa ||
        !provincia ||
        !localidad ||
        indice === ""
    ) {
        limpiarDatosCliente();
        return;
    }

    const sucursales =
        empresa.sucursales.filter(
            s =>
                s.provincia === provincia &&
                s.localidad === localidad
        );

    const sucursal =
        sucursales[indice];

    if (!sucursal) return;

    document.getElementById(
        "direccionCliente"
    ).value =
        sucursal.direccion || "";

    document.getElementById(
        "telefonoCliente"
    ).value =
        sucursal.telefono || "";

    pasarClienteAlPresupuesto(
        empresa,
        sucursal
    );

}


// ==========================================
// OBTENER EMPRESA
// ==========================================

function obtenerEmpresa() {

    const indice =
        document.getElementById(
            "empresaCliente"
        ).value;

    if (indice === "") {
        return null;
    }

    return baseClientes[indice];

}


// ==========================================
// PASAR DATOS AL PRESUPUESTO
// ==========================================

function pasarClienteAlPresupuesto(
    empresa,
    sucursal
) {

    const campoEmpresa =
        document.getElementById("empresa");

    const campoSucursal =
        document.getElementById("sucursal");

    const campoProvincia =
        document.getElementById("provincia");

    const campoLocalidad =
        document.getElementById("localidad");

    const campoDireccion =
        document.getElementById("direccion");

    const campoTelefono =
        document.getElementById("telefono");

    if (campoEmpresa) {

        campoEmpresa.value =
            empresa.empresa || "";

    }

    if (campoSucursal) {

        campoSucursal.value =
            sucursal.sucursal || "";

    }

    if (campoProvincia) {

        campoProvincia.value =
            sucursal.provincia || "";

    }

    if (campoLocalidad) {

        campoLocalidad.value =
            sucursal.localidad || "";

    }

    if (campoDireccion) {

        campoDireccion.value =
            sucursal.direccion || "";

    }

    if (campoTelefono) {

        campoTelefono.value =
            sucursal.telefono || "";

    }

}


// ==========================================
// LIMPIAR DATOS
// ==========================================

function limpiarDatosCliente() {

    const ids = [
        "direccionCliente",
        "telefonoCliente",
        "empresa",
        "sucursal",
        "provincia",
        "localidad",
        "direccion",
        "telefono"
    ];

    ids.forEach(
        id => {

            const elemento =
                document.getElementById(id);

            if (elemento) {
                elemento.value = "";
            }

        }
    );

}


// ==========================================
// INICIO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const empresa =
            document.getElementById(
                "empresaCliente"
            );

        const provincia =
            document.getElementById(
                "provinciaCliente"
            );

        const localidad =
            document.getElementById(
                "localidadCliente"
            );

        const sucursal =
            document.getElementById(
                "sucursalCliente"
            );

        if (empresa) {

            empresa.addEventListener(
                "change",
                cargarProvincias
            );

        }

        if (provincia) {

            provincia.addEventListener(
                "change",
                cargarLocalidades
            );

        }

        if (localidad) {

            localidad.addEventListener(
                "change",
                cargarSucursales
            );

        }

        if (sucursal) {

            sucursal.addEventListener(
                "change",
                completarSucursal
            );

        }

        cargarBaseClientes();

    }
);
