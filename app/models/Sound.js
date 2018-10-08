const mongoose = require('mongoose')
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
        sound:"asklfjdslnvdfl4i30tggwvj4957h479wpvh574wv4gG(G&F"*(FT(OVG&ç)),
        coordinate:[
            {city:"Lausanne",loc:{x: -73.974, y: 40.764}}
        ],
        description:"a sound recorded in lausanne",
        quality:"Bad",
        user:"_1"
    })
*/
let soundSchema = new mongoose.Schema({
    sound: {
        type: String,
        required: true
        //yourBufferData.toString('base64')
    },
    coordinate: [CoordinateSchema],
    description: {
        type: String
    },
    /*categories: {
        type: String // TODO
    },*/
    quality: {
        type: String,
        enum: ['Bad', 'Good'],
    },
    user: {
        type: Number, // TODO a change
        required: true
    },
});

module.exports = mongoose.model('sounds', soundSchema);