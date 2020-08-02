<?php

   require_once '../functions/db.php';

   if ($_POST['accion'] == 'crear') {
       //validar las entradas para evitar SQL-inyection
       $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
       $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
       $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);

       try {
           $sql = 'INSERT INTO contacto(nombre, empresa, telefono) values (?,?,?)';
           $ps = $conn->prepare($sql);
           $ps->bind_param('sss', $nombre, $empresa, $telefono);
           $ps->execute();

           if (!$ps->errno) {
               $respuesta = [
                  'respuesta' => 'correcto',
                  'datos' => [
                     'id_contacto' => $ps->insert_id,
                     'nombre' => $nombre,
                     'empresa' => $empresa,
                     'telefono' => $telefono,
                  ],
               ];
           } else {
               $respuesta = [
                  'error'->$ps->error,
               ];
           }

           $ps->close();
       } catch (Exception $e) {
           $respuesta = [
               'error' => $e->getMessage(),
            ];
       }

       echo json_encode($respuesta);
   }

   if ($_POST['accion'] == 'llenar') {
       $sql = 'SELECT * from contacto';
       $result = $conn->query($sql);

       if ($result) {
           $contactos = [];
           while ($row = $result->fetch_assoc()) {
               $contactos[] = $row;
           }

           $respuesta = [
                   'respuesta' => 'correcto',
                   'datos' => $contactos,
               ];
           echo json_encode($respuesta);
       } else {
           echo json_encode([
                   'error' => 'Hubo un error al ejecutar la consulta',
              ]);
       }
   }

   if ($_GET['accion'] == 'borrar') {
       $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
       try {
           $sql = 'DELETE from contacto where id_contacto=?';
           $ps = $conn->prepare($sql);
           $ps->bind_param('i', $id);
           $ps->execute();

           if (!$ps->errno) {
               $respuesta = [
                    'respuesta' => 'correcto',
                    'id_eliminado' => $id,
                ];
           } else {
               $respuesta = [
                'error' => 'Hubo un error al eliminar al contacto',
               ];
           }

           $ps->close();
       } catch (Throwable $e) {
           $respuesta = [
            'error' => $e->getMessage(),
          ];
       }
       echo json_encode($respuesta);
   }

   if ($_POST['accion'] == 'editar') {
       $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
       $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
       $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
       $id = filter_var($_POST['id_contacto'], FILTER_SANITIZE_NUMBER_INT);
       try {
           $sql = 'UPDATE contacto set nombre = ?, telefono=?, empresa=? where id_contacto=?';
           $ps = $conn->prepare($sql);
           $ps->bind_param('sssi', $nombre, $telefono, $empresa, $id);
           $ps->execute();
           if (!$ps->errno) {
               $respuesta = [
                'respuesta' => 'correcto',
                'id_editado' => $id,
            ];
           } else {
               $respuesta = [
                'error' => 'Hubo un error al editar al contacto: '.$id,
               ];
           }
           $ps->close();
       } catch (Throwable $th) {
           $respuesta = [
            'error' => $th->getMessage(),
          ];
       }
       echo json_encode($respuesta);
   }
   $conn->close();
