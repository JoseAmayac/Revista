<?php

class Conexion
{ 
  private $db;	
  
public function getdb()
{
 return $this->db;	
	
}
  public function __construct()
	 { 
	 $this->db="";
	 $this->Conectar(); 
	 
	 }
	public function Conectar()
	{
	$this->db= mysqli_connect("localhost", "editor", "12345678","revista");
	}
}

?>