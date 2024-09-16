const express = require('express')
const Book = require('../models/bookModel')
const router = express.Router()
const bookController = require('../controllers/bookController')

router.post('/book', bookController.createBook)
router.get('/books', bookController.getAllBooks)
router.get('/:bookId', bookController.getBookById)

module.exports = router