const express = require('express');
const app = express.Router();

const auth = require('../middlewares/auth');
const { post } = require('../controllers');

app.post('/', auth, post.create);
app.get('/', auth, post.get);
app.get('/user/:userId', auth, post.getById);

module.exports = app;
