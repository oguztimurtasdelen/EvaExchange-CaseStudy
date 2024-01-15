const TransactionModel = require('../models').transaction;
const shareFunctions = require('../functions/shareFunctions');

const PortfolioModel = require('../models').portfolio;

const Sequelize = require('sequelize');
const config = require('../config/config')["development"];

const getAllTransactions = async (req, res, next) => {
    const params = req.query;
    var filters = {};

    if (params.portfolioId != null) {
        filters.portfolioId = params.portfolioId;
    }

    if (params.type && ["BUY", "SELL"].includes(params.type)) {
        filters.type = params.type;
    }

    const transactions = await TransactionModel.findAll({
        where: filters
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        return error;
    });

    if (!(transactions instanceof Error)) {
        res.json(transactions);
    } else {
        res.json({
            success: false,
            error: "Error while getting transactions"
        });
    }

}

const createTransaction = async (req, res, next) => {
    var transactionInfo = req.body;
    transactionInfo.shareRate = await shareFunctions.getShareRate(transactionInfo.symbol);

    var _portfolio = await PortfolioModel.findByPk(transactionInfo.portfolioId);
    if (transactionInfo.type === "BUY") {
        if (_portfolio) {
            const portfolioItemIndex = _portfolio.wallet.portfolio.findIndex(share => share.symbol === transactionInfo.symbol);
            if (portfolioItemIndex !== -1) {
                _portfolio.wallet.portfolio[portfolioItemIndex].quantity += transactionInfo.shareQuantity;
            } else {
                _portfolio.wallet.portfolio.push({symbol: transactionInfo.symbol, quantity: transactionInfo.shareQuantity});
            }

            await _portfolio.update(_portfolio.dataValues);
        }
        
    } else if (transactionInfo.type === "SELL") {
        
        const sequelize = new Sequelize(config);
        var result = await TransactionModel.findAll({
            attributes: ['symbol', 'type', [sequelize.fn('SUM', sequelize.col('shareQuantity')), 'totalShareQuantity']],
            group: ['type'],
            where: {symbol: transactionInfo.symbol}
        });

        const totalShareBought = result.find(r => r.dataValues.type === "BUY").dataValues.totalShareQuantity;
        const totalShareSold = result.find(r => r.dataValues.type === "SELL").dataValues.totalShareQuantity;

        // Difference between boutgth and sold is greater than quantity of desired to sold means ok. Otherwise, means not enough share in market place. And also, the maximum salable share is how much the user has 
        const portfolioItemIndex = _portfolio.wallet.portfolio.findIndex(share => share.symbol === transactionInfo.symbol);
        if (portfolioItemIndex !== -1) {
            const currentQuantity = _portfolio.wallet.portfolio[portfolioItemIndex].quantity;
            if (totalShareBought - totalShareSold > transactionInfo.shareQuantity && currentQuantity >= transactionInfo.shareQuantity) {
                _portfolio.wallet.portfolio[portfolioItemIndex].quantity = transactionInfo.shareQuantity;
            } else {
                res.json({
                    success: false,
                    error: "Not enough share"
                });
            }
        }
    }

    await _portfolio.update(_portfolio.dataValues);
    
    var transaction = await TransactionModel.create({
        portfolioId: transactionInfo.portfolioId,
        symbol: transactionInfo.symbol,
        shareRate: transactionInfo.shareRate,
        shareQuantity: transactionInfo.shareQuantity,
        type: transactionInfo.type
    });
    
    
    

    res.json({
        transactionInfo: transaction
    })
}

module.exports = {
    getAllTransactions: getAllTransactions,
    createTransaction: createTransaction,
};
