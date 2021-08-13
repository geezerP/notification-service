const mongoose = require('mongoose');

/*
    _id : Object Id
    token : FCM - (Firebase Cloud Messaging) Token for push notifications
    phoneNumber : User's phone number
    userdId : foreign key
    email : User's Email

 */
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    email: String
});

module.exports = mongoose.model('User', userSchema);