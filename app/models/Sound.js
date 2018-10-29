const mongoose = require('mongoose')
const Category = require('./Category')
const User = require('./User')

let ObjectId = mongoose.Schema.Types.ObjectId

// Define the schema for the coordinate

/*
    example :
    db.zips2.insert( { _id: 1, city: "b", loc: { x: -73.974, y: 40.764 } } )
    db.zips2.insert( { _id: 2, city: "b", loc: { x: -73.981, y: 40.768 } } )
*/
let CoordinateSchema = new mongoose.Schema({
    city: String,
    loc: {
        type: Map,
        of: String
    }

})

// define the sound Schema
/*
    example :
    db.sounds.insert({
        "sound": "asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F\"*(FT(OVG&ç))",
        "coordinate": [
            { "city": "Lausanne", "loc": { "x": -73.974, "y": 40.764 } }
        ],
        "categories": ["5bd5ee1c4af7e818405792f5", "5bd5ee1c4af7e818405792f5"],
        "description": "a sound recorded in lausanne",
        "quality": "Bad",
        "user": "5bd5ee1c4af7e818405792f5"
    })
*/
let soundSchema = new mongoose.Schema({
    sound: {
        type: String,
        required: true
        //yourBufferData.toString('base64')
    },
    coordinate: {
        type: [CoordinateSchema],
        required: true
    },
    description: {
        type: String
    },
    categories: {
        type: [ObjectId],
        required: true
    },
    quality: {
        type: String,
        enum: ['Bad', 'Good'],
    },
    user: {
        type: ObjectId,
        required: true
    },
})

/**
 * Check if a sound can be save
 */
soundSchema.statics.validate = async (sound) => {
    if (sound.categories) {
        for (let categoryId of sound.categories) {
            if (!await Category.findById(categoryId)) {
                const err = new Error("Category - " + categoryId + " nonexistent")
                err.status = 404
                throw err
            }
        }
    }

    if (sound.user && !await User.findById(sound.user)) {
        const err = new Error("User - " + sound.user + " nonexistent")
        err.status = 404
        throw err
    }

}

soundSchema.methods.canUserUpdateorDelete = function (userid) {
    return this.user == userid
}

module.exports = mongoose.model('sounds', soundSchema)