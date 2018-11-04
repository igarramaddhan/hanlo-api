const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/config');
const { User, Post, Comment } = require('../models');
const DB = require('../models');

module.exports = {
  //create
  create(req, res) {
    const { username, password, displayName } = req.body;
    const hashedPassword = bcrypt.hashSync(req.body.password);
    return User.count({ where: { username } }).then(count => {
      if (count !== 0) {
        return res.status(409).send({ message: 'Username already exist!' });
      } else {
        User.create({ username, password: hashedPassword, displayName })
          .then(user => {
            const token = jwt.sign(
              {
                id: user.id,
                username: user.username,
                displayName: user.displayName
              },
              config.jwt_encryption,
              {
                expiresIn: config.jwt_expiration
              }
            );
            return res.status(201).send({ token });
          })
          .catch(error => res.status(400).send(error));
      }
    });
  },

  //login
  login(req, res) {
    const { username, password } = req.body;
    return User.findOne({
      where: { username },
      include: [
        {
          model: Post,
          as: 'posts',
          include: [
            {
              model: Comment,
              as: 'comments'
            }
          ]
        }
      ]
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found!'
          });
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid)
          return res.status(401).send({ message: 'unauthenticated' });

        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            displayName: user.displayName
          },
          config.jwt_encryption,
          {
            expiresIn: '10h'
          }
        );
        res.status(200).send({ token });
      })
      .catch(error => res.status(400).send(error));
  },

  //get user
  me(req, res) {
    const { auth } = req.body;
    return User.findByPk(auth.id, {
      include: [
        {
          model: Post,
          as: 'posts',
          include: [
            {
              model: Comment,
              as: 'comments'
            }
          ]
        }
      ]
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found!'
          });
        }

        const { username, displayName, posts } = user;
        res.status(200).send({
          user: { username, displayName, posts }
        });
      })
      .catch(error => res.status(400).send(error));
  },

  getById(req, res) {
    const { userId } = req.params;
    DB.sequelize
      .query('select * from Users where id = :id;', {
        replacements: { id: userId },
        type: DB.sequelize.QueryTypes.SELECT
      })
      .then(users => {
        res.status(200).send(users);
      });
  }
};
