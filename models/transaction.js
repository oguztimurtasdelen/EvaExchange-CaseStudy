'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init({
    portfolioId: DataTypes.INTEGER,
    symbol: DataTypes.STRING(3),
    shareRate: DataTypes.DECIMAL(5, 2),
    shareQuantity: DataTypes.INTEGER,
    type: DataTypes.ENUM("BUY", "SELL")
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};