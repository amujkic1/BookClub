const express = require('express')
const User = require('../models/userModel')
const router = express.Router()
const userController = require('../controllers/userController')

router.post("/login", userController.login)
router.post("/signup", userController.signup)

module.exports = router