const getGeolocation = require('./utils/geocode');
const forecast = require('./utils/forecast');

// const getWeatherData = (weatherUrl, callback) => {
//   request({ url: weatherUrl, json: true }, (error, response) => {
//     // console.log(response.body);
//     callback(error, response.body);
//   });
// };

// const queryPlace = 'Melbourne';
// const apiKey = 'c8a06a72bd41160c3691d956fcd2e20f';
// let options = [];

const queryPlace = process.argv[2];

getGeolocation(queryPlace, (error, geoLocation) => {
  if (geoLocation !== undefined) {
    const lat = geoLocation.lat;
    const long = geoLocation.long;
    const locName = geoLocation.loc;
    //   const weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${long}?units=si`;

    //   getWeatherData(weatherUrl, (error, resData) => {
    //     console.log(locName + ': ' + resData.daily.data[0].summary);
    //     console.log(
    //       `It is currently ${resData.currently.temperature} °C outside.\nThere is ${resData.currently.precipProbability}% chance of rain.\n`
    //     );
    //   });

    forecast(lat, long, (error, resData) => {
      if (resData !== undefined) {
        console.log(locName + ': ' + resData.daily.data[0].summary);
        console.log(
          `It is currently ${resData.currently.temperature} °C outside.\nThere is ${resData.currently.precipProbability}% chance of rain.\n`
        );
      } else console.log('Error!', error);
    });
  } else console.log('Error!', error);
});
