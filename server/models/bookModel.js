const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
    },
    year: {
        type: Number,
    },
    isbn: {
        type: String,
        unique: true,
    },
    genre: {
        type: String,
    },
    summary: {
        type: String,
    },
    coverImageUrl: {
        type: String,
    },
    pages:
    {
        type: Number,
    }
})

module.exports = mongoose.model('Book', bookSchema);