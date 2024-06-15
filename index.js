function displayTemperature(response) {
    let temperature = response.data.temperature.current;
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElemnt = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.entry;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = '${response.data.temperature.humidity}%';
    windSpeedElement.innerHTML ='${response.data.wind.speed}km/h' ;
    iconElement.innerHTML ='<img src="${response.data.condition.icon_url}" class="weather-app-icon" />';

    getForecast(response.data.city);

    function formatDate(date) {
        let minutes = date.getMinutes();
        let hours = date.hetHours();
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        let day = days[date.getDay()];
        
        if (minutes <10)  {
            minutes = '0${hours}';
        }
        
        if (hours <10) {
            hours ='${day} ${hours}: ${minutes}'; 
        }

        return '${day} ${hours}:${minutes}';
    }

    function searchCity(city) {
        let apiKey = `380fb5b4f0tf2759f240a21o5bb1109d`;
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
      
        axios.get(apiUrl).then(displayTemperature);
    }

    function search(event) {
        event.preventDefault();
        let searchInputElement = document.querySelector("#search-input");
        let city = searchInputElement.value;
        searchCity(city);
    }

    function formatDay(timestamp) {
        let date = new Date(timestamp * 1000);
        let days = ["sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return days[date.getDay()];
    }

    function getForecast(city) {
        let apiKey =  `380fb5b4f0tf2759f240a21o5bb1109d`;
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
      
        axios.get(apiUrl).then(displayForecast);
    }

    function displayForecast(response) {
        console.log(response.date);
        let forecastHTML ="";
         response.data.daily.forEach (function(day, index) {
            if (index <5) {
                forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class = "weather-forecast-date">${formatDay(day.time)}</div>
            <img src="${
              day.condition.icon_url
            }" class = "weather-forecast-icon"/>
            <div class = "weather-forecast-temperatures">
              <div class = "weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Johannesburg");
}