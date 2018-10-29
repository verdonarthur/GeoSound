const express = require('express')
const User = require('../app/models/User');
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;


/**
 * @api {post} /login Login a user
 * @apiName Log-in
 * @apiGroup Login
 * @apiParam (Request body) {email} email Email credentials of the user trying to login
 * @apiParam (Request body) {string} password Password of the user trying to login
 *
 * @apiSuccess {token[]} jwt  A json web token that must be sent with every request to identify the user
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *     Content-Type: application/json; charset=utf-8
 *
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDE0MDcxMTkuMzQ2LCJpYXQiOjE1NDA4MDIzMTkzNDZ9.-x2WD3X6hVU1g-l_7tXIeYPlLOaDAARJPAGPhZlQo6I"
 * }
 *
 * @apiError 404 The email of the User was not found.
 * @apiErrorExample 404:
 *     HTTP/1.1 404 Not Found
 *     Content-Type: application/json; charset=utf-8
 *
 *     {
 *          "status": 404,
 *          "message": "User Not Found"
 *     }
 *
 * @apiError 401 The password of the User is invalid.
 * @apiErrorExample 401:
 *     HTTP/1.1 401 Unauthorized
 *     Content-Type: application/json; charset=utf-8
 *     {
 *          "status": 401,
 *          "message": "invalid password"
 *     }
 */
router.post('/login', function (req, res, next) {

    if(req.body.email == null || req.body.password == null )
    {
        let err = new Error('Bad Request')
        err.message = "Missing passwor or email field"
        err.status = 400
        return next(err)
    }
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

/**
 * @apiDefine AuthHeader
 * @apiHeader {String} Authorization User's Json Web Token .
 * @apiHeaderExample {string} Header-Example:
 *
 *       Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmM0NWZiNTE4ODA1YTNiNDcxMTQ4NWYiLCJleHAiOjE1NDA5ODU4MTAuMzYzLCJpYXQiOjE1NDAzODEwMTAzNjN9.FfHM68MJlMYyUbwY5lxIt6w-OlfWYZxXWLOlLfo8rf4
 *
 */


/**
 * @api {post} /register Register a user
 * @apiName Register
 * @apiGroup Login
 * @apiParam (Request body) {name {3-20}} name Name of the new user
 * @apiParam (Request body) {email} email Email of the new user
 * @apiParam (Request body) {string} password Password of the new user
 *
 * @apiSuccess {object[]} user  The newly created user
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *
 * {
 *   "name": "Foo Bar",
 *   "email": "test@example.com",
 *   "registrationDate": "2018-10-29T09:16:28.095Z",
 *   "id": "5bd6cfec05f26128d2edb264"
 * }
 *
 * @apiError 422 Wrong request
 * @apiErrorExample 422:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
    "message": "users validation failed: email: Path `email` is required., name: Path `name` is required., password: Path `password` is required.",
    "errors": {
        "email": {
            "message": "Path `email` is required.",
            "name": "ValidatorError",
            "properties": {
                "message": "Path `email` is required.",
                "type": "required",
                "path": "email"
            },
            "kind": "required",
            "path": "email",
            "$isValidatorError": true
        },
        "name": {
            "message": "Path `name` is required.",
            "name": "ValidatorError",
            "properties": {
                "message": "Path `name` is required.",
                "type": "required",
                "path": "name"
            },
            "kind": "required",
            "path": "name",
            "$isValidatorError": true
        },
        "password": {
            "message": "Path `password` is required.",
            "name": "ValidatorError",
            "properties": {
                "message": "Path `password` is required.",
                "type": "required",
                "path": "password"
            },
            "kind": "required",
            "path": "password",
            "$isValidatorError": true
        }
    }
}
 *
 *
 */
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