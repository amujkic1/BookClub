const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const { requireAuth } = require('../middleware/requireAuth')

router.post('/book', bookController.createBook)
router.get('/books', bookController.getAllBooks)
router.get('/books/:bookId', bookController.getBookById)
router.delete('/books/:bookId', bookController.deleteBook)
router.post('/add', requireAuth, bookController.addBookToList)
router.get('/list', requireAuth, bookController.getAllBookFromList)
router.patch('/:id/status', bookController.updateStatus)
router.delete('/list/:id', bookController.removeBookFromList)

module.exports = router