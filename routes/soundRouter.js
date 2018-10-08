const express = require('express')
const router = express.Router()
const SoundController = require('../app/controller/SoundController')

function loadSoundFromParam(req, res, next) {
    // TODO 
    /*
    example :
    Person.findById(req.params.id).exec(function(err, person) {
      if (err) {
        return next(err);
      } else if (!person) {
        return res.status(404).send('No person found with ID ' + req.params.id);
      }
      req.person = person;
      next();
    });*/
}

/**
 * Get all sounds from the db
 */
router.get('/', async (req, res) => {
    res.send(await SoundController.getAllSound())
})

/**
 * Post a sound in the db
 */
router.post('/', async (req, res) => {
    // TODO implement real function
    let sound = await SoundController.saveASound({
        sound: "asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F)",
        coordinate: [
            { city: "Lausanne", loc: { x: -73.974, y: 40.764 } }
        ],
        description: "a sound recorded in lausanne",
        quality: "Bad",
        user: "1"
    })
    res.send(sound)
})

module.exports = router