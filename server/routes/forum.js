const express = require('express')
const forumController = require('../controllers/forumController')
const router = express.Router()

router.post('/threads', forumController.postThread)
router.get('/threads', forumController.getAllThreads)
router.post('/threads/:threadId/posts', forumController.addPostTothread)
router.get('/threads/:threadId/posts', forumController.getAllPostsFromAThread)

module.exports = router