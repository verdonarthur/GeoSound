const Sound = require('../models/Sound')

module.exports = class {
    /**
     * return all sound in database in JSON
     */
    static async getAllSound() {
        try {
            return Sound.find()
        } catch (err) {
            console.log(err)
            return null
        }

    }

    /**
     * Send a sound from db by the id in param
     * @param {*} id 
     */
    static async getASound(id) {
        try {
            let sound = Sound.findById(id)
            return sound
        } catch (err) {
            throw err
        }
    }

    /**
     * save a sound in db a return it in json
     * @param {*} sound 
     */
    static async saveASound(sound) {
        if (!sound.sound || !sound.coordinate || !sound.description
            || !sound.quality || !sound.user) {
            throw new Error("Missing fields in :" + sound)
        }

        try {
            let aSound = new Sound(sound)
            return await aSound.save()
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}