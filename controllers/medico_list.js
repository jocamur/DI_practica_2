// Lista de medicos obtenida del servidor
var listaMedicos;

// URLS
const urlServiciosWeb = "http://localhost/HospitalPHP/sw_medicos.php";
const actualizarElemento = "medico_form.html?";

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
            listaMedicos = response.data;
            // Llenamos la tabla de informacion
            CargarTabla();
        })
        // En caso de fallo
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log('Error al ejecutar la operacion: ' + textStatus);
            alert("Error: " + textStatus);
        });
}

// Metodo para poder cargar la tabla
function CargarTabla() {
    // Declaramos la variable que contendra los datos a agregar a la tabla
    var datosTabla = '';

    // Agregamos las cabeceras
    datosTabla += '<tr><th>ID</th>';
    datosTabla += '<th>Numero colegiado</th>';
    datosTabla += '<th>DNI</th>';
    datosTabla += '<th>Nombre</th>';
    datosTabla += '<th>Primer apellido</th>';
    datosTabla += '<th>Segundo apellido</th>';
    datosTabla += '<th>Telefono</th>';
    datosTabla += '<th>Sexo</th>';
    datosTabla += '<th>ID Especialidad</th>';
    datosTabla += '<th>ID Horario</th>';
    datosTabla += '<th>ID Usuario</th>';
    // Dejamos dos espacios en blanco para los botones de editar y eliminar
    datosTabla += '<th></th><th></th></tr>';

    // Empezamso con la carga de datos
    for (let i = 0; i < listaMedicos.length; i++) {
        // Obtenemos el medico actual
        var medico = listaMedicos[i];

        datosTabla += '<tr><td>' + medico.id + '</td>';
        datosTabla += '<td>' + medico.numero_colegiado + '</td>';
        datosTabla += '<td>' + medico.dni + '</td>';
        datosTabla += '<td>' + medico.nombre + '</td>';
        datosTabla += '<td>' + medico.apellido1 + '</td>';
        datosTabla += '<td>' + medico.apellido2 + '</td>';
        datosTabla += '<td>' + medico.telefono + '</td>';
        datosTabla += '<td>' + medico.sexo + '</td>';
        datosTabla += '<td>' + medico.especialidad_id + '</td>';
        datosTabla += '<td>' + medico.horario_id + '</td>';
        datosTabla += '<td>' + medico.user_id + '</td>';
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
    // Obtenemos el medico
    var cita = listaMedicos[id];

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
            listaMedicos.splice(id, 1);
            CargarTabla();
        })
        // En caso de fallo
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log('Error al ejecutar la operacion: ' + textStatus);
            alert("Error: " + textStatus);
        });
}

function ActualizarElemento(id) {
    // Obtenemos la cita
    var medico = listaMedicos[id];

    // Cargamos la pantalla de actualizar y mandamos la informacion del elemento a actualizar
    window.location = actualizarElemento +
        "id=" + medico.id +
        "&numeroColegiado=" + medico.numero_colegiado +
        "&dni=" + medico.dni +
        "&nombre=" + medico.nombre +
        "&apellido1=" + medico.apellido1 +
        "&apellido2=" + medico.apellido2 +
        "&telefono=" + medico.telefono +
        "&sexo=" + medico.sexo +
        "&idEspecialidad=" + medico.especialidad_id +
        "&idHorario=" + medico.horario_id +
        "&idUser=" + medico.user_id;
}