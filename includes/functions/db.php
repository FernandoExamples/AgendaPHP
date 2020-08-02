<?php

$DB_USER = 'fernando';
$DB_PASSWORD = '123456';
$DB_HOST = 'localhost';
$DB_NAME = 'agenda';

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME);
$conn->set_charset('utf8');

/**
 * si connect_error no vale 0 significa que nada fallo
 */
if($conn->connect_errno){
    echo 'Error al conectarse a la BD';
    exit();
}