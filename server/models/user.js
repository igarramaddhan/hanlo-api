'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: { type: DataTypes.STRING, allowNull: false },
      displayName: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts'
      // constraints: false
    });
    // User.hasMany(models.Friend, {
    //   foreignKey: 'userId',
    //   as: 'friends',
    //   constraints: false
    // });
  };
  return User;
};
