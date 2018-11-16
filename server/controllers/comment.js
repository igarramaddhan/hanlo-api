const { Comment, User } = require('../models');

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
  },
  async get(req, res) {
    try {
      const { postId } = req.params;
      console.log(req.params);
      const comments = await Comment.findAll({
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['userId'] },
        where: { postId: postId },
        include: [
          {
            model: User,
            attributes: ['id', 'username']
          }
        ]
      });

      res.status(200).send({
        comments
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
