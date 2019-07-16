<?php
    include_once("../Models/Persona.php");
    include_once("../Models/Autor.php");

    class CrudPersona
    {
      function ingresarUsuario($nombre,$email,$direccion,$telefono,$afiliacion,$contraseña)
      {   
        $persona = new Autor($nombre,$email,$direccion,$telefono,$afiliacion,$contraseña);
        $persona -> ingresarBD();
      }  

      function consultarUsu($correo,$clave)
      {
        $persona = new Autor('',$correo,'','','',$clave);
        $persona -> consultarUsuario($correo,$clave);
      }

      function cerrarUsu()
      {
        $persona = new Autor('','','','','','');
        $persona -> cerrar();
      }

      function obtenerUsu()
      {
            $persona = new Autor("","","","","","");
            $persona -> obtenerAutor();
      }

      function obtenerNombreUsu()
      {
          $persona = new Autor("","","","","","");
          $persona -> getNombre();
      }

      function eliminarUsu($correo)
      {
        $persona = new Persona("","","","","","");
        $persona -> eliminarPersona($correo);
      }

      function buscarUsu($termino)
      {
        $persona = new Persona("","","","","","");
        $persona -> buscarPersona($termino);
      }

      function aceptarPar()
      {
        $persona = new Persona("","","","","","");
        $persona -> aceptarPar();
      }
    }

    
    $per1 = new CrudPersona();
    if($_REQUEST["id"] == 1)
    {
        $per1 -> ingresarUsuario($_REQUEST["nom"],$_REQUEST["corr"],$_REQUEST["dir"],$_REQUEST["tel"],$_REQUEST["afil"],$_REQUEST["pass"]);
    }

    if($_REQUEST["id"] == 2)
    {
        $per1 -> consultarUsu($_REQUEST["emi"] , $_REQUEST["con"]);
    }

    if($_REQUEST["id"] == 3)
    {
        $per1 -> cerrarUsu();
    }

    if($_REQUEST["id"] == 4)
    {
        $per1 -> obtenerUsu();
    } 

    if($_REQUEST["id"] == 5)
    {
        $per1 -> obtenerNombreUsu();
    } 
    if($_REQUEST["id"] == 11)
    {
        $per1 -> eliminarUsu($_REQUEST["corr"]);
    }

    if($_REQUEST["id"] == 7)
    {
        $per1 -> buscarUsu($_REQUEST["terminoBuscar"]);
    }
    if($_REQUEST["id"] == 9)
    {
        $per1 -> aceptarPar();
    }
?>