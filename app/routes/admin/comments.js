const express = require('express')
const router = express.Router()

// controller
const commentsController = require('@controllers/admin/comments')

// post routes
router.get('/', commentsController.index)
router.get('/approve/:commentID', commentsController.approve)
router.get('/reject/:commentID', commentsController.reject)
router.get('/delete/:commentID', commentsController.delete)

module.exports = router