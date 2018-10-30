const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/config');
const { User, Post, Comment } = require('../models');

module.exports = {
  //create
  create(req, res) {
    const { username, password, displayName } = req.body;
    const hashedPassword = bcrypt.hashSync(req.body.password);
    return User.create({ username, password: hashedPassword, displayName })
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
            expiresIn: config.jwt_expiration
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
  }
};
