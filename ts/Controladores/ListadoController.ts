document.addEventListener('DOMContentLoaded', function() {
  let digimondcardslist: Card[] = [];
  let pagina = obtenerParametroDeURL("pagina");

    CargarDigimon(pagina);
    const digimoncardsString = localStorage.getItem('digimoncards');
    
    if (digimoncardsString !== null) {
      digimondcardslist = JSON.parse(digimoncardsString);
      console.log(digimondcardslist);
      digimondcardslist.forEach((digimon: Card) => {
      console.log(pagina);
      pintarlista(digimon);
    });
  }
});


function pintarlista(digimon: Card) {
  const listado = $("#lista");
  let copia = $("#cartica").clone(true, true);
  copia.removeAttr('id');
  copia.find('.card-title').text(digimon.nombre);
  copia.find('.card-img-top').attr('src', digimon.imagen);
  copia.find('.enlace-digimon').attr('href', "Datos.html?id=" + digimon.id);
  copia.appendTo(listado).show();
}

function pagAtras() {
  const paginaActual = obtenerParametroDeURL("pagina");
  if (paginaActual > 0) {
    irA((paginaActual - 1).toString());
  }
}

function pagAdelante() {
  const paginaActual = obtenerParametroDeURL("pagina");
  if (paginaActual < 49) {
    irA((paginaActual + 1).toString());
  }
}

function obtenerParametroDeURL(pagina: string): number {
  const urlActual = window.location.href;
  const parametrosURL = new URLSearchParams(new URL(urlActual).search);
  let valorParametro = parametrosURL.get(pagina);
  if (valorParametro === null) {
    valorParametro = "0";
  }
  return parseInt(valorParametro);
}

function irA(pagina: string) {
  window.location.href = "Listado.html?pagina=" + pagina;
}
