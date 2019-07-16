<?php
    $nombre_temporal = $_FILES['buscar']['tmp_name'];
    $nombre = $_FILES['buscar']['name'];
    echo $nombre;
    move_uploaded_file($nombre_temporal,'archivos/'.$nombre);
?>