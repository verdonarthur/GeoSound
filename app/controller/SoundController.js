const Sound = require('../models/Sound')

module.exports = class {
    /**
     * return all sound in database in JSON
     */
    static async getAllSound() {
        return Sound.find()
    }

    /**
     * Send a sound from db by the id in param
     * @param {*} id 
     */
    static async getASound(id) {
        return Sound.findById(id)
    }

    /**
     * save a new sound in db a return it in json
     * @param {*} sound 
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
     * @param {*} id 
     * @param {*} sound 
     */
    static async putASound(id, sound) {
        return Sound.findOneAndUpdate(id, sound,{new:true});
    }

    /**
     * Delete the sound by the id in param
     * @param {*} id 
     */
    static async deleteASound(id) {
        return Sound.findByIdAndDelete(id)
    }
}