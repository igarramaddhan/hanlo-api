const { Comment } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { auth, content, postId } = req.body;
      const comment = await Comment.create({
        content,
        userId: auth.id,
        postId
      });
      res.status(201).send({ comment });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
};
