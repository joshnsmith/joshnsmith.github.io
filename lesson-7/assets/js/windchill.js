const WINDCHILL = {} || WINDCHILL;

function calcWindChill(temp, speed) {
    if (temp <= 50 && speed >= 3.8) {
        return Math.round(35.74 + 0.6215 * temp - 35.75 * speed ** 0.16 + 0.4275 * temp * speed ** 0.16) + " F";
    } 
    else {
        return "N/A";
    }
}