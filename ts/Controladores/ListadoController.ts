

function mostrarpagina(pagina){

  //OBtener filtro
  //mandar url get
  const digimonarray = JSON.parse(localStorage.getItem('digimoncards') || '[]');



}

  function pintarlista(digimon: Digimon) {
    console.log(digimon.imagen);
    console.log(digimon.name);
 
    

    const listado = $("#lista");
    let copia = $("#cartica").clone(true, true); // Clonar el div #cartica
    copia.removeAttr('id'); // Eliminar el atributo id de la copia
    copia.find('.card-title').text(digimon.name); // Cambiar el texto
    copia.find('.card-img-top').attr('src', digimon.imagen); // Cambiar la imagen
    copia.appendTo(listado).show(); // Agregar la copia al contenedor deseado y mostrarla
}