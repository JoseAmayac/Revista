<?php
include_once("conexion.php");
include_once("Articulo.php");
include_once("Asignacion.php");
include_once("Notificacion.php");
class Evaluacion
{
    var $nota;
    var $comentario;
    var $idArticulo;
    var $conexion;
    var $articulo;
    var $asignacion;
    var $notificacion;
    

    function __construct($nota,$comentario,$idArticulo)
    {
        $this -> nota = $nota;
        $this -> comentario = $comentario;
        $this -> idArticulo = $idArticulo;
        $this -> articulo = new Articulo("","","","","","");
        $this -> conexion = new Conexion();
        $this -> asignacion = new Asignacion("","");
        

    }

    function agregarEvaluacion()
    {
        $sql = "insert into evaluacion values('$this->nota','$this->comentario','$this->idArticulo')";
        mysqli_query($this->conexion->getdb(),$sql);
        $this->cambiarEstado();
        $this->eliminarAsignacion();
        echo json_encode("http://localhost/revista/Frontend/Vistas/listaArticulosPar.html");
    }

    function verificarEvaluaciones()
    {
        $sql = "select * from evaluacion where idArticulo='$this->idArticulo'";
        $registros = mysqli_query($this->conexion->getdb(),$sql);
        $num = $registros->num_rows;
        $suma=0;
        $promedio=-1;
        
        if($num==3)
        {
            while($res = mysqli_fetch_row($registros))
            {
                $suma = $res[0]+$suma;
            }
            $promedio = $suma/3;
        }
        return $promedio;
    }

    function obtenerEvaluacion()
    {
        $sql = "select * from evaluacion where idArticulo= $this->idArticulo";
        $consulta = mysqli_query($this->conexion->getdb(),$sql);
        $comentario="";
        $contador=1;
        while ($registros = mysqli_fetch_row($consulta))
        {
            $comentario =$comentario.$contador.". ".$registros[1]."  ";
            $contador++;
        }
        return $comentario;
    }

    function cambiarEstado()
    {
        $notaFinal = $this->verificarEvaluaciones();
        $estado;
        $mensaje = "";
        if($notaFinal != -1)
        {
            if($notaFinal >= 4)
            {
                $estado="aceptado";
                $mensaje = "Tú articulo (".$this -> articulo ->getNombre($this->idArticulo).") fue aceptado con una nota de: ".$notaFinal;
            }

            if($notaFinal >=3 &&$notaFinal < 4)
            {
                $estado="pendiente";
                $mensaje = "Tú articulo (".$this -> articulo ->getNombre($this->idArticulo).") quedo pendiente con una nota de: ".$notaFinal .". Estos son los comentarios: ".$this->obtenerEvaluacion();
            }

            if($notaFinal<3)
            {
                $estado="rechazado";
                $mensaje = "Tú articulo (".$this -> articulo ->getNombre($this->idArticulo).") fue rechazado con una nota de: ".$notaFinal;
            }

            $this -> articulo -> actualizarEstado($estado,$this->idArticulo);
            $this -> notificacion= new Notificacion("Los pares han evaluado un articulo (".$this -> articulo ->getNombre($this->idArticulo).")","Sistema","Admin123@autonoma.edu.co");
            $this -> notificacion ->agregarNotificacion("calificado");

            $notificacionUsuario = new Notificacion($mensaje,"Sistema",$this-> articulo ->getCorreo($this->idArticulo));
            $notificacionUsuario -> agregarNotificacion("pendiente");
        }
    }


    function eliminarAsignacion()
    {
        $this -> asignacion ->eliminarAsignacion($this->idArticulo);
    }

}
?>