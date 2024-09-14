const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    rating: {
        type: NumberInt,
        required: true
    },
    review: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Review', reviewSchema);