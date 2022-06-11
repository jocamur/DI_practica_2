// Lista de citas obtenida del servidor
var listaPacientes;

// URLS
const urlServiciosWeb = "http://localhost/HospitalPHP/sw_pacientes.php";
const actualizarElemento = "paciente_form.html?";

// Se ejecuta cuando la pagina HTML carga
$(document).ready(function () {
    ObtenerLista();
});

function ObtenerLista() {
    // Limpiamos la tabla
    $("#tablaElementos").children().remove();
    // Mostramos que estamos cargando la informacion
    $("#tablaElementos").append("<tr><th>Cargando...</th></tr>");

    // Iniciamos la peticion al servidor, pasando que es de tipo GET y esperamos recibir un JSON
    $.ajax({
        method: "GET",
        url: urlServiciosWeb,
        data: {
            action: "get",
        },
        dataType: "json"
    })
        // Si la operacion fue exitosa
        .done(function (response) {
            console.log('Operacion ejecutada con exito: ' + response.msg);
            // Guardamos la lista de citas en nuestra lista local
            listaPacientes = response.data;
            // Llenamos la tabla de informacion
            CargarRango(0, 10000);
        })
        // En caso de fallo
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log('Error al ejecutar la operacion: ' + textStatus);
            alert("Error: " + textStatus);
        });
}

// Metodo para poder cargar la tabla en parte y no se sobrecargue la pagina
function CargarRango(inicio, fin) {
    // Declaramos la variable que contendra los datos a agregar a la tabla
    var datosTabla = '';

    // Agregamos las cabeceras
    datosTabla += '<tr><th>ID</th>';
    datosTabla += '<th>SIP</th>';
    datosTabla += '<th>DNI</th>';
    datosTabla += '<th>Nombre</th>';
    datosTabla += '<th>Primer apellido</th>';
    datosTabla += '<th>Segundo apellido</th>';
    datosTabla += '<th>Telefono</th>';
    datosTabla += '<th>Sexo</th>';
    datosTabla += '<th>Fecha de nacimiento</th>';
    datosTabla += '<th>Localidad</th>';
    datosTabla += '<th>Calle</th>';
    datosTabla += '<th>Numero</th>';
    datosTabla += '<th>Puerta</th>';
    datosTabla += '<th>Piso</th>';
    datosTabla += '<th>ID Medico</th>';
    datosTabla += '<th>ID Enfermero</th>';
    datosTabla += '<th>ID Usuario</th>';
    // Dejamos dos espacios en blanco para los botones de editar y eliminar
    datosTabla += '<th></th><th></th></tr>';

    // Empezamso con la carga de datos
    for (let i = inicio; i < fin; i++) {
        // Obtenemos la cita actual
        var paciente = listaPacientes[i];

        datosTabla += '<tr><td>' + paciente.id + '</td>';
        datosTabla += '<td>' + paciente.sip + '</td>';
        datosTabla += '<td>' + paciente.dni + '</td>';
        datosTabla += '<td>' + paciente.nombre + '</td>';
        datosTabla += '<td>' + paciente.apellido1 + '</td>';
        datosTabla += '<td>' + paciente.apellido2 + '</td>';
        datosTabla += '<td>' + paciente.telefono + '</td>';
        datosTabla += '<td>' + paciente.sexo + '</td>';
        datosTabla += '<td>' + paciente.fecha_nacimiento + '</td>';
        datosTabla += '<td>' + paciente.localidad + '</td>';
        datosTabla += '<td>' + paciente.calle + '</td>';
        datosTabla += '<td>' + paciente.numero + '</td>';
        datosTabla += '<td>' + paciente.puerta + '</td>';
        datosTabla += '<td>' + paciente.piso + '</td>';
        datosTabla += '<td>' + paciente.medico_id + '</td>';
        datosTabla += '<td>' + paciente.enfermero_id + '</td>';
        datosTabla += '<td>' + paciente.user_id + '</td>';
        // Agregamos que cuando se clickee cualquiera de los dos botones se ejecute una funcion y se pase el indice
        // para saber cual tenemos que borrar o editar
        datosTabla += '<td><button onclick="ActualizarElemento(' + i + ')" type="button" class="btn btn-link">Editar</button></td>';
        datosTabla += '<td><button onclick="EliminarElemento(' + i + ')" type="button" class="btn btn-link">Eliminar</button></td>';
        datosTabla += '</tr>';
    }

    // Limpiamos la tabla
    $("#tablaElementos").children().remove();
    // Agregamos los datos recien creados
    $("#tablaElementos").append(datosTabla);
}

function EliminarElemento(id) {
    // Obtenemos la cita
    var paciente = listaPacientes[id];

    $.ajax({
        method: "POST",
        url: urlServiciosWeb,
        data: {
            action: "delete",
            id: paciente.id
        },
        dataType: "json"
    })
        // Si la operacion fue exitosa
        .done(function (response) {
            console.log('Operacion ejecutada con exito: ' + response.msg);

            alert("Eliminando...");
            listaPacientes.splice(id, 1);
            CargarRango(0, 10000);
        })
        // En caso de fallo
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log('Error al ejecutar la operacion: ' + errorThrown);
            alert("Error: " + textStatus);
        });
}

function ActualizarElemento(id) {
    // Obtenemos la cita
    var paciente = listaPacientes[id];

    // Cargamos la pantalla de actualizar y mandamos la informacion del elemento a actualizar
    window.location = actualizarElemento +
        "id=" + paciente.id +
        "&sip=" + paciente.sip +
        "&dni=" + paciente.dni +
        "&nombre=" + paciente.nombre +
        "&apellido1=" + paciente.apellido1 +
        "&apellido2=" + paciente.apellido2 +
        "&telefono=" + paciente.telefono +
        "&sexo=" + paciente.sexo +
        "&fecha=" + paciente.fecha_nacimiento +
        "&localidad=" + paciente.localidad +
        "&calle=" + paciente.calle +
        "&numero=" + paciente.numero +
        "&puerta=" + paciente.puerta +
        "&piso=" + paciente.piso +
        "&idMedico=" + paciente.medico_id +
        "&idEnfermero=" + paciente.enfermero_id +
        "&idUser=" + paciente.user_id;
}

$(function () {
    // Botones para cargar los diferentes rangos

    $("#boton1").click(function () {
        CargarRango(0, 10000);
    })

    $("#boton2").click(function () {
        CargarRango(10000, 20000);
    })

    $("#boton3").click(function () {
        CargarRango(20000, 30000);
    })

    $("#boton4").click(function () {
        CargarRango(30000, 40000);
    })

    $("#boton5").click(function () {
        CargarRango(40000, 50000);
    })

    $("#boton6").click(function () {
        CargarRango(50000, 60000);
    })

    $("#boton7").click(function () {
        CargarRango(60000, 70000);
    })

    $("#boton8").click(function () {
        CargarRango(70000, 80000);
    })

    $("#boton9").click(function () {
        CargarRango(80000, 90000);
    })

    $("#boton10").click(function () {
        CargarRango(90000, 100000);
    })

    $("#boton11").click(function () {
        CargarRango(100000, 110000);
    })

    $("#boton12").click(function () {
        CargarRango(110000, 120000);
    })

    $("#boton13").click(function () {
        CargarRango(120000, 130000);
    })

    $("#boton14").click(function () {
        CargarRango(130000, 140000);
    })

    $("#boton15").click(function () {
        CargarRango(140000, 150000);
    })

    $("#boton16").click(function () {
        CargarRango(150000, 160000);
    })

    $("#boton17").click(function () {
        CargarRango(160000, 170000);
    })

    $("#boton18").click(function () {
        CargarRango(170000, 180000);
    })

    $("#boton19").click(function () {
        CargarRango(180000, 190000);
    })

    $("#boton20").click(function () {
        CargarRango(190000, 200000);
    })

    $("#boton21").click(function () {
        CargarRango(200000, 210000);
    })

    $("#boton22").click(function () {
        CargarRango(210000, 220000);
    })

    $("#boton23").click(function () {
        CargarRango(220000, 230000);
    })

    $("#boton24").click(function () {
        CargarRango(230000, 240000);
    })

    $("#boton25").click(function () {
        CargarRango(240000, 250000);
    })

    $("#boton26").click(function () {
        CargarRango(250000, 260000);
    })

    $("#boton27").click(function () {
        CargarRango(260000, 270000);
    })

    $("#boton28").click(function () {
        CargarRango(270000, 280000);
    })

    $("#boton29").click(function () {
        CargarRango(280000, 290000);
    })

    $("#boton30").click(function () {
        CargarRango(290000, 300000);
    })

    $("#boton31").click(function () {
        CargarRango(300000, 310000);
    })

    $("#boton32").click(function () {
        CargarRango(310000, 320000);
    })

    $("#boton33").click(function () {
        CargarRango(320000, listaPacientes.length);
    })
})