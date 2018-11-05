'use strict';
const { Post } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let bulkData = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        bulkData.push({
          userId: i + 1,
          content: `Post number ${j + 1} for user ${i + 1}`
        });
      }
    }
    return Post.bulkCreate(bulkData, {});
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
