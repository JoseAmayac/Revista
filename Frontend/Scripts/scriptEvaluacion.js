
var bande = false;
function insertarEvaluacion() {
    bande = true;
    verificarLlenos();
    let nota = document.getElementById("titulo").value;
    let resumen = document.getElementById("resumen").value;
    let idArticulo = document.getElementById("articuloId").value;
    if (bande) {
        $.post("../../Backend/Controllers/CrudEvaluacion.php", { notaArticulo: nota, resumenArticulo: resumen, idArticuloC: idArticulo, id: 1 }, function (Respuesta) {
            alert("Has evaluado este artículo");
            redireccionar(JSON.parse(Respuesta));
        }
        );
    }
}

function verificarLlenos() {
    let nota = document.getElementById("titulo").value;

    if (nota == "") {
        alert("Debes proporcionar una nota para el artículo");
        bande = false;
    }
    if(nota > 5 || nota < 0)
    {
        alert("La nota debe estar entre 0 y 5");
        bande = false;
    }
    if(isNaN(nota))
    {
        alert("La nota debe ser un número");
        bande =false;
    }
}       

function redireccionar(ruta) 
{
    window.location = ruta;
}