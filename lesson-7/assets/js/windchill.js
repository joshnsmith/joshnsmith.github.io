const WINDCHILL = {} || WINDCHILL;

WINDCHILL.temp = parseInt(document.getElementById('temp-farenheight').innerHTML);
WINDCHILL.speed = parseInt(document.getElementById('wind-speed').innerHTML);

document.getElementById('wind-chill').innerHTML = calcWindChill();


function calcWindChill() {
    if (WINDCHILL.temp <= 50 && WINDCHILL.speed >= 3.8) {
        return Math.round(35.74 + 0.6215 * WINDCHILL.temp - 35.75 * WINDCHILL.speed ** 0.16 + 0.4275 * WINDCHILL.temp * WINDCHILL.speed ** 0.16) + " F";
    } 
    else {
        return "N/A";
    }
}
