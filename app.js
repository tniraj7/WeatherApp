const request = require('request');
const yargs = require('yargs');


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

request({
    url: URL,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log("Unable to connect to OpenWeathermaps API");
    } else if (response) {
        if (response.statusCode === 401) {
            console.log("\nInvalid API key");
        } else if (response.statusCode === 404) {
            console.log("\nCity not found");
        } else if (response.statusCode === 501) {
            console.log("\nMaintenance mode");
        } else if (response.statusCode === 200) {
            console.log("\nRequest successfull!");
            console.log(`\nWeather in ${argv.City} is `, JSON.stringify(body.weather[0].description, undefined, 2));
        }
    }
});