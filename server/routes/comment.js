const express = require('express');
const app = express.Router();

const auth = require('../middlewares/auth');
const { comment } = require('../controllers');

app.post('/', auth, comment.create);
// app.get('/', auth, post.get);

module.exports = app;
