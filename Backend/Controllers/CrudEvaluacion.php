<?php
include_once("../Models/Evaluacion.php");
class CrudArticulo
{
    function insertarEvaluacion($nota,$comentario,$idArticulo)
    {
        $evaluacion = new Evaluacion($nota,$comentario,$idArticulo);
        $evaluacion -> agregarEvaluacion();
    }
}

$Obj = new CrudArticulo();
if($_REQUEST["id"] == 1)
{
    $Obj -> insertarEvaluacion($_REQUEST['notaArticulo'],$_REQUEST['resumenArticulo'],$_REQUEST['idArticuloC']);
}

?>