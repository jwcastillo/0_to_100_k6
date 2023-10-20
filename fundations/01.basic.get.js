import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || 'http://ecommerce.test.k6.io';

export const options = {
  vus: 5,
  duration: '10s',
};

export default function () {

  let res = http.get(`${BASE_URL}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-User-ID': 23423,
    },
  });
  check(res, { "status is 200": (res) => res.status === 200 });
  console.log(`response: ${JSON.stringify(response)}`);

  sleep(1);
}

