import { sleep, group, check } from "k6";
import http from "k6/http";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import { Trend } from "k6/metrics";
import { checkStatus } from "/scripts/challengues/ecommerce/utils.js";

export const myTrendHompage = new Trend("my_trend_homepage");

export function navigateHomepage() {
  group("Navegación a la Página Principal", function () {
    // home
    let response = http.get(globalThis.vars["baseUrl"], {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        connection: "keep-alive",
        host: "ecommerce.test.k6.io",
        "upgrade-insecure-requests": "1",
      },
    });
    myTrendHompage.add(response.timings.duration, {
      type: "html",
      clasificacion: "value2",
    });

    let isOK = check(response, {
      "status is 200": (res) => res.status === 200,
    });
    if (isOK) {
      const addToCartButtons = response
        .html()
        .find("li[class*=product]")
        .find('a:contains("Add to Cart")')
        .toArray();

      const products = addToCartButtons.map((i) => {
        return {
          id: i.get(0).getAttribute("data-product_id"),
          sku: i.get(0).getAttribute("data-product_sku"),
        };
      });
      //console.log(JSON.stringify(products))
      products.forEach((i) => {
        console.debug(`Product ID: '${i.id}' SKU: '${i.sku}'`);
      });
      globalThis.vars["selectedProduct"] =
        products[Math.floor(Math.random() * products.length)];
      console.debug(
        `Selected Product with ID: '${globalThis.vars["selectedProduct"].id}' and SKU: '${globalThis.vars["selectedProduct"].sku}'`
      );
    }

    sleep(randomIntBetween(pauseMin, pauseMax));
  });
}
