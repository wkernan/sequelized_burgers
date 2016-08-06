'use strict';
module.exports = function(sequelize, DataTypes) {
  var ingredient = sequelize.define('ingredient', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        ingredient.belongsTo(models.burger);
        // associations can be defined here
      }
    }
  });
  return ingredient;
};