const request = require('request');
const yargs = require('yargs');
const cityWeather = require('./weather/weather');

const API_KEY = "1bf7b4bd00bd3c84b2ca2d73fa0ddcd3";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q="

const argv = yargs
    .options({
        City: {
            demand: true,
            alias: 'c',
            describe: "City name for weather",
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const CITY = encodeURIComponent(argv.City);
const URL = `${BASE_URL}${CITY}&appid=${API_KEY}`;

cityWeather.getCityWeather(URL)
.then( (response) => {
    console.log(response);
}, (errorMessage) => {
    console.log(errorMessage);
}).catch((e) =>{
    console.log("Error ocurred", e);
});