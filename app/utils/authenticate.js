const jwt = require('jsonwebtoken')
const config = require('../../config/app.conf.js')
const User = require('../models/User');
module.exports = function (req, res, next) {

    const authorization = req.get('Authorization');
    if (!authorization) {
        const err = new Error()
        err.name = "Unauthorized"
        err.status = "401"
        err.message = 'Authorization header is missing'
        return next(err)
    }
    // Check that the header has the correct format.
    const match = authorization.match(/^Bearer (.+)$/);
    if (!match) {
        const err = new Error()
        err.name = "Unauthorized"
        err.status = "401"
        err.message = 'Authorization header is not a bearer token'
        return next(err)
    }

    // Extract and verify the JWT.
    const token = match[1]
    jwt.verify(token, config.secretKey, function (err, payload) {
        if (err) {
            const err = new Error()
            err.name = "Unauthorized"
            err.status = "401"
            err.message = "Your token is invalid or has expired"
        } else {
            User.findOne({_id: payload.sub}).exec(function (err, user) {
                if (err) {

                    return next(err)
                }
                if (user === null) {
                    const err = new Error()
                    err.status = 403
                    err.message = 'User Doesn\'t exist anymore'
                    return next(err)
                }
                req.currentUserId = payload.sub;
                next(); // Pass the ID of the authenticated user to the next middleware.
            })
        }
    });

}