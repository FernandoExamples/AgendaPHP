<?php include_once 'includes/templates/header.php'; ?>
<?php include_once 'includes/functions/functions.php'; ?>

<?php
   $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
   if (!$id) {
       die('No es valido');
   }

   $resultado = obtenerContacto($id);
   $contacto = $resultado->fetch_assoc();
?>

<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn btn-volver">Volver</a>
        <h1>Agenda de Contactos</h1>
    </div>
</div>

<div class="bg-amarillo contenedor sombra">
    <form id="contacto" name="contacto" action="#">
        <legend>Edite el contacto</legend>

        <?php include_once 'includes/templates/formulario.php'; ?>

    </form>
</div>

<?php include_once 'includes/templates/footer.php'; ?>