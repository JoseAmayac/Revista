var idArticulo;

function asignacionPares(id, titulo) {
    idArticulo = id;
    localStorage.idArticuloGuardar = idArticulo;
    localStorage.setItem("id", idArticulo);
    localStorage.setItem("titulo2", titulo);
}

function mostrarId(correo) {
    var m = correo;
    alert(m + localStorage.getItem("id"));
}

function guardardatos(titulo) {
    localStorage.setItem("titulo", titulo);
}

function guardardatos1(tema) {
    localStorage.setItem("tema", tema);
}


function guardardatos2(palabrasClave) {
    localStorage.setItem("palabrasClave", palabrasClave);
}


function guardardatos3(correo) {
    localStorage.setItem("correo", correo);
}

function guardardatos4(id) {
    localStorage.setItem("idArti", id);
}



function parAsignacion(correo, i) {
    let idArticulo = localStorage.getItem("id");
    let correoPar = correo;
    let idBoton = "boton" + i;
    let boton = document.getElementById(idBoton);
    $.post("../../Backend/Controllers/CrudAsignacion.php", { corrPar: correoPar, artiId: idArticulo, id: 1 }, function (Respuesta) {
        alert(Respuesta);
        if (JSON.parse(Respuesta) == "Par asignado") {
            enviarNotificacion(correo, 'Se te ha asignado un nuevo articulo para evaluar.(' + localStorage.getItem("titulo2") + ')', 'asignacion');
        }
    }
    );
    boton.setAttribute("disabled", "true");
    boton.setAttribute("class", "btn btn-danger  pull-right btnSeparador");
}

function mostrarAsignaciones() {
    $.post("../../Backend/Controllers/CrudAsignacion.php", { id: 2 }, function (Respuesta) {

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
                "<br><strong> Resumen: </strong>" + datos[i].resumen;

            cuerpo.innerHTML = texto2;


            var boton = document.createElement("button");
            var link = document.createElement("a");
            link.setAttribute("href", "../Vistas/evaluarArticulo.html");
            link.setAttribute("onClick", "guardardatos('" + datos[i].titulo + "');guardardatos1('" + datos[i].tema + "');guardardatos2('" + datos[i].palabraClave + "');guardardatos3('" + datos[i].correo + "');guardardatos4('" + datos[i].id + "')");
            boton.setAttribute("class", "btn btn-primary pull-right btnSeparador");
            boton.innerHTML = "Evaluar";
            link.appendChild(boton);
            var boton1 = document.createElement("button");
            boton1.setAttribute("class", "btn btn-primary pull-right btnSeparador");
            boton1.setAttribute("onClick", "descargarArticulo(" + datos[i].id + ")");
            boton1.innerHTML = "Descargar";
            cuerpo.appendChild(link);
            cuerpo.appendChild(boton1);
            




            document.getElementById('contenedor' + i).appendChild(cuerpo);
        }
    }
    );
}

function mostrarVariables() {
    let datos = document.getElementById("datosArticulo");
    let p = document.createElement("p");
    let palabrasClave;
    let ocultoId = document.getElementById("articuloId");
    ocultoId.value = localStorage.getItem("idArti");
    if (localStorage.getItem("palabrasClave") == "") {
        palabrasClave = "No hay palabras clave";
    } else {
        palabrasClave = localStorage.getItem("palabrasClave");
    }
    p.innerHTML = "<strong>" + "Titulo: " + "</strong>" + localStorage.getItem("titulo") + "<br>" + "<strong>" + "Tema: " + "</strong>" + localStorage.getItem("tema")
        + "<br>" + "<strong>" + "Palabras clave: " + "</strong>" + palabrasClave + "<br>" + "<strong>" + "Enviado por: " + "</strong>" + localStorage.getItem("correo");
    datos.appendChild(p);
}

function EliminarArticulo(idEliminar) {
    $.post("../../Backend/Controllers/CrudArticulo.php", { artiId: idEliminar, id: 3 }, function (Respuesta) {
        alert(Respuesta);
    }
    );
}

function publicarArticulo(idPublicar) {
    $.post("../../Backend/Controllers/CrudArticulo.php", { artiId: idPublicar, id: 4 }, function (Respuesta) {
        alert("Artículo Publicado");
        location.reload();
    }
    );
}

function buscarArticulo() {
    var termino = document.getElementById("busqueda").value;
    $.post("../../Backend/Controllers/CrudAsignacion.php", { terminoBuscar: termino, id: 3 }, function (Respuesta) {
        if (JSON.parse(Respuesta) != "Sin resultados") {
            $("#caja").remove();
            datos = jQuery.parseJSON(Respuesta);
            for (var i in datos) {
                var caja = document.createElement('div');
                caja.setAttribute("id", "caja");

                document.getElementById("cajota").appendChild(caja);

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
                    "<br><strong> Resumen: </strong>" + datos[i].resumen;

                cuerpo.innerHTML = texto2;


                var boton = document.createElement("button");
                var link = document.createElement("a");
                link.setAttribute("href", "../Vistas/evaluarArticulo.html");
                link.setAttribute("onClick", "guardardatos('" + datos[i].titulo + "');guardardatos1('" + datos[i].tema + "');guardardatos2('" + datos[i].palabraClave + "');guardardatos3('" + datos[i].correo + "');guardardatos4('" + datos[i].id + "')");
                boton.setAttribute("class", "btn btn-primary pull-right btnSeparador");
                boton.innerHTML = "Evaluar";

                link.appendChild(boton);

                cuerpo.appendChild(link);


                document.getElementById('contenedor' + i).appendChild(cuerpo);
            }
        }
        else {
            alert(Respuesta);
        }
    }
    );
}

