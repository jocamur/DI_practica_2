// Lista de citas obtenida del servidor
var listaCitas;

// URLS
const urlServiciosWeb = "http://localhost/HospitalPHP/sw_citas.php";
const actualizarElemento = "cita_form.html?";

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
            listaCitas = response.data;
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
    // Limpiamos la tabla
    $("#tablaElementos").children().remove();
    // Mostramos que estamos cargando la informacion
    $("#tablaElementos").append("<tr><th>Cargando...</th></tr>");

    // Declaramos la variable que contendra los datos a agregar a la tabla
    var datosTabla = '';

    // Agregamos las cabeceras
    datosTabla += '<tr><th>ID</th>';
    datosTabla += '<th>Fecha</th>';
    datosTabla += '<th>ID Medico</th>';
    datosTabla += '<th>ID Enfermero</th>';
    datosTabla += '<th>ID Usuario</th>';
    // Dejamos dos espacios en blanco para los botones de editar y eliminar
    datosTabla += '<th></th><th></th></tr>';

    // Empezamso con la carga de datos
    for (let i = inicio; i < fin; i++) {
        // Obtenemos la cita actual
        var cita = listaCitas[i];

        datosTabla += '<tr><td>' + cita.id + '</td>';
        datosTabla += '<td>' + cita.fecha + '</td>';
        datosTabla += '<td>' + cita.medico_id + '</td>';
        datosTabla += '<td>' + cita.enfermero_id + '</td>';
        datosTabla += '<td>' + cita.paciente_id + '</td>';
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
    var cita = listaCitas[id];

    $.ajax({
        method: "POST",
        url: urlServiciosWeb,
        data: {
            action: "delete",
            id: cita.id
        },
        dataType: "json"
    })
        // Si la operacion fue exitosa
        .done(function (response) {
            console.log('Operacion ejecutada con exito: ' + response.msg);

            alert("Eliminando...");
            listaCitas.splice(id, 1);
            CargarRango(0, 10000);
        })
        // En caso de fallo
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log('Error al ejecutar la operacion: ' + textStatus);
            alert("Error: " + textStatus);
        });
}

function ActualizarElemento(id) {
    // Obtenemos la cita
    var cita = listaCitas[id];

    // Cargamos la pantalla de actualizar y mandamos la informacion del elemento a actualizar
    window.location = actualizarElemento +
        "id=" + cita.id +
        "&fecha=" + cita.fecha +
        "&idMedico=" + cita.medico_id +
        "&idEnfermero=" + cita.enfermero_id +
        "&idPaciente=" + cita.paciente_id;
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
        CargarRango(90000, listaCitas.length);
    })
})