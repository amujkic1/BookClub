const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')

router.post('/book', bookController.createBook)
router.get('/books', bookController.getAllBooks)
router.get('/books/:bookId', bookController.getBookById)
router.delete('/books/:bookId', bookController.deleteBook)
router.post('/add', bookController.addBookToList)
router.get('/list/:userId', bookController.getAllBookFromList)
router.patch('/:id/status', bookController.updateStatus)
router.delete('/list/:id', bookController.removeBookFromList)

module.exports = router