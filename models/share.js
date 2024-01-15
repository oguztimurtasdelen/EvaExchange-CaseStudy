'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class share extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  share.init({
    symbol: DataTypes.STRING(3),
    rate: DataTypes.DECIMAL(5, 2)
  }, {
    sequelize,
    modelName: 'share',
  });
  return share;
};