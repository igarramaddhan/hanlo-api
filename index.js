const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const CONFIG = require('./server/config/config');
const app = express();
const Seed = require('./server/seeders');

app.use(logger('dev'));
app.use(bodyParser.json());

console.log('Environment:', CONFIG.app);

const models = require('./server/models');
models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to SQL database:', CONFIG.db_name);
  })
  .catch(err => {
    console.error('Unable to connect to SQL database:', CONFIG.db_name, err);
  });

if (CONFIG.app === 'development') {
  // models.sequelize.sync(); //creates table if they do not already exist
  models.sequelize.sync({ force: true }).then(() => {
    Seed();
  }); //deletes all tables then recreates them useful for testing and development purposes
}

require('./server/routes')(app);
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to the beginning of nothingness.'
  })
);

module.exports = app;
