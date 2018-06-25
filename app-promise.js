const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.command('$0','the default command' () => {}, (argv) => {
  console.log('no command provided');
})
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

var encodedAddr = encodeURIComponent(argv.a);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find the provided address.');
  }
  //console.log(response.data);
  var lat = response.data.results[0].geometry.location.lat;
  var long = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/a3ab8634463bf2a75b976f444683bec8/${lat},${long}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
})
.then((response) => {
  curTemp = response.data.currently.temperature;
  apparentTemp = response.data.currently.apparentTemperature;
  console.log(`The current temperature is ${curTemp}. It seems as if it is ${apparentTemp}`);
})
.catch((e) =>
  {
    if (e.code === 'ENOTFOUND')
    {
    console.log('The api is currently unavailable');
    } else {
    console.log(e.message);
  }
});
