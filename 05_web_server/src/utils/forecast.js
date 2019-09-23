const request = require('request');

const apiKey = 'c8a06a72bd41160c3691d956fcd2e20f';
let options = [];

const forecast = (lat, long, callback) => {
  const weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${long}?units=si`;

  request({ url: weatherUrl, json: true }, (error, response) => {
    // console.log(response);
    if (error) {
      callback('Server error!', undefined);
    } else if (response.body.error) {
      callback('Unable to find this location.', undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};

module.exports = forecast;
