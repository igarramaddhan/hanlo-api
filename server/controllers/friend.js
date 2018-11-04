const { User, Post, Comment, Friend } = require('../models');

module.exports = {
  create(req, res) {
    const { auth, friendId } = req.body;
    return Friend.findAll({
      attributes: { exclude: ['userId'] },
      where: { userId: auth.id, friendId: friendId },
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ]
    }).then(friends => {
      if (friends.length === 0) {
        if (auth.id === friendId) {
          return res
            .status(409)
            .send({ message: 'You cannot add yourself as friend' });
        } else {
          Friend.create({ userId: auth.id, friendId: friendId })
            .then(friend => {
              return res.status(201).send({ friend });
            })
            .catch(error => res.status(400).send(error));
        }
      } else {
        return res.status(409).send({ message: 'Friend already exist' });
      }
    });
  },

  get(req, res) {
    const { auth } = req.body;
    return Friend.findAll({
      attributes: { exclude: ['userId'] },
      where: { userId: auth.id },
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ]
    })
      .then(friends => {
        res.status(200).send({
          friends
        });
      })
      .catch(error => res.status(400).send(error));
  }
};
