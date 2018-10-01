const yargs = require('yargs');
const axios = require('axios');
const secretKey = '5bbdaaa097ff3e575a040994ded9754e';

const yargv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

//create request url w api
var website = ('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(yargv.address)+'&key=AIzaSyDdoc8fZ_K_LSSj2jujWzD0rliRK_OvT2M');
console.log(website);
//axios recommends calling the variable response.
axios.get(website).then((response) => {
    //if this condition is met, we will continue to our Catch statement
    if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Address not found');
    }

    var weatherURL = 'https://api.darksky.net/forecast/'+secretKey+'/'+ response.data.results[0].geometry.location.lat +','+response.data.results[0].geometry.location.lng;

    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherURL);

}).then((response)=> {
    var temp = JSON.stringify(response.data.currently.temperature).slice(0,2);
    var humid = response.data.currently.humidity;
    var feelslike = JSON.stringify(response.data.currently.apparentTemperature).slice(0,2);
    var raining = response.data.currently.precipProbability ===1 ? 'it is raining' : 'no rain';
    var rainchance = response.data.currently.precipProbability;
    console.log(`Currently ${temp} degrees \n Humidity ${humid*100}% \n Feels like ${feelslike} \n ${raining} \n chance of rain is ${rainchance} right now`);

}).catch((error)=> {
    if(error.code==='ENOTFOUND'){
        console.log('ERROR: unable to connect to google server');
    } else {
        console.log(error.message);
    }
});