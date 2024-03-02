

document.addEventListener('DOMContentLoaded', function() {
CargarSelects();

// rellenarSelect("filtrotipo");
// rellenarSelect("filtrohabitat");

});

async function CargarSelects() {
   await  Cargartodoslevels();
   await CargartodosAtributos();
  rellenarSelect("filtronivel");
 rellenarSelect("filtroatributo");
}

 function rellenarSelect(nombre:string){
    const select = $("#"+nombre);
    let lista = JSON.parse(localStorage.getItem(nombre) || '[]');
    lista.forEach((element : Dato) => {
        
        const option = $('<option></option>').attr('value', element.name).text(element.name);
        select.append(option);
    });
}

function quitarfiltro(){
    localStorage.removeItem('filtros');
    actualizar();
}

function filtrar(){

    function obtenerValorComoString(valor: any): string | undefined {
        return typeof valor === 'string' ? valor : undefined;
    }
    
    let nombre = obtenerValorComoString($("#filtronombre").val());
    let nivel = obtenerValorComoString($("#filtronivel").val());
    let atributo = obtenerValorComoString($("#filtroatributo").val());

   let filtros = {
        nombre : nombre,
        nivel: nivel,
        atributo : atributo
   }

    localStorage.setItem('filtros', JSON.stringify(filtros));

  actualizar();
}

 async function actualizar(){ 
    $('#lista').empty();
    await CargarDigimon("https://digi-api.com/api/v1/digimon?pageSize=30&xAntibody=false&page=0");
    actualizarvista();
}