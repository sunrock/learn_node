const request = require('request');

// GeoCode => GeoLocation
const geoBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const geoAccessToken = '';

// console.log(geoUrl);

const getGeolocation = (queryPlace, callback) => {
  const geoUrl = `/${encodeURI(
    queryPlace
  )}.json?access_token=${geoAccessToken}`;

  request({ url: geoBaseUrl + geoUrl, json: true }, (error, response) => {
    const data = response.body.features;
    // console.log(data);
    if (error) {
      // console.log('Server error.');
      callback('Server error.', undefined);
    } else if (data.length === 0) {
      // console.log('Unable to find the location of this place.');
      callback('Unable to find the location of this place.', undefined);
    } else {
      const lat = data[0].center[1];
      const long = data[0].center[0];
      const loc = data[0].place_name;
      // console.log(`${lat}\n${long}`);
      callback(undefined, {
        lat,
        long,
        loc
      });
    }
  });
};

module.exports = getGeolocation;
