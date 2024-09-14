const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')

router.post('/review', reviewController.createReview)
router.get('/reviews/:bookId', reviewController.getReviewsForBook)

module.exports = router