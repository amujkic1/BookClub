const express = require('express')
const Book = require('../models/bookModel')
const router = express.Router()

router.post('/book', async (req, res) => {
    const{title, author} = req.body
    
    try{
        const book = await Book.create({title,author})
        res.status(200).json(book)
    }catch(err){
        console.log(err)
        res.status(400).json({error: err.message})
    }
})

module.exports = router