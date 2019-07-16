<?php
include_once("Conexion.php");
include_once("Articulo.php");
class  Asignacion
{
    var $correoPar;
    var $idArticulo;
    var $conexion;

    function __construct($correoPar,$idArticulo)
    {
        $this -> correoPar = $correoPar;
        $this -> idArticulo = $idArticulo;

        $this ->conexion = new Conexion();
    }

    function asignarPar()
    {
        $res = $this->consultaCorreoId();
        $filas = $res->num_rows;

        $res1 = $this->consultarId();
        

        if($filas == 1)
        {
            echo json_encode("Error: El par seleccionado ya tiene asignado este articulo");
        }
        else
        {
            if($res1==3)
            {
                echo json_encode("Error: No se le puede asignar mas de 3 pares a un articulo");
            }
            else
            {
                $sql = "insert into asignacion values('$this->correoPar','$this->idArticulo')";
                mysqli_query($this->conexion->getdb(),$sql);
                echo json_encode("Par asignado");
            }
        }
    }

    function consultaCorreoId()
    {
        $sql = "select * from asignacion where par = '$this->correoPar' and idArticulo=$this->idArticulo" ;
        $consulta = mysqli_query($this->conexion->getdb(),$sql);
        return $consulta;
    }

    function consultarId()
    {
        $sql = "select * from asignacion where idArticulo=$this->idArticulo" ;
        $consulta = mysqli_query($this->conexion->getdb(),$sql);
        return $consulta->num_rows;
    }

    function listarArticulos()
    {
        $sql = "select idArticulo from asignacion where par = '$this->correoPar' order by idArticulo desc";
        $consulta = mysqli_query($this->conexion->getdb(),$sql);
        $contador=0;
        $articulo = new Articulo('','','','','','','');
        
        while ($res = mysqli_fetch_row($consulta)) 
        {
            $respuesta=$articulo->obtenerArticuloPar($res[0]);
            $M[$contador] = $respuesta;
            $contador++;
        }
    
        $respuesta=$M;
        echo json_encode($respuesta,true);
    }

    function eliminarAsignacion($id)
    {
        session_start();
        $correito = $_SESSION['email'];
        $sql = "delete from asignacion where idArticulo= '$id' and par= '$correito'";
        mysqli_query($this->conexion->getdb(),$sql);
    }

    function eliminarAsignacionCorreo($correo)
    {
        $sql = "delete from asignacion where par= '$correo'";
        mysqli_query($this->conexion->getdb(),$sql);
    }

    function buscarArticulos($termino)
    {
        $sql = "select idArticulo from asignacion where par = '$this->correoPar'";
        $consulta = mysqli_query($this->conexion->getdb(),$sql);
        $contador=0;
        $articulo = new Articulo('','','','','','','');
        $M=null;
            while ($res = mysqli_fetch_row($consulta)) 
            {
                $respuesta=$articulo->buscarArticuloPar($termino,$res[0]);
                if($respuesta!="")
                {
                    $M[$contador] = $respuesta;
                    $contador++;
                } 
            }
            $respuesta=$M;
            

            if($M!=null)
            {
                if(count($M)>0)
                {
                    echo json_encode($respuesta,true);
                }
            }
            else
            {
                echo json_encode("Sin resultados");
            }
    }
}

?>