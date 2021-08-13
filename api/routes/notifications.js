const express = require('express');
const router = express.Router();

const NotificationsController = require('../controller/notifications');
/*
    Post request that send Notification for all users,
    It takes title, message and data in the request body.
    title: string, required,
    message: string, required,
    data: object, required
 */
router.post('/send-notifications-to-all', NotificationsController.SendNotificationToAll);


/*
    Post request that send Notification for a specific user or users
    It takes ids, title, message, and data in the request body.
    ids: string or array of strings, required,
    title: string, required,
    message: string, required,
    data: object, required
 */
router.post('/send-individual-notification', NotificationsController.SendNotificationToIndividual);


/*
    Post request that send Notification for a specific group with a common topic
    It takes topic, title, message, and data in the request body.
    topic: string, required,
    title: string, required,
    message: string, required,
    data: object, required
 */
router.post('/send-to-group', NotificationsController.SendNotificationToGroup);

module.exports = router;