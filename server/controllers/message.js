const { User, Post, Comment, Friend, Message } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  create(req, res) {
    const { auth, to, content } = req.body;
    return Message.create({ from: auth.id, to, content })
      .then(message => {
        return res.status(201).send({ message });
      })
      .catch(error => res.status(400).send(error));
  },

  get(req, res) {
    const { auth } = req.body;
    return Message.findAll({
      // attributes: { exclude: ['userId'] },
      where: {
        [Op.or]: [{ from: auth.id }, { to: auth.id }]
      }
      // group: 'from'
    })
      .then(messages => {
        return res.status(200).send({
          messages
        });
      })
      .catch(error => res.status(400).send(error));
  }
};
