function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let val = cityInput.value;
  search(val);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minute = date.getMinutes();
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = days[day];
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${day} ${hour}:${minute}`;
}
function showForecast(response) {
  console.log(response.data.daily);
}
function getForecast(coordinates) {
  console.log(coordinates);
  lon = coordinates.lon;
  lat = coordinates.lat;

  let apiKey = "0cfdfc5fe59dfdf10ddad45o04b0t539";
  let url = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
  axios.get(url).then(showForecast);
}
function showTemprature(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temprature");
  tempElement.innerHTML = temp;

  celsiusTemp = response.data.main.temp;

  let city = response.data.name;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city;

  let descElement = document.querySelector("#description");
  descElement.innerHTML = response.data.weather[0].description;

  let humidElement = document.querySelector("#humidity");
  humidElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;

  let dateElement = document.querySelector("#date-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showTemprature);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let tempElement = document.querySelector("#temprature");
  tempElement.innerHTML = fahrenheitTemp;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempElement = document.querySelector("#temprature");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let days = ["Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
        <div class="weather-forcast-date">${day}</div>

          <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" width="42" />
          <div class="weather-forecast-temp">
            <span class="weather-forecast-max"> 18° </span>
            <span class="weather-forecast-min"> 12° </span>
          </div>
        </div>`;
  });

  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemp = null;
let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", showCelsiusTemp);
search("New York");
displayForecast();
