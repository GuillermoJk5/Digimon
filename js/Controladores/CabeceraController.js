"use strict";
document.addEventListener('DOMContentLoaded', function () {
    // rellenarSelect("filtronivel");
    // rellenarSelect("filtroatributo");
    // rellenarSelect("filtrotipo");
    // rellenarSelect("filtrohabitat");
});
function rellenarSelect(select) {
    const levels = $(select);
    let nombrelista = "";
    switch (select) {
        case "filtronivel":
            nombrelista = "listalevels";
            console.log("nivel");
            break;
        case "filtroatributo":
            nombrelista = "listaatributos";
            break;
        case "filtrohabitat":
            nombrelista = "listafields";
            break;
        case "filtrotipo":
            nombrelista = "listatipos";
            break;
        default:
            break;
    }
    let lista = JSON.parse(localStorage.getItem(nombrelista) || '[]');
    lista.forEach((element) => {
        console.log(element.name);
        levels.append('<option value="' + element.id + '">' + element.name + '</option>');
    });
}
function quitarfiltro() {
    localStorage.removeItem('filtros');
}
function filtrar() {
    function obtenerValorComoString(valor) {
        return typeof valor === 'string' ? valor : undefined;
    }
    let nombre = obtenerValorComoString($("#filtronombre").val());
    let nivel = obtenerValorComoString($("#filtronivel").val());
    let atributo = obtenerValorComoString($("#filtroatributo").val());
    let tipo = obtenerValorComoString($("#filtrotipo").val());
    let habitat = obtenerValorComoString($("#filtrohabitat").val());
    let filtros = {
        nombre: nombre,
        nivel: nivel,
        atributo: atributo,
        tipo: tipo,
        habitat: habitat
    };
    localStorage.setItem('filtros', JSON.stringify(filtros));
    CargarDigimon(0);
}
//# sourceMappingURL=CabeceraController.js.map