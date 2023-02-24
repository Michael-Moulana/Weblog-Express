const express = require('express')
const router = express.Router()

// routes
const dashboardRouter = require('./dashboard')
const postsRouter = require('./posts')
const commentsRouter = require('./comments')
const usersRouter = require('./users')
const settingsRouter = require('./settings')

// admin routes
router.use('/dashboard', dashboardRouter)
router.use('/posts', postsRouter)
router.use('/comments', commentsRouter)
router.use('/users', usersRouter)
router.use('/settings', settingsRouter)


module.exports = router