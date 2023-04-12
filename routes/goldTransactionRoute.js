const express = require('express');
const router = express.Router();
const goldTransactionRouteController = require('../route-controllers/goldTransactionRouteController.js');

router.post('/newGoldTransaction', goldTransactionRouteController.createNewGoldTransaction);

module.exports = router;
