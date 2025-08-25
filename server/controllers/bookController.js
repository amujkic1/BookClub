const Book = require("../models/bookModel")
const Tbr = require("../models/tbrListModel")

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

async function addBookToList(req,res){
    try{
        const {bookId, userId} = req.body
        const exists = await Tbr.findOne({userId, bookId})

        console.log(exists)
        if(exists) { 
            return res.status(500).json({error: "Book already in TBR list"})
        }

        const tbrEntry = new Tbr({userId, bookId})
        await tbrEntry.save()
        res.status(200).json(tbrEntry)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function getAllBookFromList(req,res){
    try{
        const userId = req.params.userId
        const tbrList = await Tbr.find({userId}).populate("bookId")
        return res.status(200).json(tbrList)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function updateStatus(req,res){
    try{
        const { status } = req.body
        const updated = await Tbr.findByIdAndUpdate(req.params.id, {status}, {new:true})
        res.json(updated)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function removeBookFromList(req,res) {
    try{
        await Tbr.findByIdAndDelete(req.params.id)
        res.json({message: "Book removed from TBR list"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    deleteBook,
    addBookToList,
    getAllBookFromList,
    updateStatus,
    removeBookFromList
}