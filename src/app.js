const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Get forecast data',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: 'You must provide a location',
    });
  }

  geocode(
    req.query.location,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          input: req.query.location,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('404page', {
    title: '404 Error -  Page not found.',
  });
});

app.listen(port, () => {
  console.log('Server is up on port' + port);
});
