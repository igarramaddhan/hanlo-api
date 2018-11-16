'use strict';
const { Message } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let bulkData = [
      {
        from: 1,
        to: 2,
        content: 'Hi user2'
      },
      {
        from: 1,
        to: 3,
        content: 'Hi user3'
      },
      {
        from: 2,
        to: 1,
        content: 'Hello user1'
      },
      {
        from: 2,
        to: 3,
        content: 'Hi user3'
      },
      {
        from: 3,
        to: 2,
        content: 'Hello user2'
      },
      {
        from: 3,
        to: 1,
        content: 'Hello user1'
      }
    ];
    return Message.bulkCreate(bulkData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
