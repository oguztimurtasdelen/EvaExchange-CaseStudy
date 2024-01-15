const PortfolioModel = require('../models').portfolio;

const getPortfolio = async (req, res, next) => {
    const portfolioId = req.query.portfolioid;
    var _portfolio;

    if (portfolioId == null) {
        //get all portfolios
        _portfolio = await PortfolioModel.findAll()
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
    } else {
        // get portfolio by id
        _portfolio = await PortfolioModel.findByPk(portfolioId)
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
    }

    if (!(_portfolio instanceof Error)) {
        res.json(_portfolio);
    } else {
        res.json({
            success: false,
            error: _portfolio
        });
    }
}

const createPortfolio = async (req, res, next) => {
    var _wallet = req.body;
    /*
    var _wallet = {
        name: "Jane Doe",
        portfolio: [],
        active: true
    }
    */

    PortfolioModel.create({
        wallet: _wallet
    })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.json({
            success: false,
            error: error.original.cod
        });
    });
}

const bulkCreatePortfolio = async (req, res, next) => {
    const result = await PortfolioModel.bulkCreate(
      [
        {wallet: {
            "name": "Jane Doe",
            "portfolio": [
                {
                    "symbol": "ETH",
                    "quantity": 12
                },
                {
                    "symbol": "BTC",
                    "quantity": 8
                },
                {
                    "symbol": "ADA",
                    "quantity": 27
                },
                {
                    "symbol": "XRP",
                    "quantity": 2
                }
            ],
            "active": true
        }},
        {wallet: {
            "name": "John Doe",
            "portfolio": [
                {
                    "symbol": "ETH",
                    "quantity": 25
                },
                {
                    "symbol": "ADA",
                    "quantity": 12
                },
                {
                    "symbol": "DOT",
                    "quantity": 3
                },
                {
                    "symbol": "BTC",
                    "quantity": 1
                }
            ],
            "active": false
        }},{wallet: {
            "name": "Oğuz Timur Taşdelen",
            "portfolio": [
                {
                    "symbol": "BTC",
                    "quantity": 9
                },
                {
                    "symbol": "ETH",
                    "quantity": 19
                },
                {
                    "symbol": "ADA",
                    "quantity": 24
                },
                {
                    "symbol": "DOT",
                    "quantity": 1
                },
                {
                    "symbol": "XRP",
                    "quantity": 5
                }
            ],
            "active": true
        }},
      ]
    );
  
    res.json({
      result: result
    });
  }

const updatePortfolio = async (req, res, next) => {
  
}

module.exports = {
    getPortfolio: getPortfolio,
    createPortfolio: createPortfolio,
    bulkCreatePortfolio: bulkCreatePortfolio,
    updatePortfolio: updatePortfolio
};