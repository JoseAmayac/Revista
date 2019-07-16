<?php
class Par extends Persona
{
    private $estudios;

    function __construct($estudios)
    {
        parent::__construct();
        $this -> estudios = $estudios;

    }

    function evaluar()
    {
        
    }
}


?>