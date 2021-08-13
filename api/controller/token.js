const User = require('../models/user');

/*
    refresh_user_token function updates the token of the user
    given the id and the new token. It extracts the id and token
    from the request body then updates the token of the associated user
 */
exports.RefreshToken = (req, res, next) => {

    if (req.body.id === undefined || req.body.token === undefined || req.body.id === "" || req.body.token === "") {
        res.status(400).json({error: "id and token are required"});
    } else {
        const id = req.body.id;
        const newToken = req.body.token;
        User.updateOne({userId: id}, {$set: {token: newToken}}).exec().then(response => {
            res.status(200).json(response);
        }).catch(err => {
                res.status(500).json({error: err});
            }
        );
    }
};