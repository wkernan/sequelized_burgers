'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Burgers', [
    {burger_name: 'burger1'},{burger_name: 'burger2'},{burger_name: 'burger3'},{burger_name: 'burger4'},{burger_name: 'burger5'},{burger_name: 'burger6'},{burger_name: 'burger7'},{burger_name: 'burger8'},{burger_name: 'burger9'},{burger_name: 'burger10'}
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Burgers', {burger_name: ['burger1', 'burger2', 'burger3', 'burger4', 'burger5', 'burger6', 'burger7', 'burger8', 'burger9', 'burger10']},{truncate:true});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
