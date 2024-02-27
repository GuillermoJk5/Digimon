"use strict";
document.addEventListener('DOMContentLoaded', function () {
    CargarDigimon(0);
    // CargarAtributo();
    // CargarFields();
    // CargarLevels();
    // CargarTipos();
    mostrarpagina();
});
function mostrarpagina() {
    const digimonarray = JSON.parse(localStorage.getItem('digimoncards') || '[]');
    digimonarray;
    digimonarray.forEach((digimon) => {
        pintarlista(digimon);
    });
}
function paginamenos() {
}
function pintarlista(digimon) {
    const listado = $("#lista");
    let copia = $("#cartica").clone(true, true); // Clonar el div #cartica
    copia.removeAttr('id'); // Eliminar el atributo id de la copia
    copia.find('.card-title').text(digimon.nombre); // Cambiar el texto
    copia.find('.card-img-top').attr('src', digimon.imagen);
    copia.find('.enlace-digimon').attr('href', "Datos.html?id=" + digimon.id);
    console.log(digimon.id);
    copia.appendTo(listado).show(); // Agregar la copia al contenedor deseado y mostrarla
}
//# sourceMappingURL=ListadoController.js.map