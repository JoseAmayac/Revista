<?php
include_once("Conexion.php");
class Notificacion
{
    var $mensaje;
    var $receptor;
    var $emisor;
    var $conexion;

    function __construct($mensaje,$emisor,$receptor)
    {
        $this -> mensaje = $mensaje;
        $this -> emisor = $emisor;
        $this -> receptor = $receptor;

        $this -> conexion = new Conexion();
    }

    function agregarNotificacion($tipo)
    {
        $sql = "insert into notificaciones values('$this->mensaje','$this->emisor','$this->receptor','$tipo','')";
        mysqli_query($this->conexion->getdb(),$sql);
       
       if($tipo=="invitacion")
        {
            echo json_encode("Invitación enviada");
        } 
       
    }

    function borrarNotificacion($id)
    {
        $sql = "delete from notificaciones where id= $id";
        mysqli_query($this->conexion->getdb(),$sql);
        echo json_encode("Notificación eliminada");
    }

    function listarNotificaciones($correoIniciado)
    {
        $sql = "select * from notificaciones where receptor='$correoIniciado' order by id desc";
        $consulta = mysqli_query($this->conexion->getdb(),$sql);
        $contador = 0;

            while ($res = mysqli_fetch_row($consulta)) 
            {
              
                    $respuesta = array("mensaje" =>"".$res[0],
                                   "emisor" => "".$res[1],
                                   "receptor" => "".$res[2],
                                   "tipo" => "". $res[3],
                                   "id" => "".$res[4]);

                    $M[$contador] = $respuesta;
                    $contador++;
            }
            $respuesta=$M;
            echo json_encode($respuesta,true);
    }
}
?>