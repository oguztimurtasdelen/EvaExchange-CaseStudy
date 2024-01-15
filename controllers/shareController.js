const ShareModel = require('../models').share;


const getAllShares = async (req, res, next) => {
  const shares = await ShareModel.findAll()
  .then((data) => {
    return data;
  })
  .catch((error) => {
    return error;
  });

  if (!(shares instanceof Error)) {
    res.json(shares)
  } else {
    res.json({
      success: false,
      error: shares.original.code
    });
  }
}

const getShareBySymbol = async (_symbol) => {
  const share = await ShareModel.findOne({
    where: {
      symbol: _symbol
    }
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    return null;
  });

  return share;
}

const createShare = async (req, res, next) => {
  var _share = req.body;

  ShareModel.create({
    symbol: _share.symbol,
    rate: _share.rate
  })
  .then((data) => {
    res.json(data);
  })
  .catch((error) => {
    res.json({
      success: false,
      error: error.original.code
    });
  });
}

const bulkCreateShare = async (req, res, next) => {
  const result = await ShareModel.bulkCreate(
    [
      {symbol: "BTC", rate: 44.56},
      {symbol: "ETH", rate: 28.33},
      {symbol: "DOT", rate: 11.02},
      {symbol: "ADA", rate: 6.89},
      {symbol: "XRP", rate: 0.45},
    ]
  );

  res.json({
    result: result
  });
}

const updateShare = async (req, res, next) => {
  var _share = req.body;

  const share = await ShareModel.findByPk(_share.id);

  // Check if share exists
  if (!share) {
    res.json({
      success: false,
      error: "RECORD_NOT_EXIST"
    });
  }

  share.update(_share)
  .then((data) => {
    res.json(data);
  })
  .catch((error) => {
    res.json({
      success: false,
      error: error.original.sqlMessage
    });
  });
}

module.exports = {
  getAllShares: getAllShares,
  getShareBySymbol: getShareBySymbol,
  createShare: createShare,
  bulkCreateShare: bulkCreateShare,
  updateShare: updateShare,
};