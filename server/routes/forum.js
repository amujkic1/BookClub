const express = require('express')
const forumController = require('../controllers/forumController')
const router = express.Router()
const { requireAuth } = require('../middleware/requireAuth')

router.post('/threads', requireAuth, forumController.postThread)
router.get('/threads', forumController.getAllThreads)
router.post('/threads/:threadId/posts', requireAuth, forumController.addPostTothread)
router.get('/threads/:threadId/posts', forumController.getAllPostsFromAThread)
router.get('/threads/:threadId', forumController.getThreadById)

module.exports = router