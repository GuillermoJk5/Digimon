document.addEventListener('DOMContentLoaded', function() {
  cargarpagina();
});

function cargarpagina() {
  let pagina = localStorage.getItem('pagina') ?? "0";
  CargarDigimon(parseInt(pagina));
  $('#paginaactual').text(pagina);
  actualizarvista();
}

function pintarlista(digimon:Card) {
  const listado = $("#lista");
  let copia = $("#cartica").clone(true, true);
  copia.removeAttr('id');
  copia.find('.card-title').text(digimon.nombre);
  copia.find('.card-img-top').attr('src', digimon.imagen);
  copia.find('.enlace-digimon').attr('href', "Datos.html?id=" + digimon.id);
  copia.appendTo(listado).show();
}

async function pagAtras() {
  console.log("PATRAS");
  let pagina = localStorage.getItem('pagina') ?? "0";
  let paginanumber = parseInt(pagina);
  if (paginanumber > 0) {
      paginanumber--;
      localStorage.setItem('pagina', paginanumber.toString());
  } 
  $('#lista').empty();
  await CargarDigimon(paginanumber);
  $('#paginaactual').text(paginanumber.toString());
  actualizarvista();
}

async function pagAdelante() {
  console.log("PALANTE");
  let pagina = localStorage.getItem('pagina') ?? "0";
  let paginanumber = parseInt(pagina);
  if (paginanumber < 49) {
      paginanumber++;
      localStorage.setItem('pagina', paginanumber.toString());
  } 
  $('#lista').empty();
  await CargarDigimon(paginanumber);
  $('#paginaactual').text(paginanumber.toString());
  actualizarvista();
}

function actualizarvista() {
  let digimondcardslist = [];
  const digimoncardsString = localStorage.getItem('digimoncards');
  
  if (digimoncardsString !== null) {
      digimondcardslist = JSON.parse(digimoncardsString);
      console.log(digimondcardslist);

      digimondcardslist.forEach((digimon:Card) => {
          pintarlista(digimon);
      });
  }
}
