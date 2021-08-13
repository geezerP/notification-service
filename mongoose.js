const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://meshackmwaura:' + process.env.MONGO_ATLAS_PW + '@notifications-u3azq.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});

module.exports = mongoose;