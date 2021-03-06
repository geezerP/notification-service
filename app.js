const express = require('express');
const app = express();
const morgan = require('morgan');
const smsRoutes = require('./api/routes/sms');
const tokenRoute = require('./api/routes/token')
const notificationsRoutes = require('./api/routes/notifications');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/sms', smsRoutes);
app.use('/notifications', notificationsRoutes)
app.use('/token', tokenRoute)

app.use((req, res, next) => {
    const error = new Error("Route doesn't Exist");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;