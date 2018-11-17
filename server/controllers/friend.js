const { User, Post, Comment, Friend } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { auth, friendId } = req.body;
      const friends = await Friend.findAll({
        attributes: { exclude: ['userId'] },
        where: { userId: auth.id, friendId: friendId },
        include: [
          {
            model: User,
            attributes: ['id', 'username']
          }
        ]
      });

      if (friends.length === 0) {
        if (auth.id === friendId) {
          res
            .status(409)
            .send({ message: 'You cannot add yourself as friend' });
        } else {
          const friend = await Friend.create({
            userId: auth.id,
            friendId: friendId
          });
          res.status(201).send({ friend });
        }
      } else {
        res.status(409).send({ message: 'Friend already exist' });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  async get(req, res) {
    try {
      const { auth } = req.body;
      const friends = await Friend.findAll({
        attributes: { exclude: ['userId'] },
        where: { userId: auth.id },
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'displayName']
          }
        ]
      });

      let friendWithStatus = friends.map(friend => {
        return {
          id: friend.User.id,
          username: friend.User.username,
          displayName: friend.User.displayName,
          isFriend: true
        };
      });

      res.status(200).send({
        friends: friendWithStatus
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
};
