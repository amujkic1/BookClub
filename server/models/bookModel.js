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
/*    publishDate: {
        type: Date,
        required: true
    },
    isbn: {
        type: String,
        unique: true,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    coverImageUrl: {
        type: String,
    }*/
})

module.exports = mongoose.model('Book', bookSchema);