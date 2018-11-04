const express = require('express');
const app = express.Router();

const auth = require('../middlewares/auth');
const { friend } = require('../controllers');

app.post('/add', auth, friend.create);
app.get('/', auth, friend.get);

module.exports = app;
