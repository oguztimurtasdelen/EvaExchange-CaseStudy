const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolioController');

router.get("", portfolioController.getPortfolio);

//router.get("/:portfolioid", portfolioController.getPortfolioById);

router.post("", portfolioController.createPortfolio);

router.put("", portfolioController.updatePortfolio);

module.exports = router;