const express = require('express')
const router = express.Router()
const SoundController = require('../app/controller/SoundController')
const LogUtils = require('../app/utils/LogUtils')

/**
 * Middleware function, used to prevent too much code duplication
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function loadSoundFromParam(req, res, next) {
    try {
        res.sound = await SoundController.getASound(req.params.id)        
        next()
    } catch (err) {
        return next(err)
    }
}

/**
 * Get all sounds from the db
 */
router.get('/', async (req, res, next) => {
    try {
        res.send(await SoundController.getAllSound())
    } catch (err) {
        return next(err)
    }
})

/**
 * Retrieve a sound by his id
 */
router.get('/:id', loadSoundFromParam, async (req, res, next) => {
    try {
        res.send(res.sound)
    } catch (err) {
        return next(err)
    }

})

/**
 * Post a sound in the db
 */
router.post('/', async (req, res, next) => {
    try {
        res.send(await SoundController.postASound(req.body))
    } catch (err) {
        return next(err)
    }
})

/**
 * Update a sound in db
 */
router.put('/:id', loadSoundFromParam, async (req, res, next) => {
    try {
        res.send(await SoundController.putASound(req.params.id, req.body))
    } catch (err) {
        return next(err)
    }
})

/**
 * Remove a sound in db
 */
router.delete('/:id', loadSoundFromParam, async (req, res, next) => {
    try {
        res.send(await SoundController.deleteASound(res.sound))
    } catch (err) {
        next(err)
    }
})

module.exports = router