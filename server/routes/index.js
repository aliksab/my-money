const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/invoice', require('./invoice.routes'))
router.use('/invoiceManipulation', require('./invoiceManipulation.routes'))
router.use('/target', require('./target.routes'))
router.use('/user', require('./user.routes'))

module.exports = router