// ID si agregamos un nuevo elemento
var idAgregar;
// ID del objeto a actualizar (si no hay se queda como -1)
var idActualizar = -1;

const urlServiciosWeb = "http://localhost/HospitalPHP/sw_pacientes.php";

// Lista de citas obtenida del servidor
var listaPacientes;

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
    const sip = parametros.get("sip");
    const dni = parametros.get("dni");
    const nombre = parametros.get("nombre");
    const apellido1 = parametros.get("apellido1");
    const apellido2 = parametros.get("apellido2");
    const telefono = parametros.get("telefono");
    const sexo = parametros.get("sexo");
    const fecha = parametros.get("fecha");
    const localidad = parametros.get("localidad");
    const calle = parametros.get("calle");
    const numero = parametros.get("numero");
    const puerta = parametros.get("puerta");
    const piso = parametros.get("piso");
    const idMedico = parametros.get("idMedico");
    const idEnfermero = parametros.get("idEnfermero");
    const idUser = parametros.get("idUser");

    // Cargamos los valores en la vista y actualizamos el titulo de la pagina y del boton
    document.getElementById('titulo').innerHTML = "Actualizar paciente";
    document.getElementById('botonAgregar').innerHTML = "Actualizar";
    document.getElementById('sip').value = sip;
    document.getElementById('dni').value = dni;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido1').value = apellido1;
    document.getElementById('apellido2').value = apellido2;
    document.getElementById('telefono').value = telefono;
    document.getElementById('sexo').value = sexo;
    document.getElementById('fecha').value = fecha;
    document.getElementById('localidad').value = localidad;
    document.getElementById('calle').value = calle;
    document.getElementById('numero').value = numero;
    document.getElementById('puerta').value = puerta;
    document.getElementById('piso').value = piso;
    document.getElementById('idMedico').value = idMedico;
    document.getElementById('idEnfermero').value = idEnfermero;
    document.getElementById('idUser').value = idUser;
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
            listaPacientes = response.data;
            // El id del elemento a agregar es igual al ID del ultimo elemento + 1
            idAgregar = listaPacientes[listaPacientes.length - 1].id + 1;
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
            sip: $("#sip").val(),
            dni: $("#dni").val(),
            nombre: $("#nombre").val(),
            apellido1: $("#apellido1").val(),
            apellido2: $("#apellido2").val(),
            telefono: $("#telefono").val(),
            sexo: $("#sexo").val(),
            fecha: $("#fecha").val(),
            localidad: $("#localidad").val(),
            calle: $("#calle").val(),
            numero: $("#numero").val(),
            puerta: $("#puerta").val(),
            piso: $("#piso").val(),
            idMedico: $("#idMedico").val(),
            idEnfermero: $("#idEnfermero").val(),
            idUser: $("#idUser").val()
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
            sip: $("#sip").val(),
            dni: $("#dni").val(),
            nombre: $("#nombre").val(),
            apellido1: $("#apellido1").val(),
            apellido2: $("#apellido2").val(),
            telefono: $("#telefono").val(),
            sexo: $("#sexo").val(),
            fecha: $("#fecha").val(),
            localidad: $("#localidad").val(),
            calle: $("#calle").val(),
            numero: $("#numero").val(),
            puerta: $("#puerta").val(),
            piso: $("#piso").val(),
            idMedico: $("#idMedico").val(),
            idEnfermero: $("#idEnfermero").val(),
            idUser: $("#idUser").val()
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