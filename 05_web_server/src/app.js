const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  //   res.send('Hello, express.');
  res.render('index', {
    title: 'Weather'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is some helpful text.'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me'
  });
});

app.get('/weather', (req, res) => {
  // console.log(req.query);

  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  geocode(req.query.address, (error, { lat, long, loc } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      let responseMsg = `${forecastData.daily.data[0].summary} `;
      responseMsg += `It is currently ${forecastData.currently.temperature} °C outside. There is ${forecastData.currently.precipProbability}% chance of rain.\n`;

      res.send({
        forecast: responseMsg,
        location: loc,
        address: req.query.address
      });
    });
  });

  // if (!req.query.address) {
  //   res.send({
  //     error: 'Address not Provided'
  //   });
  // } else {
  //   res.send({
  //     address: req.query.address
  //   });
  // }
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    content: 'Help Article not Found',
    title: '404 Page'
  });
});

app.get('*', (req, res) => {
  // res.send('My 404 Page.');
  res.render('404', {
    content: 'Page not Found',
    title: '404 Page'
  });
});

app.listen(3000, () => {
  console.log('Server is running.');
});
