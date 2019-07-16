<?php
class Autor extends Persona
{
    function __construct($nombre,$email,$direccion,$telefono,$afiliacion,$contraseña)
    {
        parent::__construct($nombre,$email,$direccion,$telefono,$afiliacion,$contraseña);
    }

    function enviarArticulo()
    {
        
    }

    function modificarArticulo()
    {

    }
}
?>