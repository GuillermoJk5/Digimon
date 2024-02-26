

document.addEventListener('DOMContentLoaded', function() {
    CargarDigimon(0);
    mostrarpagina();
  });

function mostrarpagina(){

  const digimonarray = JSON.parse(localStorage.getItem('digimoncards') || '[]');
 digimonarray.forEach((digimon : Card) => {
    pintarlista(digimon);
 });


}

function pintarlista(digimon: Card) {
    console.log("Imagen>>>>" +digimon.imagen);
    console.log(digimon.nombre);
 
    

    const listado = $("#lista");
    let copia = $("#cartica").clone(true, true); // Clonar el div #cartica
    copia.removeAttr('id'); // Eliminar el atributo id de la copia
    copia.find('.card-title').text(digimon.nombre); // Cambiar el texto
    copia.find('.card-img-top').attr('src', digimon.imagen); // Cambiar la imagen
    copia.appendTo(listado).show(); // Agregar la copia al contenedor deseado y mostrarla
}