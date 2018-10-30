const express = require('express')
const router = express.Router()
const SoundController = require('../app/controller/SoundController')

/**
 * Middleware function, used to prevent too much code duplication
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function loadSoundFromParam(req, res, next) {
    try {

        res.sound = await SoundController.getASound(req.params.id)

        if (!res.sound) {
            const err = new Error("Sounds not found")
            err.status = 404;

            return next(err)
        }

        return next()
    } catch (err) {
        err.status = 400
        return next(err)
    }
}

/**
 * @api {get} /sound/city/ Get all sound grouped by city
 * @apiName GET SOUNDS GROUPED BY CITY
 * @apiGroup Sound
 * @apiUse AuthHeader
 * 
 * @apiSuccess {Object[]} cities An array containing all cities registered in the API
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *
 * ["Lausanne","Vevey","Sion"]
 */
router.get('/city', async (req, res, next) => {
    try {
        res.send(await SoundController.getAllCities())
    } catch (err) {
        return next(err)
    }
})

/**
 * @api {get} /city/stats/ Get the number of sounds recorded by city
 * @apiName GET NUMBER SOUNDS BY CITY
 * @apiGroup Sound
 * @apiUse AuthHeader
 * 
 * @apiSuccess {Object[]} cities An array containing all cities registered in the API
 *                        with the numbe of sounds recorded in it
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *
 * [{"_id":"Vevey","nbrSound":4},{"_id":"Lausanne","nbrSound":1},{"_id":"Sion","nbrSound":5}]
 */
router.get('/city/stats', async (req, res, next) => {
    try {
        res.send(await SoundController.getCitiesStat())
    } catch (err) {
        return next(err)
    }
})

/**
 * @api {get} /sound/city/:name Get all sound in a city
 * @apiName GET SOUNDS BY CITY
 * @apiGroup Sound
 * @apiUse AuthHeader
 * 
 * @apiParam {name} name of the city
 * 
 * @apiSuccess {Object[]} sounds An array containing all the sounds of a city
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *
 * [{"categories":["5bd6cf249903d62d18f7f03f"],"_id":"5bd6d3f6d806a2097ca18e4f","sound":"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)","coordinate":[{"_id":"5bd6ddd24c970134b02cf2de","city":"Pully AB","loc":{"_id":"5bd8ac2cc2492d40accf0f11","x":-74.974,"y":40.764}}],"description":"a sound recorded in Pully AB","quality":"Bad","user":"5bd6cdce77705b055c73569c","__v":0}]
 */
router.get('/city/:name', async (req, res, next) => {
    try {
        res.send(await SoundController.getSoundByCity(req.params.name))
    } catch (err) {
        return next(err)
    }
})

/**
 * @api {get} /sound/ Request all Sounds
 * @apiName GET ALL SOUND
 * @apiGroup Sound
 * @apiUse AuthHeader
 * 
 * @apiSuccess {Object[]} sounds 
 */
router.get('/', async (req, res, next) => {
    try {
        // Parse the "page" param (default to 1 if invalid)
        let page = parseInt(req.query.page, 10);
        if (isNaN(page) || page < 1) {
            page = 1;
        }
        // Parse the "pageSize" param (default to 10 if invalid)
        let pageSize = parseInt(req.query.pageSize, 10);
        if (isNaN(pageSize) || pageSize < 0 || pageSize > 10) {
            pageSize = 10;
        }

        let sounds = await SoundController.getAllSoundWithPagination(page,pageSize)

        res.set('Pagination-Page', page);
        res.set('Pagination-PageSize', pageSize);
        res.set('Pagination-Total', await SoundController.getNumberOfSoundInDB());

        res.send(sounds)
    } catch (err) {
        return next(err)
    }
})

/**
 * @api {get} /sound/:id Retrieve a sound by his id
 * @apiName GET A SOUND
 * @apiGroup Sound
 * 
 * @apiParam {Number} id Sound unique ID.
 * 
 * @apiSuccess {Object} sounds 
 */
router.get('/:id', loadSoundFromParam, async (req, res, next) => {
    try {
        res.send(res.sound)
    } catch (err) {
        return next(err)
    }

})

/**
 * @api {post} /sound/ Save a new sound
 * @apiName POST SOUND
 * @apiGroup Sound
 * 
 * 
 * @apiSuccess {Object} sounds 
 */
router.post('/', async (req, res, next) => {
    try {
        req.body.user = req.currentUserId

        res.send(await SoundController.postASound(req.body))
    } catch (err) {
        return next(err)
    }
})

/**
 * @api {put} /sound/:id Update a sound
 * @apiName PUT SOUND
 * @apiGroup Sound
 * 
 * @apiParam {Number} id Sound unique ID.
 * 
 * @apiSuccess {Object} sounds 
 */
router.put('/:id', loadSoundFromParam, async (req, res, next) => {
    try {
        if (!res.sound.canUserUpdateorDelete(req.currentUserId)) {
            const err = new Error("unauthorised")
            err.status = 403
            throw err
        }

        req.body.user = req.currentUserId

        res.send(await SoundController.putASound(req.params.id, req.body))
    } catch (err) {
        return next(err)
    }
})

/**
 * @api {delete} /sound/:id remove a sound
 * @apiName DELETE SOUND
 * @apiGroup Sound
 * 
 * @apiParam {Number} id Sound unique ID.
 * 
 * @apiSuccess {String} Success 
 */
router.delete('/:id', loadSoundFromParam, async (req, res, next) => {
    try {

        if (!res.sound.canUserUpdateorDelete(req.currentUserId)) {
            const err = new Error("unauthorised")
            err.status = 403
            throw err
        }


        res.send(await SoundController.deleteASound(res.sound))
    } catch (err) {
        next(err)
    }
})

module.exports = router