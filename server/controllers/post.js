const { User, Post, Comment } = require('../models');

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
    return Post.findAll({
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['userId'] },
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
        // while (index < posts.length - 1) {
        //   data.push({
        //     id: posts[index].id,
        //     user: {
        //       id: posts[index].userId,
        //       username: posts[index].User.username
        //     },
        //     content: posts[index].content,
        //     createdAt: posts[index].createdAt,
        //     comment: posts[index].comments
        //   });
        // }
        res.status(200).send({
          posts
        });
      })
      .catch(error => res.status(400).send(error));
  }
};
