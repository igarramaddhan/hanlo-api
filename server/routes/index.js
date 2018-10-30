const user = require('./user');
const post = require('./post');
const comment = require('./comment');

module.exports = app => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Todos API!'
    })
  );

  //user
  app.use('/api', user);

  //post
  app.use('/api/post', post);

  app.use('/api/post/comment', comment);
};
