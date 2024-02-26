

document.addEventListener('DOMContentLoaded', function() {
rellenarSelect("filtronivel");
rellenarSelect("filtroatributo");
rellenarSelect("filtrotipo");
rellenarSelect("filtrohabitat");
});


function rellenarSelect(select: string) {
    const levels = $(select);
    let nombrelista="";

    switch (select) {
        case "filtronivel":
            nombrelista="listalevels";
            break;
                case "filtroatributo":
                    nombrelista="listaatributos";
                    break;
                    case "filtrohabitat":
                        nombrelista="listafields";
                        break;
                        case "filtrotipo":
                            nombrelista="listatipos";
                            break;
    
        default:
            break;
    } 
    const lista = JSON.parse(localStorage.getItem(nombrelista) || '[]');
    
    lista.forEach((element : Dato) => {
        levels.append('<option value="' + element.id + '">' + element.name + '</option>');
    });
   
   
   
}


function filtrar(){
    let nombre = $("#filtronombre").val(); 
    let nivel = $("#filtronivel").val();
    let atributo = $("#filtroatributo").val(); 
    let tipo = $("#filtrotipo").val();
    let habitat = $("#filtrohabitat").val();

    CargarDigimonFiltro(0,nombre,nivel,atributo,habitat,nivel);

}