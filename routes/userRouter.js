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

/* Get a user with its ID */
/**
 * @api {get} /user/:id Get User by Id
 * @apiParam {Number} id a user ID
 * @apiName GetUserById
 * @apiGroup User
 * @apiUse AuthHeader
 *
 * @apiSuccess {object[]} user  One user
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *
 *  {
 *      "name": "Foo Bar",
 *      "email": "test@example.com",
 *      "registrationDate": "2018-10-29T09:16:28.095Z",
 *      "id": "5bd6cfec05f26128d2edb264"
 *  }
 *
 *
 */
router.get('/:id', findUserMiddleware, function (req, res, next) {

    res.send(req.user)
})


/* GET users listing. */
/**
 * @api {get} /api/user Get all users
 * @apiName GetUser
 * @apiGroup User
 * @apiUse AuthHeader
 *
 * @apiSuccess {object[]} user  An array containing all registered users
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *
 *[
 *  {
 *       "name": "Foo Bar",
 *       "email": "test@example.com",
 *      "registrationDate": "2018-10-29T09:16:28.095Z",
 *      "id": "5bd6cfec05f26128d2edb264"
 *  }
 * ]
 *
 */
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
/**
 * @api {post} /api/user Create a user
 * @apiName CreateUser
 * @apiGroup User
 * @apiUse AuthHeader
 *
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
 *
 */
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
/**
 * @api {put} /api/user/:id Modify users
 * @apiName PutUser
 * @apiGroup User
 * @apiUse AuthHeader
 * @apiParam (Request body) {name {3-20}} name new Name of the user (needs to be sent even if not modified)
 * @apiParam (Request body) {email} email new Email of the user (needs to be sent even if not modified)
 * @apiParam (Request body) {string} password new Password of the user (needs to be sent even if not modified)
 * @apiSuccess {object[]} user  An array containing the modified user
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *
 *
 *  {
 *       "name": "Foo Bar",
 *       "email": "test@example.com",
 *      "registrationDate": "2018-10-29T09:16:28.095Z",
 *      "id": "5bd6cfec05f26128d2edb264"
 *  }
 *
 *
 */
router.put('/:id', findUserMiddleware, function (req, res, next) {

    if (req.params.id !== req.currentUserId) {
        const err = new Error("unauthorized")
        err.status = 403
        return next(err)
    }
// Update all properties (regardless of whether they are present in the request body or not)
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


})
;


/**
 * @api {delete} /api/user/:id delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiUse AuthHeader
 *
 * @apiSuccess {object[]} user  Confirmation of deletion
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *
 * {
    "message": "User with 5bc45fb518805a3b4711485f successfully deleted"
    }
 *
 *
 */
/* Delete user */
router.delete('/:id', findUserMiddleware, function (req, res, next) {

    if (req.params.id !== req.currentUserId) {
        const err = new Error("unauthorized")
        err.status = 403
        return next(err)
    }

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