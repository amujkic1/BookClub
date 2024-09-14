const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User',  // Reference to the User model
        required: true,
    },
    book: {
        type: Schema.Types.ObjectId, 
        ref: 'Book',  // Reference to the Book model
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: false
    }
}, { timestamps: true })

reviewSchema.index({ user: 1, book: 1 }, { unique: true });  // Ensure one review per user per book

module.exports = mongoose.model('Review', reviewSchema);