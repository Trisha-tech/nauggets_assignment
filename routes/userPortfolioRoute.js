const express = require('express');
const router = express.Router();
const userPortfolioRouteController = require('../route-controllers/userPortfolioRouteController.js');

router.get('/calculateUserPortfolio/:userId', userPortfolioRouteController.calculateUserPortfolio);

module.exports = router;