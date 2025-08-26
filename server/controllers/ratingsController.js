const ratingModel = require('../models/ratingModel')

async function addRating(req,res) {
    try{
        const {bookId, value} = req.body
        const userId = req.user._id
        const rating = await Rating.findOneAndUpdate(
            { userId, bookId },
            { value },
            { new: true, upsert: true }
        );
        return res.status(200).json(rating)
    }catch(err){
        res.status(500).json({error: err.message})
    } 
}

async function getAverageRating(req,res) {
    try{
        const bookId = req.params.bookId
        const result = await Rating.aggregate([
            { $match: { bookId: new mongoose.Types.ObjectId(bookId) } },
            { $group: { _id: "$bookId", avg: { $avg: "$value" }, count: { $sum: 1 } } }
        ])
        res.json(result[0] || { avg: 0, count: 0 });
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    addRating,
    getAverageRating
}