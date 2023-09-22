// Importamos las distintas funciones de otros archivos
import { navigateHomepage } from "./navigateHomepage.js";
import { addToCart } from "./addToCart.js";
import { navigateToCart } from "./navigateToCart.js";
import { navigateToCheckout } from "./navigateToCheckout.js";
import { updateAddress } from "./updateAddress.js";
import { submitCheckout } from "./submitCheckout.js";

// Opciones para la ejecución del script
export const options = {
};

// Usamos 'globalThis' para almacenar variables globales
globalThis.vars = [];
// Usamos 'globalThis' para almacenar baseUrl 
globalThis.vars["baseUrl"] =__ENV.BASE_URL || 'http://ecommerce.test.k6.io';

// Definimos tiempos mínimos y máximos de pausa (en segundos) a nivel global
globalThis.pauseMin = 5;
globalThis.pauseMax = 15;

// Función principal que se ejecutará cuando se llame al script
export default function main() {
  // Navegación a la página principal
  navigateHomepage();
  // Añadir un producto al carrito
  addToCart();
  // Navegación al carrito
  navigateToCart();
  // Navegación al proceso de pago
  navigateToCheckout();
  // Actualización de la dirección antes de completar el proceso de pago
  updateAddress();
  // Envío y finalización del proceso de pago
  submitCheckout();
}
