const mongoose = require('mongoose')

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }
})


module.exports = mongoose.model('categories', categorySchema)