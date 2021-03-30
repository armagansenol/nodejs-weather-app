const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e682628255163e730a74b77333f4f084&query=${latitude},${longitude}?units=m`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `Current temperature is ${response.body.current.temperature}°C.`
      );
    }
  });
};

module.exports = forecast;
