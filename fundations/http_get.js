// Importando el módulo necesario para realizar solicitudes HTTP con k6
import http from "k6/http";

// Función principal que será ejecutada por k6 durante la prueba
export default function () {
  // Realiza una solicitud GET a la URL 'https://test-api.k6.io/'
  http.get("https://test-api.k6.io/");
}
