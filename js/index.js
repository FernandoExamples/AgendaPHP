(function () {
  'use strict';

  let formContacto = document.contacto;
  let listadoContactos = document.querySelector('#listado-contactos tbody');
  let buscador = document.querySelector('#buscar');

  //Listeners
  formContacto.addEventListener('submit', leerFormulario);

  if (listadoContactos) {
    listadoContactos.addEventListener('click', eliminarContacto);
    llenarTabla();
  }

  buscador.addEventListener('input', buscarContactos);

  /**
   * leerFormulario.
   * Le los datos del formulario
   * @author	Fernando Acosta
   * @since	v0.0.1
   * @version	v1.0.0	Friday, July 31st, 2020.
   * @return	void
   */
  function leerFormulario(e) {
    e.preventDefault();
    //Se puede acceder a los elementos de un formulario a partir
    //del nombre del formulario
    //Tambien se puede usar querySelector() o getElementById()
    let txtNombre = formContacto.nombre;
    let txtEmpresa = formContacto.empresa;
    let txtTelefono = formContacto.telefono;
    let accion = formContacto.accion.value;

    if (txtNombre.value && txtEmpresa.value && txtTelefono.value) {
      //peticion AJAX
      let infoContacto = new FormData();
      infoContacto.append('nombre', txtNombre.value.trim());
      infoContacto.append('empresa', txtEmpresa.value.trim());
      infoContacto.append('telefono', txtTelefono.value.trim());
      infoContacto.append('accion', accion);

      if (accion == 'crear') {
        //creamos un nuevo contacto
        insertarContacto(infoContacto);
      } else {
        //agregamos el id al formData para editarlo
        let idContacto = formContacto.id.value;
        infoContacto.append('id_contacto', idContacto);
        editarContacto(infoContacto);
      }
    } else {
      notificacion('Todos los campos son obligatorios', 'error');
    }
  }

  /**
   * insertarContacto.
   *Inserta un contacto en la base de datos
   * @author	Fernando Acosta
   * @since	v0.0.1
   * @version	v1.0.0	Friday, July 31st, 2020.
   * @param	mixed	datos
   * @return	void
   */
  function insertarContacto(datos) {
    //crear el objeto
    let xhr = new XMLHttpRequest();
    //abrir la conexion
    xhr.open('POST', 'includes/models/contacto_model.php', true);
    //procesar la respuesta
    xhr.onload = function () {
      if (this.status == 200) {
        //leer la respuesta de PHP
        let json = JSON.parse(xhr.responseText);
        let datos = json.datos;
        //inserta un nuevo registro a la tabla
        let contactElement = crearContactElement(
          datos.nombre,
          datos.empresa,
          datos.telefono,
          datos.id_contacto
        );

        //agregarlo con los contactos
        listadoContactos.appendChild(contactElement);

        //resetar el formulario
        formContacto.reset();
        notificacion('Contacto agregado exitosamente', 'exito');

        //actualizar el contador
        numeroContactos();

        console.log(json);
      }
    };
    //enviar los datos
    xhr.send(datos);
  }

  /**
   * editarContacto.
   * Actualiza un registro de la base de datos
   * @author	Fernando Acosta
   * @since	v0.0.1
   * @version	v1.0.0	Saturday, August 1st, 2020.
   * @param	mixed	datos	- un FormData con los datos que se deben actualizar
   * @return	void
   */
  function editarContacto(datos) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'includes/models/contacto_model.php', true);
    xhr.onload = function () {
      if (xhr.status == 200) {
        let json = JSON.parse(xhr.responseText);
        if (json.respuesta === 'correcto') {
          notificacion('Contacto editado exitosamente', 'exito');
        } else {
          notificacion('Hubo un error al editar al contacto', 'error');
        }

        //despues de 3 segundos redireccionar al index

        setTimeout(() => {
          window.location = 'index.php';
        }, 4000);
        console.log(json);
      }
    };
    xhr.send(datos);
  }

  /**
   * eliminarContacto.
   * Elimina un contacto de la base de datos mediante AJAX
   * @author	Fernando Acosta
   * @since	v0.0.1
   * @version	v1.0.0	Saturday, August 1st, 2020.
   * @param	mixed	event
   * @return	void
   */
  function eliminarContacto(event) {
    //asegurarse que dentro de todo el <td> se le dio click al boton
    if (event.target.parentElement.classList.contains('btn-borrar')) {
      let id = event.target.parentElement.getAttribute('data-id');
      let resp = confirm('¿Estas seguro?');
      if (resp) {
        let xhr = new XMLHttpRequest();
        xhr.open(
          'GET',
          `includes/models/contacto_model.php?id=${id}&accion=borrar`,
          true
        );
        xhr.onload = function () {
          if (xhr.status == 200) {
            let json = JSON.parse(xhr.responseText);
            console.log(json);
            if (json.respuesta === 'correcto') {
              //navegar desde el icono hasta el tr y eliminarlo del DOM
              event.target.parentElement.parentElement.parentElement.remove();
              notificacion('Contacto eliminado satisfactoriamente', 'exito');

              //actualizar el contador
              numeroContactos();
            } else notificacion(json.error, 'error');
          }
        };
        xhr.send();
      }
    }
  }

  /**
   * crearContactElement.
   * Crea un elemento <tr> de una tabla con los datos de un contacto
   * @author	Fernando Acosta
   * @since	v0.0.1
   * @version	v1.0.0	Saturday, August 1st, 2020.
   * @param	mixed	nombre
   * @param	mixed	empresa
   * @param	mixed	telefono
   * @param	mixed	id_contacto
   * @return	mixed El elemento tr creado
   */
  function crearContactElement(nombre, empresa, telefono, id_contacto) {
    let contactElement = document.createElement('tr');
    contactElement.innerHTML = `
          <td>${nombre}</td>
          <td>${empresa}</td>
          <td>${telefono}</td>
        `;

    //contenedor para los botones
    let actionsElement = document.createElement('td');

    //crear el incono de editar
    let iconoEditar = document.createElement('i');
    iconoEditar.classList.add('fas', 'fa-pen-square');

    //crea el enlace para editar
    let btnEditar = document.createElement('a');
    btnEditar.appendChild(iconoEditar);
    btnEditar.href = `editar.php?id=${id_contacto}`;
    btnEditar.classList.add('btn-icon', 'btn-editar');

    //icono de eliminar
    let iconoBorrar = document.createElement('i');
    iconoBorrar.classList.add('fas', 'fa-trash-alt');

    //boton de eliminar
    let btnBorrar = document.createElement('button');
    btnBorrar.appendChild(iconoBorrar);
    btnBorrar.classList.add('btn-icon', 'btn-borrar');
    btnBorrar.setAttribute('data-id', id_contacto);
    btnBorrar.type = 'button';

    //agregar al padre
    actionsElement.appendChild(btnEditar);
    actionsElement.appendChild(btnBorrar);

    //agregar al tr
    contactElement.appendChild(actionsElement);

    return contactElement;
  }

  /**
   * llenarTabla.
   * Llena la tabla de contactos mediante una peticion AJAX a la BD
   * @author	Fernando Acosta
   * @since	v0.0.1
   * @version	v1.0.0	Saturday, August 1st, 2020.
   * @return	void
   */
  function llenarTabla() {
    let datos = new FormData();
    datos.append('accion', 'llenar');

    //crear el objeto
    let xhr = new XMLHttpRequest();

    //abrir la conexion
    xhr.open('POST', 'includes/models/contacto_model.php', true);

    //procesar la respuesta
    xhr.onload = function () {
      if (xhr.status == 200) {
        let json = JSON.parse(xhr.responseText);
        let contactos = json.datos;

        contactos.forEach((contacto) => {
          let contactElement = crearContactElement(
            contacto.nombre,
            contacto.empresa,
            contacto.telefono,
            contacto.id_contacto
          );
          listadoContactos.appendChild(contactElement);
        });

        // console.log(json);
        numeroContactos();
      }
    };

    //mandar la solicitud
    xhr.send(datos);
  }

  /**
   * notificacion.
   *  Muestra una notificacion en pantalla agragando un div fixed dinamicamente
   * @author	Fernando Acosta
   * @since	v0.0.1
   * @version	v1.0.0	Friday, July 31st, 2020.
   * @param	mixed	mensaje
   * @param	mixed	clase - clase css que le da estilo a la notificacion -- error o exito
   * @return	void
   */
  function notificacion(mensaje, clase) {
    let notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //insertar la notificacion
    formContacto.insertBefore(
      notificacion,
      document.querySelector('form legend')
    );

    //Ocultar y mostrar la notificacion
    setTimeout(() => {
      //La clase visible se usa solo para que se pueda disminuir la transicion del opacity y que no aparezca de putazo
      notificacion.classList.add('visible');

      setTimeout(() => {
        notificacion.classList.remove('visible');

        setTimeout(() => {
          notificacion.remove();
        }, 500);
      }, 3000);
    }, 100);
  }

  /**
   * buscarContactos.
   * Busca un contacto entre todos los tr mediante una Expresion Regular
   * @author	Fernando Acosta
   * @since	v0.0.1
   * @version	v1.0.0	Sunday, August 2nd, 2020.
   * @return	void
   */
  function buscarContactos(e) {
    //la i hace que la expresion sea case insensitive
    const expression = new RegExp(e.target.value, 'i');
    let registros = document.querySelectorAll('tbody tr');

    registros.forEach((registro) => {
      registro.style.display = 'none';
      var busqueda = registro.childNodes[1].textContent.search(expression);
      if (busqueda != -1) {
        registro.style.display = 'table-row';
      }
      numeroContactos();
    });
  }

  /**
   * numeroContactos.
   * Actualiza el contador de contactos
   * @author	Fernando Acosta
   * @since	v0.0.1
   * @version	v1.0.0	Sunday, August 2nd, 2020.
   * @return	void
   */
  function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr');
    let contenedorNumero = document.querySelector('.total-contactos span');
    let total = 0;
    totalContactos.forEach((contacto) => {
      if (
        contacto.style.display === '' ||
        contacto.style.display === 'table-row'
      ) {
        total++;
      }
    });

    contenedorNumero.textContent = total;
  }
})();
