# Aplicación de Búsqueda del Clima

Este proyecto es una aplicación de búsqueda del clima que usa la API Open-Meteo para mostrar datos basados en la búsqueda del usuario. Incluye un autocompletado en la búsqueda que sugiere localizaciones (países, ciudades).

## Funcionalidades

- **Búsqueda de localizaciones:** Permite a los usuarios buscar una localización escribiendo el nombre. La aplicación realiza una solicitud que devuelve la latitud y longitud usando la Open-Meteo Geocoding API.
- **Datos del clima diario:** Usando la latitud y longitud, muestra la temperatura actual, así como la temperatura mínima y máxima pronosticadas para el día utilizando la Open-Meteo Weather Forecast API.
- **Fondo dinámico:** El fondo cambia para mostrar si en la localización buscada es de día o de noche.
- **Autocompletado:** Cuando el usuario escribe en la barra de búsqueda, aparecen sugerencias basadas en su entrada.

## API Usada

- **Geocoding API:** Convierte nombres de localizaciones en latitud y longitud.
  - **Endpoint:** `https://geocoding-api.open-meteo.com/v1/search`
  - **Parámetros:**
    - `name`: Nombre de la localización.
    - `count`: Número de resultados de retorno (por defecto es 10).
    - `language`: El idioma de los resultados.
    - `format`: El formato de respuesta (por defecto es JSON).

- **Weather Forecast API:** Devuelve el pronóstico para las coordenadas solicitadas.
  - **Endpoint:** `https://api.open-meteo.com/v1/forecast`
  - **Parámetros:**
    - `latitude`: Latitud de la localización.
    - `longitude`: Longitud de la localización.
    - `current`: Datos climáticos actuales, incluyendo temperatura, y si es de día o de noche.
    - `daily`: Datos climáticos del día, temperatura máxima y mínima, etc.
    - `timezone`: Ajuste de zona horaria.

## En resumen

Con este proyecto conseguí poner en práctica el uso de `fetch` para extraer datos de una API. Utilicé HTML, CSS y JavaScript para llevarlo a cabo.

Fue divertido, y el resultado me gustó bastante.
