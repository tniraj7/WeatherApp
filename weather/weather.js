const request = require('request');

var getCityWeather = (uri) => {

    return new Promise((resolve, reject) => {
        request({
            url: uri,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject("Unable to connect to OpenWeatherMaps API");
            } else if (response) {
                if (response.statusCode === 401) {
                    reject("\nInvalid API key");
                } else if (response.statusCode === 404) {
                    reject("\nCity not found");
                } else if (response.statusCode === 501) {
                    reject("\nMaintenance mode");
                } else if (response.statusCode === 200) {
                    resolve({
                        weather: body.weather[0].description
                    });
                }
            }
        });
    });
};

module.exports = {
    getCityWeather
};