'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      content: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: 'from'
      // constraints: false
    });
    Message.belongsTo(models.User, {
      foreignKey: 'to'
      // constraints: false
    });
  };
  return Message;
};
