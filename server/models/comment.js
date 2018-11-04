'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Comment.associate = models => {
    // associations can be defined here
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      onDelete: 'CASCADE'
      // constraints: false
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId'
      // constraints: false
    });
  };
  return Comment;
};
