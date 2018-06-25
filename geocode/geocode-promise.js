const axios = require('axios');
const weather = require('../weather/weather-promise');

var getAddress = (addr, siUnit,callback) => {
  var encodedAddr = encodeURIComponent(addr);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`;
  axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS'){
      throw new Error('Unable to find the provided address.');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;
    callback(undefined,response.data.results[0].formatted_address);
    console.log(response.data);
    var weatherUrl = weather.getCoordinates(lat, long, siUnit);
    return axios.get(weatherUrl);
  })
  .then((response) => {
    curTemp = response.data.currently.temperature;
    apparentTemp = response.data.currently.apparentTemperature;
    callback(undefined, `The current temperature is ${curTemp}. It feels like ${apparentTemp}`);
  })
  .catch((e) =>
    {
      if (e.code === 'ENOTFOUND')
      {
      callback('The api is currently unavailable');
      } else {
      callback(e.message);
    }
  });
};

module.exports = {
  getAddress
}
