import { check, fail } from "k6";

// Función principal para verificar el estado y contenido de una respuesta
export function checkStatus({ response, expectedStatus, expectedContent, failOnError, printOnError, dynamicIds }) {
  
  // Verificar si no se ha especificado un estado o contenido esperado
  if (isEmpty(expectedStatus) && isEmpty(expectedContent)) {
    console.warn('No se especificó un estado o contenido esperado en la llamada a checkStatus para la URL ' + response.url);
    return;
  }

  let contentCheckResult;
  let statusCheckResult;

  let url = response.url;

  // Reemplazar IDs dinámicos en la URL con '[id]'
  if (dynamicIds) {
    dynamicIds.forEach((dynamicId) => {
      if (response.url.includes(dynamicId)) {
        url = url.replace(dynamicId, '[id]');
      }
    });
  }

  // Comprobar si el contenido esperado está presente en la respuesta
  if (expectedContent) {
    contentCheckResult = check(response, {
      [`"${expectedContent}" en la respuesta de ${url}`]: (r) => r.body.includes(expectedContent),
    });
  }

  // Comprobar si el estado esperado coincide con el estado de la respuesta
  if (expectedStatus) {
    const obj = {};
    obj[`${response.request.method} ${url} estado esperado ${expectedStatus}`] = (r) => r.status === expectedStatus;

    statusCheckResult = check(response, obj);
  }
  
  // En caso de que no se cumplan las comprobaciones
  if (!statusCheckResult || !contentCheckResult && expectedContent) {
    if (printOnError && response.body) {
      console.log("Respuesta inesperada: " + response.body);
    }
    if (failOnError) {
      if (!statusCheckResult && (!contentCheckResult && expectedContent)) {
        fail(`${response.request.method} ${url} estado ${expectedStatus} y "${expectedContent}" no encontrados en la respuesta`);
      } else {
        if (!statusCheckResult) {
          fail(`Recibido código de estado inesperado ${response.status} para la URL: ${url}, se esperaba ${expectedStatus}`);
        } else if (!contentCheckResult) {
          fail(`"${expectedContent}" no encontrado en la respuesta para la URL: ${url}`);
        }
      }
    }
  }
  return statusCheckResult
}

// Función auxiliar para comprobar si una cadena está vacía
function isEmpty(str) {
  return (!str || str.length === 0);
}
