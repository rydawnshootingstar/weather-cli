const request = require('request');

var getWeather=(URL, callbackFunction) => {
    request({url: URL, json: true}, (error, response, body) => {
        if(error){
            callbackFunction('unable to reach forecast.io servers');
        }
        else if(body.code === '400'){
            callbackFunction(body.error);
        }
        else{
            callbackFunction(undefined, {
                'current temp': body.currently.temperature,
                'current humidity': `${body.currently.humidity * 100}%`,
                'feels like': body.currently.apparentTemperature,
                'rain': body.currently.precipProbability ===1 ? 'yes' : 'nope'
            });
        }
    });
};


module.exports = {
  getWeather
};