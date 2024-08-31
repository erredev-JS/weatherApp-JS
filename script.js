const autoCompleteInput = document.getElementById("autoCompleteInput");
const searchBtn = document.getElementById("searchBtn");
const requestContainer = document.getElementById("requestContainer");
const adressName = document.getElementById("adressName");
const actualText = document.getElementById("actualText");
const minText = document.getElementById("minText");
const maxText = document.getElementById("maxText");

function handleClick() {
  let adress = autoCompleteInput.value.split(" ").join("+");
  adressName.innerHTML = autoCompleteInput.value;
  actualText.innerHTML = "...";
  minText.innerHTML = "...";
  maxText.innerHTML = "...";
  // Fetch a geocoding, para transformar una dirección a coordenadas (altidud y longitud)
  fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${adress}&count=10&language=en&format=json`
  )
    .then((response) => response.json())
    .then((geocodingData) => {
      let [latitude, longitude] = [
        geocodingData.results[0].latitude,
        geocodingData.results[0].longitude,
      ];
      // Fetch a Meteo Weather API

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
      )
        .then((response) => response.json())
        .then((weatherData) => {
          adressName.innerHTML = autoCompleteInput.value;
          actualText.innerHTML = weatherData.current.temperature_2m;
          minText.innerHTML = weatherData.daily.temperature_2m_min;
          maxText.innerHTML = weatherData.daily.temperature_2m_max;
          console.log(weatherData.current.is_day);
          if (!weatherData.current.is_day) {
            document.body.style.backgroundImage =
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
          } else {
            document.body.style.backgroundImage =
              "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

searchBtn.addEventListener("click", handleClick);

// Autocompletado

const listElement = document.getElementById("autocompleteList");
autoCompleteInput.addEventListener("input", function () {
  if (autoCompleteInput.value.length > 3) {
    let adress = autoCompleteInput.value;
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${adress}&count=3&language=en&format=json`
    )
      .then((response) => response.json())
      .then((geocodingData) => {
        handleListItemClick();
        // Manejo de creación de elementos para el autocompletado
        geocodingData.results.forEach((result) => {
          const suggestionItem = document.createElement("div");
          suggestionItem.className = "autocomplete-list-item";
          suggestionItem.textContent = `${result.name}`;
          listElement.style.display = "block";
          listElement.appendChild(suggestionItem);
          handleListItemClick();
          // Si hay mas de 4 elementos, matener solo 4
          if (listElement.childNodes.length > 4) {
            listElement.innerHTML = "";
          }
        });
      });
  }
});

autoCompleteInput.addEventListener("input", handleListItemClick);

// Ocultar la lista cuando el input pierde el foco
autoCompleteInput.addEventListener("blur", function () {
  setTimeout(() => {
    listElement.style.display = "none";
  }, 200); // Un pequeño retraso para permitir que el clic en la sugerencia se registre
});

// Mostrar la lista de nuevo si el input gana el foco
autoCompleteInput.addEventListener("focus", function () {
  if (autoCompleteInput.value) {
    listElement.style.display = "block";
  }
});

// Ejemplo de manejo de clics en la lista de sugerencias
function handleListItemClick() {
  document.querySelectorAll(".autocomplete-list-item").forEach((item) => {
    item.addEventListener("click", function () {
      autoCompleteInput.value = this.textContent;
      listElement.style.display = "none";
    });
  });
}
