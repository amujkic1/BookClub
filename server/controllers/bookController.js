const Book = require("../models/bookModel")

async function createBook(req, res){
    const { title, author, publisher, year, genre, summary, coverImageUrl, pages } = req.body;
    try{
        const book = await Book.create({title, author, publisher, year, genre, summary, coverImageUrl, pages })
        res.status(200).json({message: "Book created successfully"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function getAllBooks(req, res){
    try{
        const books = await Book.find({})
        res.status(200).json(books)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function getBookById(req, res){
    const {bookId} = req.params
    try{
        const book = await Book.findById(bookId)
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json(book)        
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function deleteBook(req, res) {
    const {bookId} = req.params
    try{
        await Book.findByIdAndDelete(bookId)
        return res.status(200).json({message: 'Book deleted successfully'})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    deleteBook
}