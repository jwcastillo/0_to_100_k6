// Importando el módulo necesario para realizar solicitudes HTTP con k6.
import http from 'k6/http';

// Definiendo la URL base que se usará para las solicitudes. 
// Si no está definido en las variables de entorno (a través de __ENV.BASE_URL), 
// se usará 'https://httpbin.test.k6.io/post' como valor predeterminado.
const BASE_URL = __ENV.BASE_URL || 'https://httpbin.test.k6.io/post';

// Función principal que será ejecutada por k6 durante la prueba.
export default function (){
    // Realiza una solicitud POST a la URL definida en BASE_URL con el cuerpo 'Hola chicos'.
    let response = http.post(BASE_URL, 'Hola chicos');
   
    // Imprime la respuesta de la solicitud POST en formato JSON.
    console.log(JSON.stringify(response));
}
