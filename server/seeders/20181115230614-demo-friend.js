'use strict';
const { Friend } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let bulkData = [
			{
				userId: 1,
				friendId: 2
			},
			{
				userId: 1,
				friendId: 3
			},
			{
				userId: 2,
				friendId: 1
			},
			{
				userId: 2,
				friendId: 3
			},
			{
				userId: 3,
				friendId: 2
			},
			{
				userId: 3,
				friendId: 1
			},
		];
    return Friend.bulkCreate(bulkData, {});
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
