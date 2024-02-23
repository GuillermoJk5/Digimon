import { ApiCaller } from './ApiCaller';


function mostrarDatos(id: number) {
    // URL de la API con el ID insertado
    const apiUrl = `https://digi-api.com/api/v1/digimon/${id}`;
  
    // Crear una instancia de ApiCaller
    const apiCaller = new ApiCaller(apiUrl);
  
    // Llamar al método fetchData
    apiCaller.fetchData()
      .then((data: any) => {
        // Aquí puedes manipular los datos recibidos de la API
        console.log('Datos del Digimon:', data);
        // Por ejemplo, podrías mostrar los datos en el DOM o realizar otras operaciones con ellos
      })
      .catch((error: any) => {
        // Manejar el error si la llamada falla
        console.error('Error occurred:', error);
      });
  }