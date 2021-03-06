'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Post.associate = models => {
    // associations can be defined here
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments'
      // constraints: false
    });

    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
      // constraints: false
    });
  };
  return Post;
};
