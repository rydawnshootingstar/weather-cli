const request = require('request');
const secretKey = '5bbdaaa097ff3e575a040994ded9754e';
const weatherjs = require('../weather/weather');

var geocodeAddress = (item, callbackFunction) =>
{
    var web = ('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(item)+'&key=AIzaSyDdoc8fZ_K_LSSj2jujWzD0rliRK_OvT2M');
console.log(web);
    if (web.includes('420') || web.includes('69')) {
        console.log('nice');
    }
//tell request that we're expecting JSON back
    request({url: web, json: true}, (error, response, body) => {
        //error handle callback function
        if (error) {
            callbackFunction('unable to connect to google servers');
        }
        //google maps API returns a "status" of "zero results" for an address that doesnt exist
        else if (body.status === 'ZERO_RESULTS') {
            callbackFunction('address not found');
        }
        ///and a status of OK if an address is found
        else if (body.status === 'OK') {
            var latitude = body.results[0].geometry.location.lat;
            var longitude = body.results[0].geometry.location.lng;

            //new way with callback
            callbackFunction(undefined,{
                address: body.results[0].formatted_address,
                lat: latitude,
                lng: longitude
            });

            var weatherURL = 'https://api.darksky.net/forecast/'+secretKey+'/'+latitude+','+longitude;
            weatherjs.getWeather(weatherURL, callbackFunction);
        }
    });
  /*  var getWeather=(URL) => {
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
}; */
}



module.exports = {
    geocodeAddress
};