const { User, Post, Comment, Friend, sequelize } = require('../models');

module.exports = {
  create(req, res) {
    const { auth, content } = req.body;
    return Post.create({ content, userId: auth.id })
      .then(post => {
        return res.status(201).send({ post });
      })
      .catch(error => res.status(400).send(error));
  },

  get(req, res) {
    const { auth } = req.body;
    return Friend.findAll({
      where: { userId: auth.id }
    })
      .then(async friends => {
        const x = await friends;
        const friendIds = x.map(val => val.id);
        return Post.findAll({
          order: [['createdAt', 'DESC']],
          attributes: { exclude: ['userId'] },
          where: { userId: { [sequelize.Op.in]: friendIds } },
          include: [
            {
              model: User,
              attributes: ['id', 'username']
            },
            {
              model: Comment,
              as: 'comments'
            }
          ]
        })
          .then(posts => {
            let data = [];
            let index = 0;
            res.status(200).send({
              posts
            });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
