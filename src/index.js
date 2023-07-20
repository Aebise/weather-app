function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let val = cityInput.value;
  console.log(val);
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

function showTemprature(response) {
  console.log(response.data.weather[0].icon);
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temprature");
  tempElement.innerHTML = temp;

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
}

function search(city) {
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showTemprature);
}
search("New York");
let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);
