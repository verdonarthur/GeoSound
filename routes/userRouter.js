const express = require('express')
const router = express.Router()
const User = require('../app/models/User');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

/* GET one user */
router.get('/:id', function (req, res, next) {

    User.findOne({_id:req.params.id}, {password:0}).exec(function (err, user) {
        if (err) {
            res.status(401).send('id badly formated');
            return next(err)
        }
        if (user == null) {
            res.status(404).send('User not found');
            return next(err)
        }

        res.send(user)
    })
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.find({},{password:0}).sort('name').exec(function (err, users) {
        if (err) {
            return next(err);
        }
        res.send(users);
    });
});


/* POST  => Create a new user */
router.post('/', function (req, res, next) {
    console.log(req.body);
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
router.put('/', function (req, res, next) {

});

/* Delete user */
router.delete('/:id', function (req, res, next) {


    User.findByIdAndRemove(req.params.id).exec(function (err, user) {
        if (err) {
            res.status(404).send('User not found');
            return next(err)
        }

        res.status(200).send("User with " + req.params.id + " successfully deleted")
    })

});

module.exports = router;