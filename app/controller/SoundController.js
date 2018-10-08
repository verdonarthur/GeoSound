const Sound = require('../models/Sound')

module.exports = class {
    /**
     * return all sound in database in JSON
     */
    static async getAllSound(){
        try{
            return Sound.find()
        } catch(err){
            console.log(err)
            return null
        }
        
    }

    static async getASound(id){
        
    }

    /**
     * save a sound in db a return it in json
     * @param {*} sound 
     */
    static async saveASound(sound){
        try{
            let aSound = new Sound(sound)
            return await aSound.save()            
        }catch(err){
            console.log(err)
            return null
        }
    }
}