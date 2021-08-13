const express = require('express');
const router = express.Router();

const RefreshTokenController = require('../controller/token');

/*
    PUT Request that takes id and the new token for the user
    id: string ,required,
    token: string, required
 */
router.put('/', RefreshTokenController.RefreshToken);


module.exports = router;