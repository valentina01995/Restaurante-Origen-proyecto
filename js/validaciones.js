"use strict";

/* ==================================================
   VALIDACIONES DEL FORMULARIO
================================================== */

function validarNombre(nombre) {
    return nombre.trim().length >= 3;
}

function validarCorreo(correo) {
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionCorreo.test(correo.trim());
}

function validarMensaje(mensaje) {
    return mensaje.trim().length >= 10;
}