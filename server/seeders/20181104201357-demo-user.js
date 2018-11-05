'use strict';
const bcrypt = require('bcryptjs');
const { User } = require('../models');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return User.bulkCreate(
      [
        {
          username: 'user1',
          password: bcrypt.hashSync('123'),
          displayName: 'User 1'
        },
        {
          username: 'user2',
          password: bcrypt.hashSync('123'),
          displayName: 'User 2'
        },
        {
          username: 'user3',
          password: bcrypt.hashSync('123'),
          displayName: 'User 3'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
