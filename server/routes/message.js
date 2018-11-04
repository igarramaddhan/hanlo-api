const express = require('express');
const app = express.Router();

const auth = require('../middlewares/auth');
const { message } = require('../controllers');

app.post('/', auth, message.create);
app.get('/', auth, message.get);

module.exports = app;
