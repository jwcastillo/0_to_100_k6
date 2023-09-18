import http from 'k6/http';
import {group, check, sleep} from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import exec from 'k6/execution';

const BASE_URL = __ENV.BASE_URL || 'https://test-api.k6.io/'

export default function (){
    let res={}
    group("GET V1", function(){
        res = http.get(BASE_URL)
        check(res,{"status is 200": (res) => res.status === 200})

    })
    sleep(0.1)
    group("GET Cocodrile",function() {
        res = http.get(`${BASE_URL}public/crocodiles/`);
        check(res,{"status is 200": (res) => res.status === 200})
        //console.log(JSON.stringify(res.json()[randomIntBetween(0,res.json().length-1)].id))

    })
    sleep(1)
    
    group("GET Cocodrile ID", function(){
        res = http.get(`${BASE_URL}public/crocodiles/${res.json()[randomIntBetween(0,res.json().length-1)].id}`);
        check(res,{"status is 200": (res) => res.status === 200})

    })
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
    
    // console.log(json.stringify(response))


}