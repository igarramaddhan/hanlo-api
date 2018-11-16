const { User, Post, Comment, Friend, sequelize } = require('../models');
const Sequelize = require('sequelize');

module.exports = {
  async create(req, res) {
    try {
      const { auth, content } = req.body;
      const post = await Post.create({ content, userId: auth.id });
      res.status(201).send({ post });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async get(req, res) {
    try {
      const { auth } = req.body;
      const friends = await Friend.findAll({
        where: { userId: auth.id }
      });

      let friendIds = friends.map(val => val.friendId);
      friendIds.push(auth.id);
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']],
        attributes: {
          exclude: ['userId']
        },
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
      });

      res.status(200).send({
        posts
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
