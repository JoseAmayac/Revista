function validarArticulo() {
	let bandera1 = true;
	let bandera2 = true;
	let titulo = document.getElementById("titulo").value;
	let tema = document.getElementById("tema").value;
	let palabraClave = document.getElementById("palabraClave").value;
	let resumen = document.getElementById("resumen").value;
	let entrada = document.getElementById("entrada").value;
	if (titulo == "" || tema == "" || resumen == "") {
		alert("Debes diligenciar todos los campos requeridos");
		bandera1 = false;
	}
	if (entrada == "") {
		alert("Debes seleccionar el archivo a subir");
		bandera2 = false;
	}

	if (bandera1 && bandera2) {
		let form = document.getElementById("subirArchivo");
		subirArchivos(form);
		$.post("../../Backend/Controllers/CrudArticulo.php", { titu: titulo, tema: tema, clave: palabraClave, res: resumen, ruta: entrada, id: 1 }, function (Respuesta) {
			enviarNotificacion('Admin123@autonoma.edu.co', 'Se te ha enviado un nuevo articulo (' + titulo + ')', 'enviado');
			redireccion(Respuesta);
		}
		);
	}
}

function buscarArticulo(usuario)
{
	let termino = document.getElementById("busqueda").value;
	$.post("../../Backend/Controllers/CrudArticulo.php", { buscado: termino, id: 6 }, function (Respuesta) {
		if (JSON.parse(Respuesta) != "Sin resultados") {
			$("#caja").remove();
			datos = jQuery.parseJSON(Respuesta);
			for (var i in datos)
			{
				if (datos[i].estado == "publicado"&&usuario=="lector") 
				{
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

				if (usuario == "Admin") 
				{
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

					if (datos[i].estado == "aceptado") 
					{

						var boton1 = document.createElement("button");
						boton1.setAttribute("class", "btn btn-success pull-right btnSeparador");
						boton1.setAttribute("onClick", "publicarArticulo(" + datos[i].id + ");enviarNotificacion('" + datos[i].correo + "','Tu articulo (" + datos[i].titulo + ") ha sido publicado','publicacion');location.reload()");
						boton1.innerHTML = "Publicar";

						cuerpo.appendChild(boton1);
					}

					if (datos[i].estado == "recibido")
					{
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

					if (datos[i].estado == "rechazado")
					{
						boton.removeAttribute("class", "btn-primary");
						boton.setAttribute("class", "btn btn-danger pull-right btnSeparador");
						boton.innerHTML = "Eliminar";
						boton.setAttribute("OnClick", "EliminarArticulo(" + datos[i].id + ");enviarNotificacion('" + datos[i].correo + "','Tu articulo (" + datos[i].titulo + ") ha sido eliminado','eliminacion');location.reload()");
						cuerpo.appendChild(boton);
					}
					var boton = document.createElement("button");
					boton.setAttribute("class", "btn btn-primary pull-right btnSeparador");
					boton.setAttribute("onClick", "descargarArticulo(" + datos[i].id + ")");
					boton.innerHTML = "Descargar";
	
					cuerpo.appendChild(boton);
					document.getElementById('contenedor' + i).appendChild(cuerpo);
				}
			}
		}
		else {
			alert(Respuesta);
		}
	});
}


function obtenerRuta() {
	let primer = document.getElementById("nuestroInput").value.split('\\').pop();
	document.getElementById("entrada").value = primer;
}

function redireccion() {
	window.location = "http://localhost/revista/Frontend/Vistas/articuloCorrecto.html";
}

function cerrara() {
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
