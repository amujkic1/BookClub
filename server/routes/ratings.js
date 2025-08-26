const express = require('express')
const router = express.Router()
const ratingsController = require('../controllers/ratingsController')
const { requireAuth } = require('../middleware/requireAuth')

router.post('/rating', requireAuth, ratingsController.addRating)
router.get('/rating/:bookId', ratingsController.getAverageRating)

module.exports = router
