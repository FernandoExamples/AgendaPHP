<?php include_once 'includes/templates/header.php'; ?>

<div class="contenedor-barra">
    <h1>Agenda de Contactos</h1>
</div>

<div class="bg-amarillo contenedor sombra">
    <form id="contacto" name="contacto" action="#">
        <legend>Añada un contacto <span>Todos los campos son obligatorios</span> </legend>

        <?php include_once 'includes/templates/formulario.php'; ?>
    </form>
</div>

<div class="bg-blanco contenedor sombra contactos">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>

        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar Contactos...">

        <p class="total-contactos"><span></span> Contactos</p>

        <div class="contenedor-tabla">
            <table id="listado-contactos" class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                <!-- Esta estructura se crea con JavaScript AJAX con datos de la BD. Dejo el comentario de referencia -->
                    <!-- <tr>
                        <td>Juan</td>
                        <td>Udemy</td>
                        <td>018003435</td>
                        <td>
                            <a href="editar.php?id=1" class="btn-icon btn-editar">
                                <i class="fas fa-pen-square"></i>
                            </a>
                            <button data-id="1" type="button" class="btn-icon btn-borrar">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr> -->
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php include_once 'includes/templates/footer.php'; ?>