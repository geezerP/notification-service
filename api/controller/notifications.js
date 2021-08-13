const User = require('../models/user');
const admin = require('../../firebase');
  
/**
 * 
 * @param {*} tokens 
 * @param {*} payload
 * @returns Promise
 */
const SendPushNotifications = (tokens, payload) => {

    let options = {
        priority: "normal",
        timeToLive: 60 * 60
    };
    return new Promise(function (resolve, reject) {
        admin.messaging().sendToDevice(tokens, payload, options)
            .then(function (response) {
                resolve({message: response});

            })
            .catch(function (error) {
                console.log("Error sending message:", error);
                reject({error: error});
            });
    })

};

exports.SendNotificationToAll = (req, res, next) => {

    const title = req.body.title;
    const message = req.body.message;
    const data = req.body.data;
    if (message === undefined || message === "" || title === undefined || title === "" || data === undefined) {
        res.status(400).json({error: "title, message, and data are required"});
    } else {
        let payload = {
            notification: {
                title: title,
                body: message
            },
            data: data
        };

        User.find().exec().then(users => {

            let tokens = users.map((user) => {
                return user.token;
            });

            if (tokens.length > 0) {
                let jsonResponse = [];
                let statusCode = 200;
                let batchCapacity = tokens.length / 1000;
                if (tokens.length % 1000 !== 0) {
                    batchCapacity++;
                }
                batchCapacity = Math.floor(batchCapacity);

                for (let i = 0; i < batchCapacity; i++) {
                    let start = i * 1000, end = (i + 1) * 1000;
                    let batchTokens = tokens.slice(start, end);
                    SendPushNotifications(batchTokens, payload).then(jsonObj => {
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
                }
            } else {
                res.status(200).json({message: "no tokens to send to"})
            }


        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
    }
};

exports.SendNotificationToIndividual = (req, res, next) => {
    const Ids = req.body.ids;
    const title = req.body.title;
    const message = req.body.message;
    const data = req.body.data;

    if (Ids === undefined || message === undefined || title === undefined || data === undefined || message === "" || title === "") {
        res.status(400).json({error: "ids, title, message, and data are required"});
    } else {
        let payload = {
            notification: {
                title: title,
                body: message
            },
            data: data
        };

        User.find({'userId': Ids}).select('token -_id').then(users => {
            let tokens = users.map((user) => {
                return user.token;
            });

            if (tokens.length > 0) {
                SendPushNotifications(tokens, payload).then(jsonObj => {
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

exports.SendNotificationToGroup = (req, res, next) => {
    const topic = req.body.topic;
    const title = req.body.title;
    const message = req.body.message;
    const data = req.body.data;

    if (topic === undefined || topic === "" || message === undefined || title === undefined || data === undefined || message === "" || title === "") {
        res.status(400).json({error: "topic, title, message, and data are required"});
    } else {

        let payload = {
            notification: {
                title: title,
                body: message
            },
            data: data
        };

        admin.messaging().sendToTopic(topic, payload)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    }
};
