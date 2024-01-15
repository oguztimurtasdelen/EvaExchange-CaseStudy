const shareController = require('../controllers/shareController');

const getShareRate = async (_symbol) => {

    const share = await shareController.getShareBySymbol(_symbol);
    const shareRate = share ? share.rate : null;

    return shareRate;
}

module.exports = {
    getShareRate: getShareRate
  };