<?php

function obtenerContacto($id)
{
    include_once 'db.php';
    $sql = 'SELECT * from contacto where id_contacto='.$id;
    $result = $conn->query($sql);
    if (!$result) {
        echo 'Error al ejecutar la consulta';
    }
    $conn->close();

    return $result;
}
