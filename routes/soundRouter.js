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
 * 
 * @apiSuccess {Object[]} sounds 
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
 * 
 * @apiSuccess {Object[]} sounds 
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
 * 
 * @apiParam {name} name of the city
 * 
 * @apiSuccess {Object[]} sounds 
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
 *
 * @apiSuccess {Object[]} sounds 
 */
router.get('/', async (req, res, next) => {
    try {
        res.send(await SoundController.getAllSound())
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
        res.send(await SoundController.deleteASound(res.sound))
    } catch (err) {
        next(err)
    }
})

module.exports = router