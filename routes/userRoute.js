const express = require('express');
const router = express.Router();
const userRouteController = require('../route-controllers/userRouteController.js');

router.post('/newUser', userRouteController.createNewUser);

module.exports = router;
