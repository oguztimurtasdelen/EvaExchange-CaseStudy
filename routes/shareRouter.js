const express = require('express');
const router = express.Router();

const shareController = require('../controllers/shareController');
const cacheController = require('../middlewares/cache');

router.get("", cacheController('caching-key'), shareController.getAllShares);

router.post("", shareController.createShare);

router.put("", shareController.updateShare);

module.exports = router;