let admin = require("firebase-admin");

let serviceAccount = require("./accountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.databaseURL
});


module.exports = admin;