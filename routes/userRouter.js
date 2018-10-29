const express = require('express')
const router = express.Router()
const User = require('../app/models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const utils = require('../app/utils/utils');

function findUserMiddleware(req, res, next) {
    User.findOne({_id: req.params.id}).exec(function (err, user) {
        if (err) {

            return next(err)
        }
        if (user === null) {
            const err = new Error()
            err.status = 404
            err.message = 'User Not Found'
            return next(err)
        }

        req.user = user;
        next()
    })
}

/* GET one user */
router.get('/:id', findUserMiddleware, function (req, res, next) {

    res.send(req.user)
})


/* GET users listing. */
router.get('/', function (req, res, next) {
    //TODO Pagination
    User.find().sort('name').exec(function (err, users) {
        if (err) {
            return next(err);
        }
        res.send(users);
    });
});


/* POST  => Create a new user */
router.post('/', utils.requireJson, function (req, res, next) {

    // Create a new document from the JSON in the request body
    let newUser = req.body;
    newUser.registrationDate = Date.now();
    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
        newUser.password = hash;
        const newUserDocument = new User(newUser);
        // Save that document
        newUserDocument.save(function (err, savedUser) {
            if (err) {
                return next(err);
            }
            // Send the saved document in the response
            res.send(savedUser);
        });
    });
});

/* Update user */
router.put('/:id', findUserMiddleware, function (req, res, next) {


    // Update all properties (regardless of whether the are present in the request body or not)
    req.user.name = req.body.name;
    req.user.email = req.body.email;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        req.user.password = hash;

        // Save that document
        req.user.save(function (err, savedUser) {
            if (err) {
                return next(err);
            }
            // Send the saved document in the response
            res.send(savedUser);
        });


    });


});

/* Delete user */
router.delete('/:id', findUserMiddleware, function (req, res, next) {

    bcrypt.compare(req.body.password, req.user.password, function (err, valid) {
        // Handle error and password validity...
        if (err) {
            return next(err);
        } else if (!valid) {
            const err = new Error()
            err.message = 'Invalid Password'

            return next(err)
        }

        User.findByIdAndRemove(req.user.id).exec(function (err, user) {
            if (err) {
                return next(err)
            }
            res.status(200).send({message: "User with " + req.params.id + " successfully deleted"})
        })
    });

});

module.exports = router;