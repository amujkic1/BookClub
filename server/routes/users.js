const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const favoritesController = require('../controllers/favoritesController')

router.post("/login", userController.login)
router.post("/signup", userController.signup)
router.post("/user", userController.createUser)
router.get("/user", userController.findUserByEmail)
router.delete("/user", userController.deleteUser)
router.put("/user", userController.updateUser)
router.get("/users", userController.getAllUsers)
router.post("/addfavorite", favoritesController.addFavorite)

module.exports = router