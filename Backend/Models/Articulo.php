<?php
include_once("Conexion.php");
class Articulo 
{
    private $titulo;
    private $tema;
    private $palabraClave;
    private $resumen;
    private $ruta;
    var $conexion;
    private $correoExterno;

    function __construct($titulo,$tema,$palabraClave,$resumen,$ruta,$correoExterno)
    {
        $this -> titulo = $titulo;
        $this -> tema = $tema;
        $this -> palabraClave = $palabraClave;
        $this -> resumen = $resumen;
        $this -> ruta = $ruta;

        $this -> correoExterno = $correoExterno;
        $this->conexion = new Conexion();
    }

    function ingresarBD()
    {
        $sql = "insert into articulo values('$this->titulo','$this->tema','$this->palabraClave','$this->resumen','$this->ruta','$this->correoExterno','recibido','')";
        mysqli_query($this->conexion->getdb(),$sql);
        $this->organizarArchivo();
        echo json_encode("../../Frontend/Vistas/articuloCorrecto.html");
    }


    function organizarArchivo()
    {
        $sql = "select * from articulo where titulo='$this->titulo' and tema='$this->tema' and palabraclave='$this->palabraClave' and resumen='$this->resumen'";
        $consulta=mysqli_query($this->conexion->getdb(),$sql);

        $res = mysqli_fetch_row($consulta);
        $ruta = $res[4];
        $archivo = explode("/", $ruta);
        $nom = $archivo[count($archivo)-1];

        $tipoArchivo = explode(".",$nom);
        $tipoArchivo = $tipoArchivo[count($tipoArchivo)-1]; 

        $rutaNueva = "C:/xampp/htdocs/revista/Backend/Models/archivos/".$res[7].".".$tipoArchivo;
        rename($ruta, $rutaNueva);

        $sql = "update articulo set ruta = '$rutaNueva' where  id =" . $res[7];
        mysqli_query($this->conexion->getdb(),$sql);
    }

    function moverArchivo()
    {
        $nombre_temporal = $_FILES['buscar']['tmp_name'];
        $nombre = $_FILES['buscar']['name'];
        move_uploaded_file($nombre_temporal,'archivos/'.$nombre);
        return 'archivos/'.$nombre.'Articulo';
    }

    function obtenerArticulo()
    {
        $sql ="select * from articulo order by id desc";
        $articulo = mysqli_query($this->conexion->getdb(),$sql);
        $contador = 0;

        while ($res = mysqli_fetch_row($articulo)) 
        {
            $respuesta = array("titulo" =>"".$res[0] ,
                               "tema" => "".$res[1],
                               "palabraClave" => "".$res[2],
                                "resumen" => "".$res[3],
                                "ruta" => "".$res[4],
                                "correo" => "".$res[5],
                                "estado" => "".$res[6],
                                "id" => "".$res[7]);
            $M[$contador] = $respuesta;
            $contador++;
        }
        $respuesta=$M;
        echo json_encode($respuesta,true);
    }


    function obtenerArticuloPar($idPar)
    {
        $sql ="select * from articulo where id=$idPar ";
        $articulo = mysqli_query($this->conexion->getdb(),$sql);
        

        $res = mysqli_fetch_row($articulo);
        
        $respuesta = array("titulo" =>"".$res[0] ,
                            "tema" => "".$res[1],
                            "palabraClave" => "".$res[2],
                            "resumen" => "".$res[3],
                            "ruta" => "".$res[4],
                            "correo" => "".$res[5],
                            "estado" => "".$res[6],
                            "id" => "".$res[7]);
            
        return $respuesta;
    }

    function actualizarEstado($estado,$id)
    {
        $sql = "update articulo set estado= '$estado' where id= '$id'";
        mysqli_query($this->conexion->getdb(),$sql);                
    }

    function eliminarArticulo($idEliminar)
    {
        $sql = "delete from articulo where id='$idEliminar'";
        mysqli_query($this->conexion->getdb(),$sql);  
        echo json_encode("I");
    }

    function descargarArticulo($id)
    {
        $sql = "select ruta from articulo where id = $id";
        $consulta = mysqli_query($this->conexion->getdb(),$sql);  
        $res = mysqli_fetch_row($consulta);
        $archivo=$res[0];
        $nombre = basename($archivo);
        
        $source = file_get_contents($archivo);
        file_put_contents('C:/Users/josea/Desktop/Descargas/'.$nombre, $source);
        
        echo json_encode($archivo);
    }

    function getNombre($id)
    {
        $sql = "select titulo from articulo where id = $id";
        $consulta = mysqli_query($this->conexion->getdb(),$sql);  
        $res = mysqli_fetch_row($consulta);
        $archivo=$res[0];
        
        return $archivo;
    }

    function getCorreo($id)
    {
        $sql = "select correo from articulo where id = $id";
        $consulta = mysqli_query($this->conexion->getdb(),$sql);  
        $res = mysqli_fetch_row($consulta);
        $archivo=$res[0];
        return $archivo;
    }

    function buscarArticulo($termino)
    {
        $sql = "select * from articulo where titulo like '%".$termino."%' or tema like '%".$termino."%' or palabraClave like '%".$termino."%' or resumen like '%".$termino."%'";
        $articulo = mysqli_query($this->conexion->getdb(),$sql);
        $contador = 0;

        if($articulo->num_rows>0)
        {
            while ($res = mysqli_fetch_row($articulo)) 
            {   
                $respuesta = array("titulo" =>"".$res[0] ,
                                   "tema" => "".$res[1],
                                   "palabraClave" => "".$res[2],
                                    "resumen" => "".$res[3],
                                    "ruta" => "".$res[4],
                                    "correo" => "".$res[5],
                                   "estado" => "".$res[6],
                                    "id" => "".$res[7]);
                $M[$contador] = $respuesta;
                $contador++;
            }
            $respuesta=$M;
            echo json_encode($respuesta,true);
        }
        else
        {
            echo json_encode("Sin resultados");
        }
    }


    function buscarArticuloPar($termino,$idBusqueda)
    {
        $sql = "select * from articulo where (titulo like '%".$termino."%' or tema like '%".$termino."%' or palabraClave like '%".$termino."%' or resumen like '%".$termino."%') and id=$idBusqueda";
        $articulo = mysqli_query($this->conexion->getdb(),$sql);
        $contador = 0;

        if($articulo->num_rows>0)
        {
                $res = mysqli_fetch_row($articulo);
                $respuesta = array("titulo" =>"".$res[0] ,
                                   "tema" => "".$res[1],
                                   "palabraClave" => "".$res[2],
                                    "resumen" => "".$res[3],
                                    "ruta" => "".$res[4],
                                    "correo" => "".$res[5],
                                   "estado" => "".$res[6],
                                    "id" => "".$res[7]);
                
                return $respuesta;
        }
        else
        {
            return "";
        }
    }
    
    
}
?>