const Book = require("../models/bookModel")
const User = require("../models/userModel")

async function addFavorite(req, res) {
    const {email, bookId} = req.body
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    try{
        const user = await User.findOne({email})
        const book = await Book.findById(bookId)
        console.log(bookId)
        console.log(book)
        console.log(user)
        await User.updateOne(
            { _id: user._id },
            { $addToSet: { favoriteBooks: book } } 
          );
          res.status(200).json({message: "Added to favorites"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    addFavorite
}