const Review = require('../models/reviewsModel')
const Book = require('../models/bookModel')
const User = require('../models/userModel')

async function createReview(req, res) {
    const { userId, bookId, rating, review } = req.body; 

    try {
        const book = await Book.findById(bookId);
        const user = await User.findById(userId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const newReview = new Review({
            user: userId,
            book: bookId,
            rating,
            review: review || '' 
        });

        const savedReview = await newReview.save();

        return res.status(200).json(savedReview);

    } catch (err) {
        if (err.code === 11000) {  // Duplicate key error (user already reviewed this book)
            return res.status(400).json({ message: 'You have already reviewed this book' });
        }

        return res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
}

async function getReviewsForBook(req,res){
    const { bookId } = req.params;
    try{
        const book = await Book.findById(bookId)
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        const reviews = await Review.find({ book: bookId })
        .populate('user', 'username')  // Populate the username of the user who wrote the review
        .select('-__v')
        
        return res.status(200).json(reviews)

    }catch(err){
        return res.status(500).json({error: err})
    }
}

module.exports = {
    createReview,
    getReviewsForBook
}