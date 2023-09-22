# 🏁 Workshop De 0 a 100: Performance Testing y k6 a Máxima Velocidad 🏁

## Descripción

Bienvenido a este workshop intensivo diseñado para acelerar tus habilidades en pruebas de rendimiento y k6. Aquí encontrarás todo lo necesario para convertirte en un experto en pruebas de rendimiento.

## 📋 Índice

- [Requisitos de Pista 🏎️](#requisitos-de-pista-)
  - [Conocimientos Necesarios 🧠](#conocimientos-necesarios-)
  - [Materiales y Documentación 📚](#materiales-y-documentación-)
  - [Configuraciones Previas ⚙️](#configuraciones-previas-)
- [Contenido del Workshop 📚](#contenido-del-workshop-)
  - [¡Enciende los Motores! 🚀](#enciende-los-motores-)
  - [Manos al Volante 🤲](#manos-al-volante-)
  - [Pit-Stop Técnico ⚙️](#pit-stop-técnico-)
  - [Adelantamientos Estratégicos 🚗](#adelantamientos-estratégicos-)
  - [Zonas de DRS 🛣️](#zonas-de-drs-)
  - [¡Monitor de Carrera! 📊](#monitor-de-carrera-)
  - [Sobrepasando Bajo Bandera Amarilla 🟡](#sobrepasando-bajo-bandera-amarilla-)
  - [Vueltas Rápidas 🔄](#vueltas-rápidas-)
  - [Cruzando la Línea de Meta 🏁](#cruzando-la-línea-de-meta-)
- [Licencia 📜](#licencia-)

## Requisitos de Pista 🏁🏎️

Antes de encender nuestros motores y arrancar en este emocionante workshop, asegúrate de tener a punto tus herramientas:

1. **Docker**: Es el mecánico estrella que nos ayudará a mantener todo en orden.
2. **Docker Compose**: ¡El copiloto perfecto para Docker!

### Instrucciones de Instalación 🧰

**Windows** 🪟:
1. Descarga e instala Docker Desktop desde [aquí](https://www.docker.com/products/docker-desktop).
2. Al finalizar la instalación, Docker Compose también estará disponible, ya que viene incluido con Docker Desktop.

**Linux** 🐧:
1. Instala Docker con el comando:  
   ```bash
   sudo apt-get update && sudo apt-get install docker-ce
   ```
2. Para Docker Compose, sigue estos pasos:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/latest/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

**Mac** 🍏:
1. Descarga e instala Docker Desktop para Mac desde [aquí](https://www.docker.com/products/docker-desktop).
2. Similar a Windows, Docker Compose ya estará incluido una vez que instales Docker Desktop.

¡Una vez que tengas todo listo, estarás preparado para acelerar a fondo en nuestro workshop! 🚀🔧🏎️



### 🚀 Ejecución de Pruebas JavaScript con Docker


El script `docker-run.sh` que se encuentra en la raiz, está diseñado para ejecutar pruebas JavaScript específicas en un entorno Docker local que hemos establecido mediante `docker-compose`. Esta ejecución te permitirá llevar a cabo pruebas en un ambiente aislado, asegurando consistencia y reproducibilidad.

Cada ejecución de prueba se le asigna una etiqueta única. Esta etiqueta facilita la diferenciación de distintas ejecuciones de prueba dentro del tablero de Grafana.

#### Uso

Para utilizar el script, realiza los siguientes pasos:

1. Abre tu terminal o consola de comandos.
1. Dirígete al directorio donde se ubica el script `docker-run.sh`.
1. Ejecuta el script proporcionando el nombre del script JavaScript que quieres probar:

   ```bash
   ./docker-run.sh fundation/http_get.js
   ```

#### Detalles Técnicos

- **set -e**: Garantiza que el script se detenga si surge algún error.
  
- **if [ $# -ne 1 ]**: Comprueba que se haya suministrado exactamente un argumento al script.
  
- **SCRIPT_NAME y TAG_NAME**: Estas variables almacenan el nombre del script de prueba y generan una etiqueta única para la ejecución actual respectivamente.
  
- **docker-compose ...**: Corre el script de prueba dentro de un contenedor Docker usando `docker-compose.native.yml`.






## Licencia 📜

Este proyecto está bajo la licencia Apache 2.0. Consulta el archivo [LICENSE](LICENSE) para más detalles.


