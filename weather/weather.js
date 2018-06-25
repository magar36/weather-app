const request = require('request');
var getWeather = (lat,long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/a3ab8634463bf2a75b976f444683bec8/${lat},${long}`,
    json: true
  },
  (error, response, body) =>{
    if(error){
      callback('The api is currently unavailable.');
    } else if(response.statusCode !== 200){
      callback('No data available for the input provided.');
    } else if(response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  })
}

module.exports = {
  getWeather
};
