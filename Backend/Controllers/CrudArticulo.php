<?php
include_once("../Models/Articulo.php");
include_once("../Models/Persona.php");
include_once("../Models/Autor.php");

class CrudArticulo
{
    var $articuloObtenido;
    function ingresarArti($titulo,$tema,$palabraClave,$resumen,$ruta)
    {
        session_start();
        if(isset($_SESSION['nombre']))
        {
            $autor = new Autor($_SESSION['nombre'],$_SESSION['email'],$_SESSION['direccion'],$_SESSION['telefono'],$_SESSION['afiliacion'],$_SESSION['contraseña']);
            $articulo = new Articulo($titulo,$tema,$palabraClave,$resumen,"C:/xampp/htdocs/revista/Backend/Models/archivos/".$ruta,$autor->getCorreo());
            $articulo -> ingresarBD();
        }       
    }

    function descargarArti($id)
    {
    
        $articulo = new Articulo('','','','','','');
        $articulo -> descargarArticulo($id);
               
    }

    function obtenerArti($tipo)
    {
        if($tipo==0)
        {
            $articulo = new Articulo("","","","","","");
            $articulo -> obtenerArticulo();
        }else{
            session_start();
            if(isset($_SESSION['nombre']))
            {
                $articulo = new Articulo("","","","","","");
                $articulo -> obtenerArticulo();
            }
        }
    }

    function eliminarArt($idEliminar)
    {
        session_start();
        if(isset($_SESSION['nombre']))
        {
            $articulo = new Articulo("","","","","","");
            $articulo -> eliminarArticulo($idEliminar);
        }
    }

    function publicarArt($idPublicar)
    {
        session_start();
        if(isset($_SESSION['nombre']))
        {
            $articulo = new Articulo("","","","","","");
            $articulo -> actualizarEstado("publicado",$idPublicar);
        }
    }

    function buscarArti($terminoBusqueda)
    {
        $articulo = new Articulo("","","","","","");
        $articulo -> buscarArticulo($terminoBusqueda);
    }
}
    $per1 = new CrudArticulo();
    if($_REQUEST["id"] == 1)
    {
        $per1 -> ingresarArti($_REQUEST["titu"],$_REQUEST["tema"],$_REQUEST["clave"],$_REQUEST["res"],$_REQUEST["ruta"]);
    }

    if($_REQUEST["id"] == 20)
    {
        $per1 -> obtenerArti($_REQUEST["tipoUsuario"]);
    }

    if($_REQUEST["id"] == 3)
    {
        $per1 -> eliminarArt($_REQUEST["artiId"]);
    }

    if($_REQUEST["id"] == 4)
    {
        $per1 -> publicarArt($_REQUEST["artiId"]);
    }
    if($_REQUEST["id"] == 5)
    {
        $per1 -> descargarArti($_REQUEST["idArti"]);
    }

    if($_REQUEST['id'] == 6)
    {
        $per1 -> buscarArti($_REQUEST['buscado']);
    }
?>