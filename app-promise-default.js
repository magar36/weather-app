const fs = require('fs');
const yargs = require('yargs');
const geocode = require('./geocode/geocode-promise');

const argv = yargs
.options({
   a: {
    alias: 'address',
    describe: 'Address for which weather data is fetched; if empty, default address will be used.',
    string: true
  },
  f: {
    alias: 'Fahrenheit',
    describe: 'Fetches the temperature in degress fahrenheit',
    boolean: true
  }
  // ,d: {
  //   alias: 'defaultAddress',
  //   describe: 'sets the default address if \'--a\' is null',
  //   boolean: true
  // }
})
.help()
.alias('help','h')
.argv;

isCelsius = !(argv.f);

if(argv.a){
  geocode.getAddress(argv.a, (isCelsius ? "true" : "false"),(error, response) => {
    if(error){
      console.log(error);
    } else{
      console.log(response);
    }
  });
} else
{
  var defaultAddr = JSON.parse(fs.readFileSync('defaultAddr.json'));
  geocode.getAddress(defaultAddr.defaultAddress, (isCelsius ? "true" : "false"),(error, response) => {
    if(error){
      console.log(error);
    } else{
      console.log(response);
    }
  });
}
