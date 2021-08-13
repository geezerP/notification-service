const User = require('../models/user');

/**
 * 
 * @param {*} phoneNumbers 
 * @param {*} message 
 * @returns Promise
 */
const SMSRequest = (phoneNumbers, message) => {

    return new Promise(function (resolve, reject) {
        // TODO: INTEGRATE WITH ACTUAL  SMS PROVIDER
        resolve({message: "success"});

    })

};

exports.SendGroupSMS = (req, res, next) => {

    const smsMessage = req.body.message;

    if (smsMessage === undefined || smsMessage === "") {
        res.status(400).json({error: "SMS Message is required!"})
    } else {
        User.find().exec().then(users => {

            let usersPhoneNumbers = users.map((user) => {
                return user.phoneNumber;
            });

            if (usersPhoneNumbers.length > 0) {
                let jsonResponse = [];
                let statusCode = 200;
                let smsLoadCapacity = 1000;
                let batchCapacity = usersPhoneNumbers.length / smsLoadCapacity;

                if (usersPhoneNumbers.length % smsLoadCapacity !== 0) {
                    batchCapacity++;
                }

                batchCapacity = Math.floor(batchCapacity);

                for (let i = 0; i < batchCapacity; i++) {
                    let start = i * smsLoadCapacity, end = (i + 1) * smsLoadCapacity;
                    let batchPhoneNumbers = usersPhoneNumbers.slice(start, end);

                    SMSRequest(batchPhoneNumbers, msg).then(jsonObj => {
                        jsonResponse.push({loadNumber: i + 1, success: jsonObj});
                        if (i + 1 === batchCapacity) {
                            res.status(statusCode).json(jsonResponse);
                        }
                    }).catch(error => {
                        jsonResponse.push({loadNumber: i + 1, error: error});
                        statusCode = 500;

                        if (i + 1 === batchCapacity) {
                            res.status(statusCode).json(jsonResponse);
                        }
                    });

                    setTimeout(() => {

                    }, 60000);

                }
            } else {
                res.status(200).json({message: "No phonenumbers to send message to"})
            }


        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
    }
};

exports.SendIndividualSMS = (req, res, next) => {
    const smsMessage = req.body.message;
    const requestId = req.body.ids;

    if (smsMessage === undefined || smsMessage === "" || requestId === undefined) {
        res.status(400).json({error: "SMS Message and Id is required"});
    } else {
        User.find({'userId': requestId}).select('phoneNumber -_id').then(users => {
            let phoneNumbers = users.map((user) => {
                return user.phoneNumber;
            });

            if (phoneNumbers.length > 0) {
                SMSRequest(phoneNumbers, smsMessage).then(jsonObj => {
                    res.status(200).json(jsonObj);
                }).catch(error => {
                    res.status(500).json(error);
                })
            } else {
                res.status(200).json({message: "No valid ids"});
            }

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
    }
};