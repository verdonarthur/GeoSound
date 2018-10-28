const Sound = require('../models/Sound')

module.exports = class {
    /**
     * return all sound in database in JSON
     */
    static async getAllSound() {
        return Sound.find()
    }

    /**
     * Return all city recorded in the db
     */
    static async getAllCities() {
        let tmpCities = await Sound.aggregate([{
            // used to destructurate the city from the array of coordinate
            $unwind: "$coordinate"
        },
        {
            // group all city together
            $group: {
                _id: '$coordinate.city',
            }
        }
        ])

        return tmpCities.map((value) => {
            return value._id
        })
    }

    /**
     * Get some number about the cities
     */
    static async getCitiesStat() {
        let tmpCities = await Sound.aggregate([{
            // used to destructurate the city from the array of coordinate
            $unwind: "$coordinate"
        },
        {
            $sort: {
                "coordinate.city": 1
            }
        },
        {
            // group all city together
            $group: {
                _id: '$coordinate.city',
                nbrSound: { "$sum": 1 },
                sounds: { "$push": "$$CURRENT" }
            }
        }
        ])

        return tmpCities
    }

    /**
     * return all sounds with the name of the city in param
     * @param {String} name 
     */
    static async getSoundByCity(name) {
        return Sound.find({ "coordinate.city": name })
    }

    /**
     * Send a sound from db by the id in param
     * @param {Number} id 
     */
    static async getASound(id) {
        return Sound.findById(id)
    }

    /**
     * save a new sound in db a return it in json
     * @param {Object} sound 
     */
    static async postASound(sound) {
        if (!sound.sound || !sound.coordinate || !sound.description
            || !sound.quality || !sound.user) {
            throw new Error("Missing fields in :" + sound)
        }

        let aSound = new Sound(sound)
        return aSound.save()

    }

    /**
     * Update a sound in the db
     * @param {Number} id 
     * @param {Object} sound 
     */
    static async putASound(id, sound) {
        return Sound.findOneAndUpdate({ _id: id }, sound, { new: true });
    }

    /**
     * Delete the sound by the id in param
     * @param {Number} id 
     */
    static async deleteASound(id) {
        return Sound.findByIdAndDelete(id)
    }
}