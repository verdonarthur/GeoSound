const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const config = require('../../config/app.conf.js')
const bcrypt = require('bcrypt')


let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date
    }
});

// Customize the behavior of user.toJSON() (called when using res.send)
userSchema.set('toJSON', {
    transform: transformJsonPerson, // Modify the serialized JSON with a custom function
    virtuals: true // Include virtual properties when serializing documents to JSON
});

/**
 * Removes extra MongoDB properties from serialized people.
 */
function transformJsonPerson(doc, json, options) {

    delete json._id;
    delete json.__v;
    delete json.password;
    return json;
}

userSchema.statics.verifyCredentials = function (email, password, callback) {
    User.findOne({email: email}).exec(function (err, user) {
        if (err) {

            return callback(err)
        }
        if (user === null) {
            const err = new Error()
            err.status = 404
            err.message = 'User Not Found'
            return callback(err)
        }

        bcrypt.compare(password, user.password, function (err, valid) {
            // Handle error and password validity...
            if (err) {
                return callback(err);
            } else if (!valid) {
                const err = new Error('invalid password')
                err.status = 401
                err.message = 'invalid password'
                return callback(err)
            }

            callback(undefined, user)
        })
    })
}

userSchema.methods.generateJwt = function (callback) {

    jwt.sign({
            sub: this._id,
            exp: (new Date().getTime() + 7 * 24 * 3600 * 1000) / 1000,
            iat: Date.now(),
        },
        config.secretKey, function (err, token) {
            if (err) {
                return callback(err)
            }
            return callback(undefined, token)
        })
}

let User = mongoose.model('users', userSchema);
module.exports = User;