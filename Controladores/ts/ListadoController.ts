import { ApiCaller } from './ApiCaller';

// URL de la API
const apiUrl = 'https://digi-api.com/api/v1/digimon?pageSize=10&xAntibody=false'; // URL de la API proporcionada

// Crear una instancia de ApiCaller
const apiCaller = new ApiCaller(apiUrl);

// Llamar al método fetchData
apiCaller.fetchData()
  .then((data: any) => {
    const digimonarray = [];

    for (const item of data) {
      digimonarray.push(item);
    }

    pintarlista(digimonarray);
  })
  .catch((error: any) => {
    // Manejar el error si la llamada falla
    console.error('Error occurred:', error);
  });

function pintarlista(digimonarray: Array<any>): void {
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
