const { User, Post, Comment, Friend, Message } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  async create(req, res) {
    try {
      const { auth, to, content } = req.body;
      const message = await Message.create({ from: auth.id, to, content });
      res.status(201).send({ message });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async get(req, res) {
    try {
      const { auth } = req.body;
      const messages = await Message.findAll({
        where: {
          [Op.or]: [{ from: auth.id }, { to: auth.id }]
        }
      });

      res.status(200).send({
        messages
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
