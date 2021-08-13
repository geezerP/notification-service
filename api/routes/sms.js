const express = require('express');
const router = express.Router();
const SMSController = require('../controller/sms');

/**
 * @Body {*} message
*/
router.post('/group-sms', SMSController.SendGroupSMS);

/**
 * @Body {*} message
*/
router.post('/individual-sms', SMSController.SendIndividualSMS);

module.exports = router;