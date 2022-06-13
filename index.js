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

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");

  let city = document.querySelector("#city");
  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
  } else {
    city.innerHTML = null;
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemp(response) {
  let cityName = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = cityName;
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${temp}°C`;
}
function searchCity(city) {
  let apiKey = "914cbf8aca52842e5866dd42da649610";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}
function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#text-input").value;
  searchCity(city);
}

form = document.querySelector("#search-form");
form.addEventListener("submit", submit, search);
