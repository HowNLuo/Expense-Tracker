const express = require('express')
const router = express.Router()
const home = require('./moduels/home')
const records = require('./moduels/records')

router.use('/', home)
router.use('/record', records)

module.exports = router