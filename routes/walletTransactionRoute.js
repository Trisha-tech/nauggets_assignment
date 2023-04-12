const express = require('express');
const router = express.Router();
const walletTransactionRouteController = require('../route-controllers/walletTransactionRouteController.js');

router.post('/newWalletTransaction', walletTransactionRouteController.createNewWalletTransaction);

module.exports = router;
