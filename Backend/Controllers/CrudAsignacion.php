<?php
include_once("../Models/Asignacion.php");
class CrudAsignacion
{
    function seleccionarPar($correoPar,$idArticulo)
    {
        session_start();
        if(isset($_SESSION['nombre']))
        {
            $asignacion = new Asignacion($correoPar,$idArticulo);
            $asignacion -> asignarPar();
        }
    }

    function mostrarArticulos()
    {
        session_start();
        if(isset($_SESSION['nombre']))
        {
            $asignacion = new Asignacion($_SESSION['email'],'');
            $asignacion -> listarArticulos();
        }
    }

    function buscarArticulos($termino)
    {
        session_start();
        if(isset($_SESSION['nombre']))
        {
            $asignacion = new Asignacion($_SESSION['email'],'');
            $asignacion -> buscarArticulos($termino);
        }
    }
    
}

$obj1 = new CrudAsignacion();
if($_REQUEST["id"] == 1)
{
    $obj1 -> seleccionarPar($_REQUEST['corrPar'],$_REQUEST['artiId']);
}

if($_REQUEST["id"] == 2)
{
    $obj1 -> mostrarArticulos();
}

if($_REQUEST["id"] == 3)
{
    $obj1 ->buscarArticulos($_REQUEST["terminoBuscar"]);
}
?>