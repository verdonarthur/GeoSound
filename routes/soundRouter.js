const express = require('express')
const router = express.Router()
const SoundController = require('../app/controller/SoundController')
const LogUtils = require('../utls/LogUtils')

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
        console.log(err)
        return res.status(400).send('Sound not found')
    }
}

/**
 * Get all sounds from the db
 */
router.get('/', async (req, res) => {
    res.send(await SoundController.getAllSound())
})

router.get('/:id', loadSoundFromParam, async (req, res) => {
    return res.sound
})

/**
 * Post a sound in the db
 */
router.post('/', async (req, res) => {
    // TODO implement real function
    try {
        let sound = await SoundController.saveASound(req.body)
        res.send(sound)
    } catch (err) {
        LogUtils.logAndSendError500(res,err)
    }
    /*let sound = await SoundController.saveASound({
        sound: "asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)",
        coordinate: [
            { city: "Lausanne", loc: { x: -73.974, y: 40.764 } }
        ],
        description: "a sound recorded in lausanne",
        quality: "Bad",
        user: "1"
    })*/
})

/**
 * Update a sound in db
 */
router.put('/:id', loadSoundFromParam, async (req, res) => {
    try {
        let sound = await SoundController.saveASound(res.sound)
        res.send(sound)
    } catch (err) {
        LogUtils.logAndSendError500(res,err)
    }
})

/**
 * Remove a sound in db
 */
router.delete('/:id', loadSoundFromParam, async(req,res)=>{
    try{
        await SoundController.deleteASound(res.sound)
        res.send("Success")
    } catch(err){
        LogUtils.logAndSendError500(res,err)
    }
})

module.exports = router