// ID si agregamos un nuevo elemento
var idAgregar;
// ID del objeto a actualizar (si no hay se queda como -1)
var idActualizar = -1;

const urlServiciosWeb = "http://localhost/HospitalPHP/sw_citas.php";

// Lista de citas obtenida del servidor
var listaCitas;

// Se ejecuta cuando carga la pagina
$(document).ready(function () {
    // Cargamos la lista de citas para determinar el ID que tendra un elemento que se fuera a agregar
    ObtenerLista();
    CargarParametros();
});

$(function () {
    // Se ejecuta cuando hacemos click en el boton de agregar/actualizar
    $("#botonAgregar").click(function () {
        // Si el id de actualizar es -1, eso significa que estamos agregando y no actualizando
        // porque no hay ID
        if (idActualizar == -1) {
            AgregarElemento();
        }
        else {
            ActualizarElemento();
        }
    })
})

function CargarParametros() {
    // Cargamos los parametros del URL
    const parametros = new URLSearchParams(document.location.search);

    // Si el id no es nullo, quiere decir que nos pasaron paramentros
    if (parametros.get("id") == null)
        return;

    // Guardamos el valor de los parametros
    idActualizar = parametros.get("id");
    const fecha = parametros.get("fecha");
    const idMedico = parametros.get("idMedico");
    const idEnfermero = parametros.get("idEnfermero");
    const idPaciente = parametros.get("idPaciente");

    // Cargamos los valores en la vista y actualizamos el titulo de la pagina y del boton
    document.getElementById('titulo').innerHTML = "Actualizar cita";
    document.getElementById('botonAgregar').innerHTML = "Actualizar";
    document.getElementById('fecha').value = fecha.replace(" ", "T");
    document.getElementById('idMedico').value = idMedico;
    document.getElementById('idEnfermero').value = idEnfermero;
    document.getElementById('idPaciente').value = idPaciente;
}

function ObtenerLista() {
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
            // El id del elemento a agregar es igual al ID del ultimo elemento + 1
            idAgregar = listaCitas[listaCitas.length - 1].id + 1;
        })
        // En caso de fallo
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log('Error al ejecutar la operacion: ' + textStatus);
            alert("Error: " + textStatus);
        });
}

function AgregarElemento() {
    $.ajax({
        method: "POST",
        url: urlServiciosWeb,
        data: {
            action: "insert",
            id: idAgregar,
            fecha: $("#fecha").val(),
            idMedico: $("#idMedico").val(),
            idEnfermero: $("#idEnfermero").val(),
            idPaciente: $("#idPaciente").val()
        },
        dataType: "json"
    })
        // Si la operacion fue exitosa
        .done(function (response) {
            console.log('Operacion ejecutada con exito: ' + response.msg);
            alert("Elemento agregado");
            ObtenerLista();
        })
        // En caso de fallo
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log('Error al ejecutar la operacion: ' + textStatus);
            alert("Error: " + textStatus);
        });
}

function ActualizarElemento() {
    $.ajax({
        method: "POST",
        url: urlServiciosWeb,
        data: {
            action: "update",
            id: idActualizar,
            fecha: $("#fecha").val(),
            idMedico: $("#idMedico").val(),
            idEnfermero: $("#idEnfermero").val(),
            idPaciente: $("#idPaciente").val()
        },
        dataType: "json"
    })
        // Si la operacion fue exitosa
        .done(function (response) {
            console.log('Operacion ejecutada con exito: ' + response.msg);
            alert("Actualizacion exitosa");
        })
        // En caso de fallo
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log('Error al ejecutar la operacion: ' + textStatus);
            alert("Error: " + textStatus);
        });
}