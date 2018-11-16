const {
  User,
  Post,
  Comment,
  Friend,
  Message,
  sequelize
} = require('../models');
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

      let msg = [];
      for (let i = 0; i < messages.length; i++) {
        const el = messages[i];

        // GET current chat friend id
        let current;
        if (el.from === auth.id) {
          current = el.to;
        } else if (el.to === auth.id) {
          current = el.from;
        }
        let index = msg.findIndex(val => val.user[0].id === current);
        if (index === -1) {
          let chat = [];
          for (let j = 0; j < messages.length; j++) {
            const element = messages[j];
            if (
              (element.from === auth.id && element.to === current) ||
              (element.to === auth.id && element.from === current)
            ) {
              chat.push(element);
            }
          }
          const user = await sequelize.query(
            'select id,username,displayName from Users where id = :id;',
            {
              replacements: { id: current },
              type: sequelize.QueryTypes.SELECT
            }
          );
          if (chat.length !== 0) msg.push({ chat, user });
        }
      }

      res.status(200).send({
        messages: msg
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
