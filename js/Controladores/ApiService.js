"use strict";
// URL de la API
const apiUrl = 'https://digi-api.com/api/v1/digimon?pageSize=10&xAntibody=false'; // URL de la API proporcionada
// Crear una instancia de ApiCaller
const apiCaller = new ApiCaller(apiUrl);
// Llamar al método fetchData
apiCaller.fetchData()
    .then((data) => {
    const digimonarray = [];
    console.log(data.content);
    for (const item of data.content) {
        let imagen = item.image.replace(/^"(.*)"$/, '$1');
        let digimon = new Card(item.id, item.name, imagen);
        digimonarray.push(digimon);
    }
})
    .catch((error) => {
    // Manejar el error si la llamada falla
    console.error('Error occurred:', error);
});
//# sourceMappingURL=ApiService.js.map