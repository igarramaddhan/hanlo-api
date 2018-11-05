'use strict';
const { Comment } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let bulkData = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 3; j++) {
        bulkData.push({
          userId: j + 1,
          content: `comment from user ${j + 1} on post ${i + 1}`,
          postId: i + 1
        });
      }
    }
    return Comment.bulkCreate(bulkData, {});
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
