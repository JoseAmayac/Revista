<?php
include_once("../Models/Notificacion.php");
class CrudNotificacion
{
    function insertarNotificacion($mensaje,$receptor,$tipo)
    {
        session_start();
        if(isset($_SESSION['nombre']))
        {
            $notificacion = new Notificacion($mensaje,$_SESSION['email'],$receptor);
            $notificacion -> agregarNotificacion($tipo); 
        }
    }

    function listarNotificaciones()
    {
        session_start();
        if(isset($_SESSION['nombre']))
        {
            $notificacion = new Notificacion("","","");
            $notificacion -> listarNotificaciones($_SESSION['email']); 
        }
    }

    function eliminarNoti($idEliminar)
    {
        $notificacion = new Notificacion("","","");
        $notificacion -> borrarNotificacion($idEliminar);
    }
}

$obj = new CrudNotificacion();

if($_REQUEST['id'] == 1)
{
    $obj -> insertarNotificacion($_REQUEST['mensajeInv'],$_REQUEST['recibe'],$_REQUEST['tipoN']);
}

if($_REQUEST['id'] == 2)
{
    $obj -> listarNotificaciones();
}

if($_REQUEST['id'] == 3)
{
    $obj -> eliminarNoti($_REQUEST['idNotificacion']);
}

?>