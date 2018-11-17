const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

const config = require('../config/config');
const { User, Post, Comment, Friend } = require('../models');
const DB = require('../models');

const Op = Sequelize.Op;

module.exports = {
  //create
  async create(req, res) {
    try {
      const { username, password, displayName } = req.body;
      const hashedPassword = bcrypt.hashSync(req.body.password);
      const count = await User.count({ where: { username } });
      if (count !== 0) {
        res.status(409).send({ message: 'Username already exist!' });
      } else {
        const user = await User.create({
          username,
          password: hashedPassword,
          displayName
        });
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
        res.status(201).send({ token });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  //login
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
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
      });

      if (!user) {
        return res.status(404).send({
          message: 'User not found!'
        });
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid)
        res.status(401).send({ message: 'unauthenticated' });

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
    } catch (error) {
      res.status(400).send(error);
    }
  },

  //get user
  async me(req, res) {
    try {
      const { auth } = req.body;
      const user = await User.findByPk(auth.id, {
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
      });

      if (!user) {
        res.status(404).send({
          message: 'User not found!'
        });
      }

      const { username, displayName, posts } = user;
      res.status(200).send({
        user: { username, displayName, posts }
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async getById(req, res) {
    try {
      const { userId } = req.params;
      const user = await DB.sequelize.query(
        'select id,username,displayName from Users where id = :id;',
        {
          replacements: { id: userId },
          type: DB.sequelize.QueryTypes.SELECT
        }
      );

      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async getByUsername(req, res) {
    try {
      const { auth } = req.body;
      const { username } = req.params;
      const users = await User.findAll({
        where: { username: { [Op.like]: `%${username}%` } },
        attributes: { exclude: ['password'] }
      });

      const friends = await Friend.findAll({
        attributes: { exclude: ['userId'] },
        where: { userId: auth.id }
      });

      let userWithFriendStatus = users.map(val => {
        return {
          id: val.id,
          username: val.username,
          displayName: val.displayName
        };
      });
      userWithFriendStatus.forEach(user => {
        friends.forEach(friend => {
          if (user.id === friend.friendId) {
            user.isFriend = true;
          } else {
            user.isFriend = false;
          }
          console.log(user);
        });
      });

      res.status(200).send({
        users: userWithFriendStatus
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
};
