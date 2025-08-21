const mongoose = require('mongoose')
const Schema = mongoose.Schema

const threadSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    posts: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Post" 
    }]
})

module.exports = mongoose.model('Thread', threadSchema)