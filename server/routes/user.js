const express = require('express');
const app = express.Router();

const auth = require('../middlewares/auth');
const { user } = require('../controllers');

app.post('/register', user.create);
app.post('/login', user.login);
app.get('/me', auth, user.me);

module.exports = app;
