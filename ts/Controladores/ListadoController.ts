

// URL de la API
const apiUrl = 'https://digi-api.com/api/v1/digimon?pageSize=10&xAntibody=false'; // URL de la API proporcionada

// Crear una instancia de ApiCaller
const apiCaller = new ApiCaller(apiUrl);

// Llamar al método fetchData
apiCaller.fetchData()
  .then((data: any) => {
    const digimonarray = [];

    for (const item of data) {
      digimonarray.push(item);
    }
    digimonarray.forEach(digimon => {
   pintarlista(digimon);
});
   
  })
  .catch((error: any) => {
    // Manejar el error si la llamada falla
    console.error('Error occurred:', error);
  });

  function pintarlista(digimon: Digimon) {
    const listado = $("#lista");
    let copia = $("#cartica").clone(true, true); // Clonar el div #cartica
    copia.removeAttr('id'); // Eliminar el atributo id de la copia
    copia.find('.card-title').text(digimon.name); // Cambiar el texto
    copia.find('.card-img-top').attr('src', digimon.imagen); // Cambiar la imagen
    copia.appendTo(listado).show(); // Agregar la copia al contenedor deseado y mostrarla
}