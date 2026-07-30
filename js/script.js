"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const botonMenu = document.getElementById("boton-menu");
    const menu = document.getElementById("menu");
    const formulario = document.getElementById("formulario");
    const mensajeFormulario = document.getElementById("mensaje-formulario");
    const anio = document.getElementById("anio");

    /* ==================================================
       MENÚ RESPONSIVE
    ================================================== */

    if (botonMenu && menu) {

        function abrirCerrarMenu() {

            const abierto = menu.classList.toggle("activo");

            botonMenu.classList.toggle("activo", abierto);

            botonMenu.setAttribute(
                "aria-expanded",
                abierto ? "true" : "false"
            );

            botonMenu.setAttribute(
                "aria-label",
                abierto
                    ? "Cerrar menú de navegación"
                    : "Abrir menú de navegación"
            );
        }

        function cerrarMenu() {

            menu.classList.remove("activo");
            botonMenu.classList.remove("activo");

            botonMenu.setAttribute("aria-expanded", "false");
            botonMenu.setAttribute(
                "aria-label",
                "Abrir menú de navegación"
            );
        }

        botonMenu.addEventListener("click", (evento) => {
            evento.stopPropagation();
            abrirCerrarMenu();
        });

        menu.querySelectorAll("a").forEach((enlace) => {
            enlace.addEventListener("click", cerrarMenu);
        });

        document.addEventListener("click", (evento) => {

            if (
                !menu.contains(evento.target) &&
                !botonMenu.contains(evento.target)
            ) {
                cerrarMenu();
            }
        });

        document.addEventListener("keydown", (evento) => {

            if (evento.key === "Escape") {
                cerrarMenu();
            }
        });

        window.addEventListener("resize", () => {

            if (window.innerWidth > 800) {
                cerrarMenu();
            }
        });
    }

    /* ==================================================
       DESPLAZAMIENTO SUAVE
    ================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((enlace) => {

        enlace.addEventListener("click", (evento) => {

            const destino = document.querySelector(
                enlace.getAttribute("href")
            );

            if (destino) {

                evento.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    /* ==================================================
       FORMULARIO
    ================================================== */

    if (formulario && mensajeFormulario) {

        formulario.addEventListener("submit", (evento) => {

            evento.preventDefault();

            const nombre = document.getElementById("nombre");
            const correo = document.getElementById("correo");
            const mensaje = document.getElementById("mensaje");

            limpiarMensaje();

            if (!validarNombre(nombre.value)) {

                mostrarMensaje(
                    "Por favor, escriba un nombre válido.",
                    "error"
                );

                nombre.focus();
                return;
            }

            if (!validarCorreo(correo.value)) {

                mostrarMensaje(
                    "Ingrese un correo electrónico válido.",
                    "error"
                );

                correo.focus();
                return;
            }

            if (!validarMensaje(mensaje.value)) {

                mostrarMensaje(
                    "El mensaje debe tener al menos 10 caracteres.",
                    "error"
                );

                mensaje.focus();
                return;
            }

            mostrarMensaje(
                `Gracias, ${nombre.value}. Su solicitud fue enviada correctamente.`,
                "exito"
            );

            formulario.reset();
        });

        function mostrarMensaje(texto, tipo) {

            mensajeFormulario.textContent = texto;

            mensajeFormulario.classList.remove(
                "mensaje-error",
                "mensaje-exito"
            );

            mensajeFormulario.classList.add(
                tipo === "error"
                    ? "mensaje-error"
                    : "mensaje-exito"
            );
        }

        function limpiarMensaje() {

            mensajeFormulario.textContent = "";

            mensajeFormulario.classList.remove(
                "mensaje-error",
                "mensaje-exito"
            );
        }
    }

    /* ==================================================
       AÑO DEL FOOTER
    ================================================== */

    if (anio) {
        anio.textContent = new Date().getFullYear();
    }

});