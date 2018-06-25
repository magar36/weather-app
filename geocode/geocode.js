const request = require('request');

var geocodeAddress = (address, callback) =>
{
  var encodedAddr = encodeURIComponent(address);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`,
  json: true
},
(error, response, body) => {
//console.log(JSON.stringify(body,undefined,2));
if(error){
    callback('Google api is currently unavailable');
} else if(body.status === 'ZERO_RESULTS')
{
    callback('No results available for the provided address');
} else if(body.status === 'OK')
{
    callback(undefined, {
      Address: body.results[0].formatted_address,
      Lat: body.results[0].geometry.location.lat,
      Long: body.results[0].geometry.location.lng
    })
}
})
};

module.exports = {
  geocodeAddress
};
