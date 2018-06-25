var request = require('request');

var geocode = (address) => {
  return new Promise((resolve, reject) => {
  var encodedAddr = encodeURIComponent(address);

  request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`,
  json: true
  },
  (error, response, body) => {
  //console.log(JSON.stringify(body,undefined,2));
  if(error){
    reject('Google api is currently unavailable');
  } else if(body.status === 'ZERO_RESULTS')
  {
    reject('No results available for the provided address');
  } else if(body.status === 'OK')
  {
    resolve({
      Address: body.results[0].formatted_address,
      Lat: body.results[0].geometry.location.lat,
      Long: body.results[0].geometry.location.lng
    });
  }
});
});
};

geocode('85027').then((result) => {
  console.log(JSON.stringify(result,undefined,2));
},
(err) => {
  console.log(err);
}
);
