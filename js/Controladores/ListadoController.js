"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiCaller_1 = require("./ApiCaller");
// URL de la API
const apiUrl = 'https://digi-api.com/api/v1/digimon?pageSize=10&xAntibody=false'; // URL de la API proporcionada
// Crear una instancia de ApiCaller
const apiCaller = new ApiCaller_1.ApiCaller(apiUrl);
// Llamar al método fetchData
apiCaller.fetchData()
    .then((data) => {
    const digimonarray = [];
    for (const item of data) {
        digimonarray.push(item);
    }
    pintarlista(digimonarray);
})
    .catch((error) => {
    // Manejar el error si la llamada falla
    console.error('Error occurred:', error);
});
function pintarlista(digimonarray) {
    const digimonContainer = document.getElementById('digimonContainer');
    if (!digimonContainer) {
        console.error('No se encontró el contenedor de digimon.');
        return;
    }
    let html = '';
    digimonarray.forEach(digimon => {
        html += `
      <div class="col">
        <div class="card">
            <a href="Datos.html?id=${digimon.id}">
                <img src="${digimon.image}" class="card-img-top" alt="${digimon.name}">
                <div class="card-body">
                    <h5 class="card-title">${digimon.name}</h5>
                </div>
            </a>
        </div>
      </div>
    `;
    });
    digimonContainer.innerHTML = html;
}
//# sourceMappingURL=ListadoController.js.map