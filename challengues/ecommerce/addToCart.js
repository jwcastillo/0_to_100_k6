import { sleep, group } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import { Counter } from "k6/metrics";

export const addcart = new Counter("addcart");

export function addToCart() {
  group("Add to Cart", function () {
    console.log(`Add to Cart`);
    const response = http.post(
      `${globalThis.vars["baseUrl"]}/?wc-ajax=add_to_cart`,
      {
        product_sku: globalThis.vars["selectedProduct"].sku,
        product_id: globalThis.vars["selectedProduct"].id,
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
      expectedContent: "1 item",
      failOnError: true,
      printOnError: true,
    });
  });
  addcart.add(1);

  //Como podemos saber si el producto esta en el carrito?

  sleep(randomIntBetween(pauseMin, pauseMax));
}
