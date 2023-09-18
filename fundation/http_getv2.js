// Importando módulos necesarios para realizar pruebas con k6
import http from 'k6/http';  // Proporciona funciones para hacer solicitudes HTTP
import {group, check, sleep} from 'k6';  // Herramientas para estructurar y verificar las pruebas y pausar la ejecución
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';  // Función que genera un número entero aleatorio entre dos valores
import exec from 'k6/execution';  // Proporciona información sobre la ejecución actual de la prueba

// Definiendo la URL base que se usará en las solicitudes. Si no está definido en las variables de entorno, se usará 'https://test-api.k6.io/'
const BASE_URL = __ENV.BASE_URL || 'https://test-api.k6.io/'

// Función principal de la prueba
export default function (){
    let res={}  // Inicializando una variable para almacenar respuestas de las solicitudes HTTP

    // Grupo para la solicitud GET a la URL base
    group("GET V1", function(){
        res = http.get(BASE_URL)  // Haciendo la solicitud GET
        check(res,{"status is 200": (res) => res.status === 200})  // Verificando que la respuesta tenga un estado HTTP de 200
    })

    sleep(0.1)  // Pausando la ejecución durante 0.1 segundos

    // Grupo para obtener información sobre cocodrilos
    group("GET Cocodrile",function() {
        res = http.get(`${BASE_URL}public/crocodiles/`);  // Haciendo una solicitud GET para obtener cocodrilos
        check(res,{"status is 200": (res) => res.status === 200})  // Verificando que la respuesta tenga un estado HTTP de 200
        // Comentado: Console log de un ID de cocodrilo aleatorio
        //console.log(JSON.stringify(res.json()[randomIntBetween(0,res.json().length-1)].id))
    })

    sleep(1)  // Pausando la ejecución durante 1 segundo

    // Grupo para obtener información sobre un cocodrilo específico usando su ID
    group("GET Cocodrile ID", function(){
        // Haciendo una solicitud GET para obtener información de un cocodrilo usando un ID aleatorio
        res = http.get(`${BASE_URL}public/crocodiles/${res.json()[randomIntBetween(0,res.json().length-1)].id}`);
        check(res,{"status is 200": (res) => res.status === 200})  // Verificando que la respuesta tenga un estado HTTP de 200
    })

    // Imprimiendo información detallada sobre la ejecución actual de la prueba
    console.log(`Execution context

    Instance info
    -------------
    Vus active: ${exec.instance.vusActive}
    Iterations completed: ${exec.instance.iterationsCompleted}
    Iterations interrupted:  ${exec.instance.iterationsInterrupted}
    Iterations completed:  ${exec.instance.iterationsCompleted}
    Iterations active:  ${exec.instance.vusActive}
    Initialized vus:  ${exec.instance.vusInitialized}
    Time passed from start of run(ms):  ${exec.instance.currentTestRunDuration}
    
    Scenario info
    -------------
    Name of the running scenario: ${exec.scenario.name}
    Executor type: ${exec.scenario.executor}
    Scenario start timestamp: ${exec.scenario.startTime}
    Percenatage complete: ${exec.scenario.progress}
    Iteration in instance: ${exec.scenario.iterationInInstance}
    Iteration in test: ${exec.scenario.iterationInTest}
    
    Test info
    ---------
    All test options: ${exec.test.options}
    
    VU info
    -------
    Iteration id: ${exec.vu.iterationInInstance}
    Iteration in scenario: ${exec.vu.iterationInScenario}
    VU ID in instance: ${exec.vu.idInInstance}
    VU ID in test: ${exec.vu.idInTest}
    VU tags: ${exec.vu.tags}`);
    
    // Comentado: Console log de la respuesta
    // console.log(json.stringify(response))
}
