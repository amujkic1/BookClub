const Book = require("../models/bookModel")

async function createBook(req, res){
    const { title, author, publishDate, isbn, genre, summary, language, pages, coverImageUrl } = req.body;
    try{
        const book = await Book.create({title, author, publishDate, isbn, genre, summary, language, pages, coverImageUrl})
        res.status(200).json({message: "Book created successfully"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}



module.exports = {
    createBook
}

