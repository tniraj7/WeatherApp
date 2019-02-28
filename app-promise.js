const yargs = require("yargs");
const axios = require("axios");

const cityWeather = require("./weather/weather.js");

const API_KEY = "1bf7b4bd00bd3c84b2ca2d73fa0ddcd3";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

const argv = yargs
  .options({
    City: {
      demand: true,
      alias: "c",
      describe: "City name for weather",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

const CITY = encodeURIComponent(argv.City);
const URL = `${BASE_URL}q=${CITY}&appid=${API_KEY}`;

axios.get(URL).then((response) => {
    console.log(response.data);
}).catch( (e) => {
    if (response.data.cod === 401) {
        console.log("\nUnauthorized or Bad API key");
    } else if (response.data.cod === 404) {
        console.log("\ Not found");
    } else if (response.data.cod === 500) {
        throw new Error("\n Internal Server Error ");
    } else {
        console.log(e);
    }
});
