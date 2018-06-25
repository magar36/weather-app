const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
 .options({
   a: {
    demand: true,
    alias: 'address',
    descibe: 'this is the address',
    string: true,

  }
})
.requiresArg('a')
.help()
.alias('help','h')
.argv;

geocode.geocodeAddress(argv.a,(error, addressResults) => {
  if(error){
    console.log(error);
  }
  else{
    weather.getWeather(addressResults.Lat,addressResults.Long,(error,weatherResults) => {
      if(error){
        console.log(error);
      } else {
        console.log(`The temperature is ${weatherResults.temperature} although it feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});


//console.log('this comes first');
