// Espera a que se cargue el DOM antes de ejecutar la función cargarpagina
document.addEventListener('DOMContentLoaded', function() {
  cargarpagina();
});

// Función para cargar la página
function cargarpagina() {
  // Obtiene el objeto 'pagina' almacenado en el localStorage
  let paginajson = localStorage.getItem('pagina');
  
  // Declara las variables para almacenar la página actual y el objeto 'Pagina'
  let pagina;
  let paginaactual;
  
  // Comprueba si el objeto 'pagina' existe y no está vacío
  if (paginajson !== "" && paginajson !== null) {
    // Parsea el objeto 'pagina' desde JSON a objeto JavaScript
    pagina = JSON.parse(paginajson);
    paginaactual = pagina.currentpage;
  } else {
    // Si no hay ningún objeto 'pagina', asigna una URL por defecto
    paginaactual = "https://digi-api.com/api/v1/digimon?pageSize=30&xAntibody=false&page=0";
  }
  
  // Carga los digimon de la página actual
  CargarDigimon(paginaactual);
  
  // Actualiza el texto del elemento con id 'paginaactual' con la URL de la página actual
  $('#paginaactual').text(paginaactual);
  
  // Actualiza la vista
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
  let pagina = new Pagina("0", "0", "0", "0");
  let paginajson = localStorage.getItem('pagina');
  if (paginajson !== null) {
    pagina = JSON.parse(paginajson);
    if (pagina.nextpage !== "") {
      pagina.currentpage = pagina.nextpage;
    }
  }
  $('#lista').empty();
  await CargarDigimon(pagina.currentpage);
  $('#paginaactual').text(pagina.currentpage);
  actualizarvista();
}

// Función para cargar la página anterior
async function pagAtras() {
  let pagina = new Pagina("0", "0", "0", "0");
  let paginajson = localStorage.getItem('pagina');
  if (paginajson !== null) {
    pagina = JSON.parse(paginajson);
    if (pagina.previouspage !== "") {
      pagina.currentpage = pagina.previouspage;
    }
  }
  $('#lista').empty();
  await CargarDigimon(pagina.currentpage);
  $('#paginaactual').text(pagina.currentpage);
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
