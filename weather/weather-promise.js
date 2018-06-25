var getCoordinates = (lat, long, siUnit) => {
  var weatherUrl = `https://api.darksky.net/forecast/a3ab8634463bf2a75b976f444683bec8/${lat},${long}${(siUnit === 'true')?'?units=si':""}`;
  return weatherUrl;
};

module.exports = {
  getCoordinates
};
