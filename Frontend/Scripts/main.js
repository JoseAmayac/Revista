
function prueba()
{
    let form = document.getElementById("subirArchivo");
    subirArchivos(form);
} 

function subirArchivos(form)
{
    let peticion = new XMLHttpRequest();

    peticion.open('post','../../Backend/Models/subir.php');
    peticion.send(new FormData(form));
}