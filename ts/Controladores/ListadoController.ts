// Espera a que se cargue el DOM antes de ejecutar la función cargarpagina
document.addEventListener('DOMContentLoaded', function() {
  cargarpagina();
});

// Función para cargar la página
async function cargarpagina() {
  const paginajson = localStorage.getItem('pagina');
  let pagina = paginajson ? JSON.parse(paginajson) : { currentpage: "https://digi-api.com/api/v1/digimon?pageSize=30&xAntibody=false&page=0" };
  await CargarDigimon(pagina.currentpage);
  $('#paginaactual').text(pagina.currentpage);
  actualizarvista();
}

// Función para pintar un digimon en la lista
function pintarlista(digimon:Card) {
  const listado = $("#lista");
  let copia = $("#cartica").clone(true, true);
  copia.removeAttr('id');
  copia.find('.card-title').text(digimon.nombre);
  copia.find('.card-img-top').attr('src', digimon.imagen);
  copia.find('.enlace-digimon').attr('href', "Datos.html?id=" + digimon.id);
  copia.appendTo(listado).show();
}

// Función para cargar la página siguiente
async function pagAdelante() {
  let numpagina=0;
  let pagina = new Pagina("0", "0", "0", "0");
  let paginajson = localStorage.getItem('pagina');
  if (paginajson !== null) {
    pagina = JSON.parse(paginajson);
    if (pagina.nextpage == "") {
      pagina.nextpage = "https://digi-api.com/api/v1/digimon?pageSize=30&xAntibody=false&page="+pagina.currentpage;
    }
     numpagina = parseInt(pagina.currentpage) + 1;
  }

  $('#lista').empty();
  await CargarDigimon(pagina.nextpage);
  $('#paginaactual').text(numpagina);
  actualizarvista();
}

// Función para cargar la página anterior
async function pagAtras() {
  let numpagina=0;
  let pagina = new Pagina("0", "0", "0", "0");
  let paginajson = localStorage.getItem('pagina');
  if (paginajson !== null) {
    pagina = JSON.parse(paginajson);
    if (pagina.previouspage == "") {
      pagina.previouspage = "https://digi-api.com/api/v1/digimon?pageSize=30&xAntibody=false&page="+pagina.currentpage;
    }
      numpagina = parseInt(pagina.currentpage) - 1;
  }
 
  $('#lista').empty();
  await CargarDigimon(pagina.previouspage);
  $('#paginaactual').text(numpagina);
  actualizarvista();
}

// Función para actualizar la vista con los digimon almacenados en el localStorage
function actualizarvista() {
  const digimoncardsString = localStorage.getItem('digimoncards');
  if (digimoncardsString) {
    const digimondcardslist = JSON.parse(digimoncardsString);
    digimondcardslist.forEach((digimon:Card) => {
      pintarlista(digimon);
    });
  }
}
