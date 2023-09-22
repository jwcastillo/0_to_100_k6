import { sleep, group } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

export function addToCart() {
  group("Add to Cart", function () {
    const response = http.post(
      vars["baseUrl"] , //me falta la url
      {
        product_sku: `aca`,//aca debemos colocar le producto que seleccionamos antes,
        product_id: `aca`,//aca debemos colocar le producto que seleccionamos antes,
        quantity: "1",
      },
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-encoding": "gzip, deflate",
          "accept-language": "en-US,en;q=0.9",
          connection: "keep-alive",
          "content-type":
            "application/x-www-form-urlencoded;type=content-type;mimeType=application/x-www-form-urlencoded",
          host: "ecommerce.test.k6.io",
          origin: "http://ecommerce.test.k6.io",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true
    });
  });


  //Como podemos saber si el producto esta en el carrito?

  sleep(randomIntBetween(pauseMin, pauseMax));
}