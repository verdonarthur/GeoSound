const express = require('express')
const User = require('../app/models/User');
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/login', function (req, res, next) {

    User.verifyCredentials(req.body.email, req.body.password, function (err, user) {
        if (err) {
            return next(err)

        }
        user.generateJwt(function (err, jwt) {
            if (err) {
                return next(err)
            }
            res.send({token: jwt})
        })
    })
});

router.get('/logout', function (req, res, next) {
    //TODO Logout ?
    res.send({logout: true})
});

router.post('/register', function (req, res, next) {
    // Create a new document from the JSON in the request body
    let newUser = req.body;
    newUser.registrationDate = Date.now();
    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
        newUser.password = hash;
        const newUserDocument = new User(newUser);
        // Save that document
        newUserDocument.save(function (err, savedUser) {
            if (err) {
                console.log(err)
                return next(err);
            }
            // Send the saved document in the response
            res.send(savedUser);
        });
    });
});

module.exports = router;