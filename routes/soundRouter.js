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
 * [{"categories":["5bd6cf249903d62d18f7f03f"],"_id":"5bd6d3f6d806a2097ca18e4f","sound":"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)","coordinate":{"city":"Pully AB","loc":{"x":-74.974,"y":40.764}},"description":"a sound recorded in Pully AB","quality":"Bad","user":"5bd6cdce77705b055c73569c","__v":0}]
 */
router.get('/city/:name', async (req, res, next) => {
    try {
        res.send(await SoundController.getSoundByCity(req.params.name))
    } catch (err) {
        return next(err)
    }
})

/**
 * @api {get} /sound?page=X&pageSize=Y Request all Sounds
 * @apiName GET ALL SOUND
 * @apiGroup Sound
 * @apiUse AuthHeader
 * 
 * @apiParam {Number} page Num of requested page
 * @apiParam {Number} page-size Number of element requested per page
 * 
 * @apiSuccess {Object[]} sounds 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 * {"categories":["5bd6cf249903d62d18f7f03f"],"_id":"5bd6d3f6d806a2097ca18e4f","sound":"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)","coordinate":{"city":"Pully AB","loc":{"x":-74.974,"y":40.764}},"description":"a sound recorded in Pully AB","quality":"Bad","user":"5bd6cdce77705b055c73569c","__v":0},
 * {"categories":["5bd6cf249903d62d18f7f03f"],"_id":"5bd6d9908a4a2e3774a90fcf","sound":"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)","coordinate":{"city":"Pully A","loc":{"x":-74.974,"y":40.764}},"description":"a sound recorded in Lausanne A","quality":"Bad","user":"5bd7cdce77705b055c73569c","__v":0}
 * ]
 * 
 * @apiHeader {Number} Pagination-Page Num of the current page
 * @apiHeader {Number} Pagination-PageSize Number of element per page
 * @apiHeader {Number} Pagination-Total Total number of element in database
 * 
 * @apiHeaderExample {string} Pagination Header Example:
 * Pagination-Page → 1
 * Pagination-PageSize → 5
 * Pagination-Total → 10
 * 
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
 * @apiUse AuthHeader
 * 
 * @apiParam {ObjectId} id ObjectId of sound in API
 * 
 * @apiSuccess {Object} sound a Sound object in API
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {"categories":["5bd6cf249903d62d18f7f03f"],"_id":"5bd6d3f6d806a2097ca18e4f","sound":"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)","coordinate":{"city":"Pully AB","loc":{"x":-74.974,"y":40.764}},"description":"a sound recorded in Pully AB","quality":"Bad","user":"5bd6cdce77705b055c73569c","__v":0}
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
 * @apiParam (Request body) {String} sound Sound file exported in base64
 * @apiParam (Request body) {ObjectId[]} categories list of category Id of releated to the sound
 * @apiParam (Request body) {CoordinateSchema} coordinate a coordinate wich must have this format {"city":"Name of the city","loc":{"x":LatitudeDegree,"y":LongitudeDegree}}
 * @apiParam (Request body) {string} description description of a sound
 * @apiParam (Request body) {string} quality A string wich can be "Bad" or "Good"
 * 
 * @apiSuccess {Object} sound
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {"categories":["5bd6cf249903d62d18f7f03f"],"_id":"5bd6d3f6d806a2097ca18e4f","sound":"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)","coordinate":{"city":"Pully AB","loc":{"x":-74.974,"y":40.764}},"description":"a sound recorded in Pully AB","quality":"Bad","user":"5bd6cdce77705b055c73569c","__v":0}
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
 * @apiParam (Request body) {String} sound Sound file exported in base64
 * @apiParam (Request body) {ObjectId[]} categories list of category Id of releated to the sound
 * @apiParam (Request body) {CoordinateSchema} coordinate a coordinate wich must have this format {"city":"Name of the city","loc":{"x":LatitudeDegree,"y":LongitudeDegree}}
 * @apiParam (Request body) {string} description description of a sound
 * @apiParam (Request body) {string} quality A string wich can be "Bad" or "Good"
 * 
 * @apiSuccess {Object} sound return the modified sound 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {"categories":["5bd6cf249903d62d18f7f03f"],"_id":"5bd6d3f6d806a2097ca18e4f","sound":"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)","coordinate":{"city":"Pully AB","loc":{x":-74.974,"y":40.764}},"description":"a sound recorded in Pully AB","quality":"Bad","user":"5bd6cdce77705b055c73569c","__v":0}
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
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * Success
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