const ELEM = {} || ELEM;

/* DOCUMENT ELEMENTS */

ELEM.tempFar = document.getElementById('temp')
ELEM.weatherDesc = document.getElementById('condition');
ELEM.humidity = document.getElementById('humidity');
ELEM.fiveForecast = document.getElementById('five');
const KEY = '184a8d356da032cd8d665a8aed33b006';
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?id=3530103&units=imperial&appid=${KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?id=3530103&units=imperial&appid=${KEY}`

/* EVENT LISTENERS */

document.addEventListener('DOMContentLoaded', () => {
    getWeatherData();
})

function getWeatherData() {
    fetch(WEATHER_URL)
    .then((response) => response.json())
    .then((jsObject) => {
        ELEM.tempFar.textContent = Math.ceil(jsObject.main.temp);
        ELEM.humidity.textContent = Math.ceil(jsObject.main.humidity)
        ELEM.weatherDesc.textContent = jsObject.weather[0].description;
        ELEM.weatherDesc.style.textTransform = "capitalize";

        return fetch(FORECAST_URL)
    })
    .then(resp => resp.json())
    .then(resp => {
        ELEM.fiveForecast.textContent = Math.ceil(resp.list[36].main.temp)
    })
}