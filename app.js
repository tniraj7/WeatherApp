const request = require('request');
const yargs = require('yargs');

const argv = yargs
.options({
    City : {
        demand : true,
        alias: 'c',
        describe: "City name for weather",
        string : true
    }
})
.help()
.alias('help', 'h')
.argv;



const URL = "https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=1bf7b4bd00bd3c84b2ca2d73fa0ddcd3";

request({
    url: URL,
    json: true
},(error, response, body) => {
        console.log(JSON.stringify(body.weather[0].description, undefined,2));
    }
);