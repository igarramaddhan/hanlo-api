'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {}, {});
  Friend.associate = function(models) {
    // associations can be defined here
    Friend.belongsTo(models.User, {
      foreignKey: 'userId'
      // constraints: false
    });
    Friend.belongsTo(models.User, {
      foreignKey: 'friendId'
      // constraints: false
    });
  };
  return Friend;
};
