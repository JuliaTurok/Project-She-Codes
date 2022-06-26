let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
document.getElementById("h2").innerHTML = `${day}, ${hours}:${minutes}`;



function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  showCoord(response.data.coord);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  temperatureElement = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function search(city) {
  let apiKey = "914cbf8aca52842e5866dd42da649610";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function submit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  search(searchInput.value);
}
function getDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun","Mon","Tue","Wed","Thu"]
return days[day];
}
function showCoord(coordinates) {
  let lat= coordinates.lat;
  let lon= coordinates.lon;
  let apiKey = `914cbf8aca52842e5866dd42da649610`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function showForecast(response){
let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="box">`;
  
forecast.forEach(function (forecastDay, index) {
  if(index < 5){
    forecastHTML =
      forecastHTML +
      `<div class="days">
          <div>${getDay(forecastDay.dt)}</div>
            <div class="icon"> <img
            src=" http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="weather"
          /></div>
             <div class="info">
            <span class="max-temp">${Math.round(forecastDay.temp.max)}°C</span>
            <span class="min-temp">${Math.round(forecastDay.temp.min)}°C</span>
          </div>
        </div>`;
  }
  });
        forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);
search("Lviv");
 celsius.classList.add("active");
