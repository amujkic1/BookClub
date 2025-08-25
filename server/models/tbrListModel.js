const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tbrListSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    status: {
        type: String,
        enum: ["to_read", "reading", "finished"],
        default: "to_read"
    },
    added_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Tbr', tbrListSchema)