<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input type="text" placeholder="Nombre Contacto:" id="nombre" name="nombre"
            value="<?php echo $contacto['nombre'] ? $contacto['nombre'] : ''; ?>">
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input type="text" placeholder="Empresa:" id="empresa" name="empresa"
            value="<?php echo $contacto['empresa'] ? $contacto['empresa'] : ''; ?>">
    </div>
    <div class="campo">
        <label for="telefono">Telefono:</label>
        <input type="tel" placeholder="Teléfono:" id="telefono" name="telefono"
            value="<?php echo $contacto['telefono'] ? $contacto['telefono'] : ''; ?>">
    </div>
</div>

<div class="campo justify-rigth">
    <?php
        $textoBtn = $contacto['nombre'] ? 'Guardar' : 'Añadir';
        $accion = $contacto['nombre'] ? 'editar' : 'crear';
    ?>
    <input type="hidden" id="accion" name="accion" value="<?php echo $accion; ?>">
    <?php if (isset($contacto['id_contacto'])) { ?>

    <input type="hidden" id="id" name="id" value="<?php echo $contacto['id_contacto']; ?>">

    <?php } //Fin del if?>
    <input type="submit" value="<?php echo $textoBtn; ?>" class="btn btn-primario">
</div>