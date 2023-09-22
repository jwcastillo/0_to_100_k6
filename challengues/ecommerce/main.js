import { navigateHomepage } from "/scripts/challengues/ecommerce/navigateHomepage.js";
import { addToCart } from "/scripts/challengues/ecommerce/addToCart.js";


// Opciones para la ejecución del script
export const options = {
  stages: [
    { duration: "5s", target: 5 },
    { duration: "30s", target: 5 },
    { duration: "5s", target: 0 },
  ],
};

// Usamos 'globalThis' para almacenar variables globales
globalThis.vars = [];

// Usamos 'globalThis' para almacenar baseUrl
globalThis.vars["baseUrl"] = __ENV.BASE_URL || "http://ecommerce.test.k6.io";
//Si declaramos las variables globales en el formato anterior debemos usar el mismo formato para leerla globalThis.vars["baseUrl"] 

// Definimos tiempos mínimos y máximos de pausa (en segundos) a nivel global
globalThis.pauseMin = 5;
globalThis.pauseMax = 20;

// Función principal que se ejecutará cuando se llame al script
export default function main() {
  // Navegación a la página principal
  navigateHomepage();
  // Añadir un producto al carrito
  addToCart();
  // // Navegación al carrito
  // navigateToCart();
  // // Navegación al proceso de pago
  // navigateToCheckout();
  // // Actualización de la dirección antes de completar el proceso de pago
  // updateAddress();
  // // Envío y finalización del proceso de pago
  // submitCheckout();
}
