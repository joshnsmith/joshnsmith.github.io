const ELEM = {} || ELEM;

/* DOCUMENT ELEMENTS */

ELEM.menuToggle = document.getElementById('nav-toggle');
ELEM.menuIcon = document.getElementById('menu-icon');
ELEM.navMenu = document.getElementById('nav-menu');
ELEM.banner = document.getElementById('banner');
ELEM.bannerClose = document.getElementById('close-banner');
ELEM.tempFar = document.getElementById('temp-farenheight')
ELEM.tempHigh = document.getElementById('temp-high')
ELEM.windSpeed = document.getElementById('wind-speed');
ELEM.humidity = document.getElementById('humidity');
ELEM.fiveForecast = document.getElementById('five-forecast');
ELEM.weatherDesc = document.getElementById('weather-description');
const KEY = '184a8d356da032cd8d665a8aed33b006';
const WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&appid=${KEY}`;
const FORECAST_URL = `http://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=${KEY}`;



/* EVENT LISTENERS */

document.addEventListener('DOMContentLoaded', () => {
    if (new Date().getDay() === 5) {
        ELEM.banner.classList.remove('banner-hide');
    }
    getWeatherData();
    var labels = getDayArray();

    getFiveDayForecast()
        .then(
            res => displayFiveday(labels, res)
        )
})

ELEM.menuToggle.onclick = () => {
    ELEM.menuIcon.classList.toggle('close-menu');
    for (var elem of ELEM.navMenu.children) {
        elem.classList.toggle('show-menu');
    }
    if (ELEM.menuIcon.src.includes('close-icon')) {
        ELEM.menuIcon.src = "./assets/img/menu-icon.png"

    } else {
        ELEM.menuIcon.src = "./assets/img/close-icon.png";
    }
}

if (ELEM.bannerClose !== null) {
    ELEM.bannerClose.onclick = () => {
        ELEM.banner.classList.add('banner-hide');
    }
}

function getWeatherData() {
    fetch(WEATHER_URL)
    .then((response) => response.json())
    .then((jsObject) => {
        ELEM.tempFar.textContent = jsObject.main.temp;
        ELEM.tempHigh.textContent = jsObject.main.temp_max;
        ELEM.humidity.textContent = jsObject.main.humidity + '%';
        ELEM.windSpeed.textContent = jsObject.wind.speed;
        ELEM.weatherDesc.textContent = jsObject.weather[0].description;
        ELEM.weatherDesc.style.textTransform = "capitalize";
    });
}

function getDayArray() {
    let day = new Date().getDay();

    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    let fiveDays = []

    let count = 0;
    while(count < 5) {
        day += 1;
        if (day > 6) {
            day = 0;
        }
        fiveDays.push(days[day]);

        count++;
    } 

    return fiveDays
}

function getFiveDayForecast() {
    return fetch(FORECAST_URL)
        .then(res => res.json())
        .then(json => json.list.filter(weather => weather.dt_txt.includes('18:00')));
}

function displayFiveday(labels, days) {
    labels.forEach((label, i) => {
        let day = document.createElement('div');
        day.classList.add('day');
        let labelEl = document.createElement('div')
        labelEl.classList.add('label');
        labelEl.textContent = label;
        let imgURL = `https://openweathermap.org/img/w/${days[i].weather[0].icon}.png`
        let info = document.createElement('div');
        info.classList.add('info')
        let img = document.createElement('img')
        img.src = imgURL;
        img.alt = 'Weather Description Fiveday';
        let p = document.createElement('p');
        p.textContent = days[i].main.temp;

        info.appendChild(img);
        info.appendChild(p);
        
        day.appendChild(labelEl)
        day.appendChild(info);

        ELEM.fiveForecast.appendChild(day);
    });
}

/*

<div class="day">
    <div class="label">
        Mon
    </div>
    <div class="info">
        <img src="./assets/img/sunny.png" alt="Sunny Weather">
        <p>70F</p>
    </div>
</div>

                */