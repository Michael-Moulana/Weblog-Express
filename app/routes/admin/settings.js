const express = require('express')
const router = express.Router()

// controller
const settingsController = require('@controllers/admin/settings')

// post routes
router.get('/', settingsController.index)
router.post('/', settingsController.store)


module.exports = router