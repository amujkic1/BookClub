const express = require('express')
const eventController = require('../controllers/eventController')
const router = express.Router()

router.post('/event', eventController.createEvent)

module.exports = router