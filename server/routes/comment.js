const express = require('express');
const app = express.Router();

const auth = require('../middlewares/auth');
const { comment } = require('../controllers');

app.post('/', auth, comment.create);
app.get('/:postId', auth, comment.get);

module.exports = app;
