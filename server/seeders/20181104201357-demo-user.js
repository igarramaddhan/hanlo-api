'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'user1',
          password: bcrypt.hashSync('123'),
          displayName: 'User 1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'user2',
          password: bcrypt.hashSync('123'),
          displayName: 'User 2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'user3',
          password: bcrypt.hashSync('123'),
          displayName: 'User 3',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
