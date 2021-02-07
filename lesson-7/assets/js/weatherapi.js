const KEY = '184a8d356da032cd8d665a8aed33b006';
const URL = `https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=${KEY}`;
const DOM = {} || DOM;
DOM.currentTemp = document.getElementById('current-temp');



fetch(URL)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);
    DOM.currentTemp.textContent = jsObject.main.temp
    const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.weather[0].icon + '.png';  // note the concatenation
const desc = jsObject.weather[0].description;  // note how we reference the weather array
document.getElementById('imagesrc').textContent = imagesrc;  // informational specification only
document.getElementById('icon').setAttribute('src', imagesrc);  // focus on the setAttribute() method
document.getElementById('icon').setAttribute('alt', desc);
  });