document.addEventListener('DOMContentLoaded', function() {
  cargarpagina();
});

// function cargarpagina() {
//   let pagina = localStorage.getItem('pagina') ?? "0";
//   CargarDigimon(parseInt(pagina));
//   $('#paginaactual').text(pagina);
//   actualizarvista();
// }

function cargarpagina() {
  let paginajson = localStorage.getItem('pagina');
    
  let pagina: Pagina;
  let paginaactual: string;
  if(paginajson!==""&&paginajson!==null){
     pagina = JSON.parse(paginajson);
     paginaactual = pagina.currentpage;
  }else{
    paginaactual = "https://digi-api.com/api/v1/digimon?pageSize=30&xAntibody=false&page=0";
  }
  CargarDigimon(paginaactual);
  $('#paginaactual').text(paginaactual);
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

// async function pagAtras() {
//   console.log("PATRAS");
//   let pagina = localStorage.getItem('pagina') ?? "0";
//   let paginanumber = parseInt(pagina);
//   if (paginanumber > 0) {
//       paginanumber--;
//       localStorage.setItem('pagina', paginanumber.toString());
//   } 
//   $('#lista').empty();
//   await CargarDigimon(paginanumber);
//   $('#paginaactual').text(paginanumber.toString());
//   actualizarvista();
// }

// async function pagAdelante() {
//   console.log("PALANTE");
//   let pagina = localStorage.getItem('pagina') ?? "0";
//   let paginanumber = parseInt(pagina);
//   if (paginanumber < 49) {
//       paginanumber++;
//       localStorage.setItem('pagina', paginanumber.toString());
//   } 
//   $('#lista').empty();
//   await CargarDigimon(paginanumber);
//   $('#paginaactual').text(paginanumber.toString());
//   actualizarvista();
// }

async function pagAdelante() {
  let pagina :Pagina=new Pagina("0","0","0","0");
  let paginajson = localStorage.getItem('pagina');
  if(paginajson!==null){
     pagina = JSON.parse(paginajson);
    if(pagina.nextpage!==""){
    pagina.currentpage = pagina.nextpage;
 }
}
$('#lista').empty();
await CargarDigimon(pagina.currentpage);
$('#paginaactual').text(pagina.currentpage);
actualizarvista();
}

async function pagAtras() {
  let pagina :Pagina=new Pagina("0","0","0","0");
  let paginajson = localStorage.getItem('pagina');
  if(paginajson!==null){
     pagina = JSON.parse(paginajson);
    if(pagina.previouspage!==""){
    pagina.currentpage = pagina.previouspage;
 }
}
$('#lista').empty();
await CargarDigimon(pagina.currentpage);
$('#paginaactual').text(pagina.currentpage);
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
