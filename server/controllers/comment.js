const { Comment } = require('../models');

module.exports = {
  create(req, res) {
    const { auth, content, postId } = req.body;
    return Comment.create({ content, userId: auth.id, postId })
      .then(post => {
        return res.status(201).send({ post });
      })
      .catch(error => res.status(400).send(error));
  }
};
