const express = require('express')
const Book = require('../models/bookModel')
const router = express.Router()
const bookController = require('../controllers/bookController')

router.post('/book', bookController.createBook)
router.get('/books', bookController.getAllBooks)
router.get('/books/:bookId', bookController.getBookById)
router.delete('/books/:bookId', bookController.deleteBook)

module.exports = router