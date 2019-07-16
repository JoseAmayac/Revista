<?php
    include_once("Conexion.php");
    include_once("Asignacion.php");
    class Persona 
    {
        private $nombre;
        private $email;
        private $direccion;
        private $telefono;
        private $afiliacion;
        private $contraseña;
        var $conexion;

        function __construct($nombre,$email,$direccion,$telefono,$afiliacion,$contraseña)
        {
            $this -> nombre = $nombre;
            $this -> email = $email;
            $this -> direccion = $direccion;
            $this -> telefono = $telefono;
            $this -> afiliacion = $afiliacion;
            $this -> contraseña = $contraseña;
            $this->conexion = new Conexion();
        }

        function ingresarBD()
        {
            if($this->verificarCorreo($this->email))
            {
                $sql = "insert into persona values('$this->nombre','$this->email','$this->direccion','$this->telefono','$this->afiliacion','$this->contraseña','autor')";
                mysqli_query($this->conexion->getdb(),$sql);
                echo json_encode("../../Frontend/Vistas/registroCorrecto.html");
            }
            else
            {
                echo json_encode("El correo está en uso");
            }
        }

        function consultarUsuario($correo,$contraseña)
        {
            $sql = "select * from persona where email = "."'".$correo."'";
            $resultado = mysqli_query($this->conexion->getdb(),$sql);
            
            $array = mysqli_fetch_row($resultado);
            
                if($contraseña==$array[5] && $array[6]=="autor")
                {
                    session_start();
                    $_SESSION['nombre']=$array[0];
                    $_SESSION['email'] = $correo;
                    $_SESSION['direccion']=$array[2];
                    $_SESSION['telefono']=$array[3];
                    $_SESSION['afiliacion']=$array[4];
                    $_SESSION['contraseña']=$array[5];
                    echo json_encode("http://localhost/revista/Frontend/Vistas/inicioLogIn.html");
                }
                else
                {
                    if($contraseña==$array[5] && $array[6]=="par")
                    {
                        session_start();
                        $_SESSION['nombre']=$array[0];
                        $_SESSION['email'] = $correo;
                        $_SESSION['direccion']=$array[2];
                        $_SESSION['telefono']=$array[3];
                        $_SESSION['afiliacion']=$array[4];
                        $_SESSION['contraseña']=$array[5];
                        echo json_encode("http://localhost/revista/Frontend/Vistas/inicioPar.html");
                    }
                    else
                    {
                        if($contraseña==$array[5] && $array[6]=="editor")
                        {
                            session_start();
                            $_SESSION['nombre']=$array[0];
                            $_SESSION['email'] = $correo;
                            $_SESSION['direccion']=$array[2];
                            $_SESSION['telefono']=$array[3];
                            $_SESSION['afiliacion']=$array[4];
                            $_SESSION['contraseña']=$array[5];
                            echo json_encode("http://localhost/revista/Frontend/Vistas/inicioEditor.html");
                        }
                        else
                        {
                            echo json_encode("Datos incorrectos");
                        }
                    }
                }
        }


        function obtenerAutor()
        {
            $sql ="select * from persona";
            $persona = mysqli_query($this->conexion->getdb(),$sql);
            $contador = 0;

            while ($res = mysqli_fetch_row($persona)) 
            {
              
                    $respuesta = array("nombre" =>"".$res[0] ,
                                   "email" => "".$res[1],
                                   "direccion" => "".$res[2],
                                   "telefono" => "".$res[3],
                                   "afiliacion" => "".$res[4],
                                   "contraseña" => "".$res[5],
                                   "tipo" => "".$res[6]);

                    $M[$contador] = $respuesta;
                    $contador++;

            }
            $respuesta=$M;
            echo json_encode($respuesta,true);
        }

        function eliminarPersona($correo)
        {
            $sql = "delete from persona where email='$correo'";
            $re = mysqli_query($this->conexion->getdb(),$sql);
            $asignacion = new Asignacion('','');
            $asignacion->eliminarAsignacionCorreo($correo);
            echo json_encode($correo);
        }

        function cerrar()
        {
            session_start();
            unset($_SESSION['nombre']);
            unset($_SESSION['email']);
            unset($_SESSION['direccion']);
            unset($_SESSION['telefono']);
            unset($_SESSION['afiliacion']);
            unset($_SESSION['contraseña']);
            session_destroy();
            
            echo json_encode("Hasta luego");
        }

        function getNombre()
        {
           session_start();
           echo json_encode($_SESSION['nombre']);
        }

        function getCorreo()
        {
            return $this -> email;
        }


    function buscarPersona($termino)
    {
        $sql = "select * from persona where nombre like '%".$termino."%' or email like '%".$termino."%' or afiliacion like '%".$termino."%' or telefono like '%".$termino."%'";
        $persona = mysqli_query($this->conexion->getdb(),$sql);
        $contador = 0;

        if($persona->num_rows>0)
        {
            while ($res = mysqli_fetch_row($persona)) 
            {   
                $respuesta = array("nombre" =>"".$res[0] ,
                                    "email" => "".$res[1],
                                    "direccion" => "".$res[2],
                                    "telefono" => "".$res[3],
                                    "afiliacion" => "".$res[4],
                                    "contraseña" => "".$res[5],
                                    "tipo" => "".$res[6]);
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

    function aceptarPar()
    {
        session_start();
        $sql = "update persona set tipo= 'par' where email= '".$_SESSION['email']."'";
        mysqli_query($this->conexion->getdb(),$sql);
        echo json_encode("http://localhost/revista/Frontend/Vistas/login.html");  
        $this -> cerrarCambio();
    }

    function cerrarCambio()
    {
        unset($_SESSION['nombre']);
        unset($_SESSION['email']);
        unset($_SESSION['direccion']);
        unset($_SESSION['telefono']);
        unset($_SESSION['afiliacion']);
        unset($_SESSION['contraseña']);
        session_destroy();
    }


    
    function verificarCorreo($correo)
    {
        $sql = "select * from persona where email = "."'".$correo."'";
        $resultado = mysqli_query($this->conexion->getdb(),$sql);
        $num = $resultado->num_rows;
        if($num==0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
?>