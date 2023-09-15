import http from 'k6/http';

const BASE_URL = __ENV.BASE_URL || 'https://httpbin.test.k6.io/post'


export default function (){
   let response = http.post(BASE_URL, 'Hola chicos');
   console.log(JSON.stringify(response))

}
