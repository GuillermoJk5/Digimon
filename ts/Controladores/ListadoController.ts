// Cuando el contenido del DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Llamar a la función para cargar los Digimon
  CargarDigimon(0);
  // Las siguientes funciones están comentadas. Pueden ser llamadas más adelante si son necesarias.
  // CargarAtributo();
  // CargarFields();
  // CargarLevels();
  // CargarTipos();
  // Mostrar la página después de cargar los Digimon
  mostrarpagina();
});

// Función para mostrar la página
function mostrarpagina() {
  // Obtener el array de Digimon del localStorage
  const digimonarray = JSON.parse(localStorage.getItem('digimoncards') || '[]');
  // Iterar sobre cada Digimon en el array y pintarlo en la lista
  digimonarray.forEach((digimon : Card) => {
      pintarlista(digimon);
  });
}

// Función para pintar un Digimon en la lista
function pintarlista(digimon: Card) {
  // Seleccionar el contenedor de la lista
  const listado = $("#lista");
  // Clonar el div #cartica
  let copia = $("#cartica").clone(true, true);
  // Eliminar el atributo id de la copia para evitar duplicados en los identificadores
  copia.removeAttr('id');
  // Cambiar el texto de la tarjeta con el nombre del Digimon
  copia.find('.card-title').text(digimon.nombre);
  // Cambiar la imagen de la tarjeta con la imagen del Digimon
  copia.find('.card-img-top').attr('src', digimon.imagen);
  // Establecer el enlace de la tarjeta para redirigir a la página de detalles del Digimon
  copia.find('.enlace-digimon').attr('href', "Datos.html?id="+digimon.id); 
  // Agregar la copia al contenedor de la lista y mostrarla
  copia.appendTo(listado).show();
}
