const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')

router.post('/review', reviewController.createReview)

module.exports = router