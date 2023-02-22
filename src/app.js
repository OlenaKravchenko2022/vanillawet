function formatDate(timestamp) {
  return `${date} ${month}, ${day}, ${hours}:${minutes}`;
}
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let monthes = [
  "January",
  "Febrary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = monthes[now.getMonth()];
let minutes = now.getMinutes();
let hours = now.getHours();

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
    <div class="weather-date">${day}</div>
    <img src="" alt="wet" width="45" />
    <div class="weather-temperature-forecast">
      <span class="forecast-min">18</span>
      <span class="forecast-max">19</span>
    </div>
  </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let precipitationElement = document.querySelector("#precipitation");
  precipitationElement.innerHTML = response.data.weather[0].main;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = response.data.sys.sunrise;
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = response.data.sys.sunset;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate();
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

displayForecast();

function search(city) {
  let apiKey = "80ac2935dbe51b68bf72767b13c74d44";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

search("Prague");
