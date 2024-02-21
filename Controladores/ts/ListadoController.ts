import { ApiCaller } from './ApiCaller';

// URL de la API
const apiUrl = 'https://digi-api.com/api/v1/digimon?pageSize=10'; // URL de la API proporcionada

// Crear una instancia de ApiCaller
const apiCaller = new ApiCaller(apiUrl);

// Llamar al método fetchData
apiCaller.fetchData()
  .then((data: any) => {
    console.log('Data received:', data);
    // Puedes hacer lo que necesites con los datos aquí
  })
  .catch((error: any) => {
    // Manejar el error si la llamada falla
    console.error('Error occurred:', error);
  });

