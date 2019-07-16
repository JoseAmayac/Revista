var correoBorrado = "";
function verificarEmail() {
    var correo = document.getElementById("correo").value;
    if (correo.includes("@")) {
        alert("Ingresa solo el nombre de usuario, sin el dominio");
        let correo2 = document.getElementById("correo");
        correo2.classList.add("error");
        return false;
    }
    return true;
}
function verificarEmailLogin() {
    var correo = document.getElementById("email").value;
    if (correo.includes("@")) {
        alert("Ingresa solo el nombre de usuario, sin el dominio");
        let correo2 = document.getElementById("correo");
        correo2.classList.add("error");
        return false;
    }
    return true;
}
function verificarClave() {
    var clave = document.getElementById("pass").value;

    if (clave.length < 6 || clave.length > 24) {
        alert("La contraseña debe estar entre 6 y 24 caracteres");
        return false;
    }
    return true;
}

function verificarCampos() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("correo").value;
    var direccion = document.getElementById("direccion").value;
    var telefono = document.getElementById("telefono").value;
    var clave = document.getElementById("pass").value;
    
    if (nombre == "" || email == "" || direccion == "" || telefono == "" || clave == "") {
        alert("Debes diligenciar los campos requeridos (Marcados con *)");
    }
    if (clave != "") {
        var cla = verificarClave();
    }
    if (telefono != "") {
        var valor = verificarTelefono();
    }
    if (email != "") {
        var emi = verificarEmail();
    }
    if (nombre != "" && email != "" && direccion != "" && telefono != "" && clave != "" && (cla) && (valor) && (emi)) {
        $.post("../../Backend/Controllers/CrudPersona.php", { nom: nombre, corr: email + "@autonoma.edu.co", dir: direccion, tel: telefono, afil: document.getElementById("afiliacion").value, pass: clave, id: 1 }, function (Respuesta) {
            if (JSON.parse(Respuesta) == "../../Frontend/Vistas/registroCorrecto.html") {
                redireccionar1(Respuesta);
            }
            else
            {
                alert(JSON.parse(Respuesta));
            }
        }
        );
    }
}

function consultaEntrada(tipo) {
    consultarNombre();
    $.post("../../Backend/Controllers/CrudArticulo.php", { id: 20, tipoUsuario: tipo }, function (Respuesta) {

        datos = jQuery.parseJSON(Respuesta);
        for (var i in datos) {
            var elementotr = document.createElement('div');
            elementotr.setAttribute("class", "panel panel-default");
            elementotr.setAttribute("id", "contenedor" + i);

            document.getElementById('caja').appendChild(elementotr);

            var cabeza = document.createElement('div');
            cabeza.setAttribute("class", "panel-heading");


            var texto1 = datos[i].titulo;

            cabeza.innerHTML = texto1 + "<p class='pull-right'>" + "<strong>Estado: </strong>" + datos[i].estado + "</p>";
            document.getElementById('contenedor' + i).appendChild(cabeza);

            var cuerpo = document.createElement('div');
            cuerpo.setAttribute("class", "panel-body");

            var texto2 = "<strong>Temas: </strong>" + datos[i].tema + "<br>" +
                "<strong> Palabras clave: </strong>" + datos[i].palabraClave + "<br><strong> Autor: </strong>" + datos[i].correo +
                "<br><strong> Resumen: </strong>" + datos[i].resumen + "<br>";

            cuerpo.innerHTML = texto2;

            if (datos[i].estado == "aceptado") {

                var boton1 = document.createElement("button");
                boton1.setAttribute("class", "btn btn-success pull-right btnSeparador");
                boton1.setAttribute("onClick", "publicarArticulo(" + datos[i].id + ");enviarNotificacion('" + datos[i].correo + "','Tu articulo (" + datos[i].titulo + ") ha sido publicado','publicacion');location.reload()");
                boton1.innerHTML = "Publicar";

                cuerpo.appendChild(boton1);
            }
            if (datos[i].estado == "pendiente") {
                var boton1 = document.createElement("button");
                boton1.setAttribute("class", "btn btn-primary pull-right btnSeparador");
                boton1.setAttribute("onClick", "enviarNotificacion('" + datos[i].correo + "','Tu articulo (" + datos[i].titulo + ") necesita cambios','pendiente');location.reload()");
                boton1.innerHTML = "Notificar";
                cuerpo.appendChild(boton1);
            }
            if (datos[i].estado == "recibido") {
                var boton1 = document.createElement("button");
                boton1.setAttribute("class", "btn btn-primary pull-right btnSeparador");
                boton1.setAttribute("onClick", "asignacionPares(" + datos[i].id + ",'" + datos[i].titulo + "')");

                boton1.innerHTML = "Asignar Par";

                var link = document.createElement("a");
                link.setAttribute("href", "../Vistas/listaPares.html");
                link.appendChild(boton1);

                cuerpo.appendChild(link);
            }

            var boton = document.createElement("button");
            boton.setAttribute("class", "btn btn-danger pull-right btnSeparador");
            boton.setAttribute("OnClick", "EliminarArticulo(" + datos[i].id + ");enviarNotificacion('" + datos[i].correo + "','Tu articulo (" + datos[i].titulo + ") ha sido eliminado','eliminacion');location.reload()");
            boton.innerHTML = "Eliminar   ";
            cuerpo.appendChild(boton);

            var boton = document.createElement("button");
            boton.setAttribute("class", "btn btn-primary pull-right btnSeparador");
            boton.setAttribute("onClick", "descargarArticulo(" + datos[i].id + ")");
            boton.innerHTML = "Descargar";
            cuerpo.appendChild(boton);

            if (datos[i].estado == "rechazado") {
                boton.removeAttribute("class", "btn-primary");
                boton.setAttribute("class", "btn btn-danger pull-right btnSeparador");
                boton.innerHTML = "Eliminar";
                boton.setAttribute("OnClick", "EliminarArticulo(" + datos[i].id + ");enviarNotificacion('" + datos[i].correo + "','Tu articulo (" + datos[i].titulo + ") ha sido eliminado','eliminacion');location.reload()");
                cuerpo.appendChild(boton);
            }
            document.getElementById('contenedor' + i).appendChild(cuerpo);
        }
    }
    );
}

function enviarNotificacion(receptor, mensaje, tipo) {

    $.post("../../Backend/Controllers/CrudNotificacion.php", { mensajeInv: mensaje, recibe: receptor, tipoN: tipo, id: 1 }, function (Respuesta) {
        alert(JSON.parse(Respuesta));
    }
    );
}

function listarNotificaciones() {
    $.post("../../Backend/Controllers/CrudNotificacion.php", { id: 2 }, function (Respuesta) {
        datos = jQuery.parseJSON(Respuesta);
        for (var i in datos) {


            var noti = document.createElement("div");
            noti.setAttribute("class", "panel panel-default");
            noti.setAttribute("id", "contenedor" + i);

            var cabeza = document.createElement("div");
            cabeza.setAttribute("class", "panel-heading");

            cabeza.innerHTML = datos[i].emisor;

            noti.appendChild(cabeza);

            var cuerpo = document.createElement("div");
            cuerpo.setAttribute("class", "panel-body");

            var texto = "<p>" + datos[i].mensaje + "</p>";
            cuerpo.innerHTML = texto;

            var boton1 = document.createElement("button");
            boton1.setAttribute("class", "btn btn-danger pull-right btnSeparador");
            boton1.setAttribute("onClick", "eliminarNotificacion(" + datos[i].id + ",'eliminar');location.reload()");
            boton1.innerHTML = "Eliminar";
            cuerpo.appendChild(boton1);

            if (datos[i].tipo == "asignacion") {
                var boton = document.createElement("button");
                boton.setAttribute("class", "btn btn-primary pull-right btnSeparador");
                boton.innerHTML = "Ver artículos";

                var link = document.createElement("a");
                link.setAttribute("href", "../Vistas/listaArticulosPar.html");
                link.appendChild(boton);
                cuerpo.appendChild(link);
            }
            if (datos[i].tipo == "invitacion") {
                var boton = document.createElement("button");
                boton.setAttribute("class", "btn btn-primary pull-right btnSeparador");
                boton.setAttribute("onClick", "aceptarPar();eliminarNotificacion(" + datos[i].id + ",'cambio')");
                boton.innerHTML = "Aceptar";
                cuerpo.appendChild(boton);
            }

            if (datos[i].tipo == "enviado" || datos[i].tipo == "calificado") {
                var boton = document.createElement("button");
                boton.setAttribute("class", "btn btn-primary pull-right btnSeparador");
                boton.innerHTML = "Ver artículos";

                var link = document.createElement("a");
                link.setAttribute("href", "../Vistas/articulo.html");
                link.appendChild(boton);
                cuerpo.appendChild(link);
            }
            noti.appendChild(cuerpo);
            document.getElementById("cajitas").appendChild(noti);
        }
    }
    );
}

function eliminarNotificacion(idNoti, mostrar) {
    if (confirm("Desea eliminar esta notificación")) {
        $.post("../../Backend/Controllers/CrudNotificacion.php", { idNotificacion: idNoti, id: 3 }, function (Respuesta) {
            if (mostrar == 'eliminar') {
                alert(JSON.parse(Respuesta));
            }
        }
        );
    }
}
function aceptarPar() {
    if (confirm("Si aceptas empezarás a ser un par y dejarás de ser autor, además se te redireccionará a la página de login")) {
        $.post("../../Backend/Controllers/CrudPersona.php", { id: 9 }, function (Respuesta) {
            alert("Bienvenido, estás a un paso de ser par. Inicia sesión para continuar");
            redireccionar(JSON.parse(Respuesta));
        }
        );
    }
}
function consultarUsuario(tipo, ejemplo) {
    consultarNombre();
    $.post("../../Backend/Controllers/CrudPersona.php", { id: 4 }, function (Respuesta) {
        datos = jQuery.parseJSON(Respuesta);
        for (var i in datos) {
            if (tipo == datos[i].tipo) {
                var elementotr = document.createElement('div');
                elementotr.setAttribute("class", "panel panel-default");
                elementotr.setAttribute("id", "contenedor" + i);

                document.getElementById('caja').appendChild(elementotr);

                var cabeza = document.createElement('div');
                cabeza.setAttribute("class", "panel-heading");


                var texto1 = datos[i].nombre;

                cabeza.innerHTML = "<strong>" + texto1;
                document.getElementById('contenedor' + i).appendChild(cabeza);


                var cuerpo = document.createElement('div');
                cuerpo.setAttribute("class", "panel-body");
                var texto2 = datos[i].email;
                var direccio = datos[i].direccion;
                var telefo = datos[i].telefono;
                var afiliacion = datos[i].afiliacion;
                cuerpo.innerHTML = "<strong>" + "Correo: " + "</strong>" + texto2 + "<br>" + "<strong>" + "Dirección: " + "</strong>" + direccio + "<br>" + "<strong>" + "Telefono: " + "</strong>" + telefo +
                    "<br>" + "<strong>" + "Afiliacion: " + "</strong>" + afiliacion;

                if (ejemplo != "Articulo") {
                    var boton = document.createElement("button");
                    boton.setAttribute("class", "btn btn-danger pull-right btnSeparador");
                    boton.setAttribute("onClick", "eliminar('" + datos[i].email + "');location.reload()");
                    boton.innerHTML = "Eliminar";
                    cuerpo.appendChild(boton);

                    if (tipo != "par") {
                        var boton2 = document.createElement("button");
                        boton2.setAttribute("class", "btn btn-primary pull-right btnSeparador");
                        boton2.setAttribute("title", "Invita al autor a ser un par evaluador");
                        boton2.setAttribute("onClick", "enviarNotificacion('" + datos[i].email + "','Te invitamos a ser par evualuador','invitacion')");
                        boton2.innerHTML = "Invitar";
                        cuerpo.appendChild(boton2);
                    }
                }

                if (ejemplo == "Articulo") {
                    var boton = document.createElement("button");
                    boton.setAttribute("class", "btn btn-primary pull-right btnSeparador");
                    boton.setAttribute("id", "boton" + i);
                    boton.setAttribute("onClick", "parAsignacion('" + datos[i].email + "'," + i + ")");
                    boton.innerHTML = "Seleccionar";
                    cuerpo.appendChild(boton);
                }
                document.getElementById('contenedor' + i).appendChild(cuerpo);
            }
        }
    }
    );
}


function consultaPublicaciones(tipo) {
    $.post("../../Backend/Controllers/CrudArticulo.php", { id: 20, tipoUsuario: tipo }, function (Respuesta) {
        //document.removeChild(document.getElementById('caja'));
        datos = jQuery.parseJSON(Respuesta);
        for (var i in datos) {
            if (datos[i].estado == "publicado") {
                var elementotr = document.createElement('div');
                elementotr.setAttribute("class", "panel panel-default");
                elementotr.setAttribute("id", "contenedor" + i);

                document.getElementById('caja').appendChild(elementotr);

                var cabeza = document.createElement('div');
                cabeza.setAttribute("class", "panel-heading");


                var texto1 = datos[i].titulo;

                cabeza.innerHTML = texto1;
                document.getElementById('contenedor' + i).appendChild(cabeza);

                var cuerpo = document.createElement('div');
                cuerpo.setAttribute("class", "panel-body");

                var texto2 = "<strong>Temas: </strong>" + datos[i].tema + "<br>" +
                    "<strong> Palabras clave: </strong>" + datos[i].palabraClave + "<br><strong> Autor: </strong>" + datos[i].correo +
                    "<br><strong> Resumen: </strong>" + datos[i].resumen;

                cuerpo.innerHTML = texto2;

                var boton = document.createElement("button");
                boton.setAttribute("class", "btn btn-primary pull-right btnSeparador");
                boton.setAttribute("onClick", "descargarArticulo(" + datos[i].id + ")");
                boton.innerHTML = "Descargar";

                cuerpo.appendChild(boton);

                document.getElementById('contenedor' + i).appendChild(cuerpo);
            }
        }
    });
}


function descargarArticulo(idArt) {
    $.post("../../Backend/Controllers/CrudArticulo.php", { idArti: idArt, id: 5 }, function (Respuesta) {
        alert("El archivo se ha descargado en la carpeta descargas, lo encuentras con el nombre: " + idArt);
    }
    );
}

function validarCampos() {
    verificarEmailLogin();
    var email = document.getElementById("email").value;
    var clave = document.getElementById("clave").value;

    if (clave == "") {
        alert("Debes proporcionar una contraseña");
    }
    if (email == "") {
        alert("Debes proporcionar un correo");
    }

    if (clave != "" && email != "") {
        $.post("../../Backend/Controllers/CrudPersona.php", { emi: email + "@autonoma.edu.co", con: clave, id: 2 }, function (Respuesta) {
            if (JSON.parse(Respuesta) == "Datos incorrectos") {
                alert(Respuesta);
            }
            else {
                redireccionar(JSON.parse(Respuesta));
            }
        }
        );
    }
}

function verificarTelefono() {
    var telefono = document.getElementById("telefono").value;
    for (var index = 0; index < telefono.length; index++) {
        var caracter = telefono.charAt(index);
        if (caracter != "0" && caracter != "1" && caracter != "2" && caracter != "3" && caracter != "4" && caracter != "5" && caracter != "6" && caracter != "7" && caracter != "8" && caracter != "9") {
            alert("El telefono solo puede contener numeros");
            return false;
        }
    }
    return true;
}

function redireccionar(ruta) {
    window.location = ruta;
}

function redireccionar1(rutaLogin) {
    window.location = "http://localhost/revista/Frontend/Vistas/registroCorrecto.html";
}

function cerrar() {
    $.post("../../Backend/Controllers/CrudPersona.php", { id: 3 }, function (Respuesta) {
        alert(Respuesta);
    }
    );

}


function consultarNombre() {
    $.post("../../Backend/Controllers/CrudPersona.php", { id: 5 }, function (Respuesta) {
        var nombre = JSON.parse(Respuesta).split(" ")[0];
        var texto = document.createTextNode(" " + nombre);
        document.getElementById("nombreUsu").appendChild(texto);
    }
    );
}

function eliminar(correo) {
    if (confirm("Realmente desea eliminar el usuario")) {
        $.post("../../Backend/Controllers/CrudPersona.php", { corr: correo, id: 11 }, function (Respuesta) {
            alert(Respuesta);
        }
        );
    }
}

function buscarUsu(usuario) 
{
    var termino = document.getElementById("busqueda").value;
    $.post("../../Backend/Controllers/CrudPersona.php", { terminoBuscar: termino, id: 7 }, function (Respuesta) 
    {
        datos = jQuery.parseJSON(Respuesta);
        if (JSON.parse(Respuesta) != "Sin resultados")
        {
            $("#caja").remove();
            for (var i in datos) {
                if (usuario == datos[i].tipo) {
                    var caja = document.createElement('div');
                    caja.setAttribute("id", "caja");

                    document.getElementById("cajota").appendChild(caja);

                    var elementotr = document.createElement('div');
                    elementotr.setAttribute("class", "panel panel-default");
                    elementotr.setAttribute("id", "contenedor" + i);

                    document.getElementById('caja').appendChild(elementotr);

                    var cabeza = document.createElement('div');
                    cabeza.setAttribute("class", "panel-heading");


                    var texto1 = datos[i].nombre;

                    cabeza.innerHTML = "<strong>" + texto1;
                    document.getElementById('contenedor' + i).appendChild(cabeza);


                    var cuerpo = document.createElement('div');
                    cuerpo.setAttribute("class", "panel-body");
                    var texto2 = datos[i].email;
                    var direccio = datos[i].direccion;
                    var telefo = datos[i].telefono;
                    var afiliacion = datos[i].afiliacion;
                    cuerpo.innerHTML = "<strong>" + "Correo: " + "</strong>" + texto2 + "<br>" + "<strong>" + "Dirección: " + "</strong>" + direccio + "<br>" + "<strong>" + "Telefono: " + "</strong>" + telefo +
                        "<br>" + "<strong>" + "Afiliacion: " + "</strong>" + afiliacion;


                    if (usuario == "autor") {
                        var boton2 = document.createElement("button");
                        boton2.setAttribute("class", "btn btn-primary pull-right btnSeparador");
                        boton2.setAttribute("title", "Invita al autor a ser un par evaluador");
                        boton2.setAttribute("onClick", "enviarNotificacion('" + datos[i].email + "','Te invitamos a ser par evualuador','invitacion')");
                        boton2.innerHTML = "Invitar";
                        cuerpo.appendChild(boton2);
                    }

                    var boton = document.createElement("button");
                    boton.setAttribute("class", "btn btn-primary pull-right btnSeparador");
                    boton.setAttribute("onClick", "eliminar('" + datos[i].email + "');location.reload()");
                    boton.innerHTML = "Eliminar";
                    cuerpo.appendChild(boton);
                    document.getElementById('contenedor' + i).appendChild(cuerpo);
                }
            }
        }
        else {
            alert(Respuesta);
        }
    }
    );
}