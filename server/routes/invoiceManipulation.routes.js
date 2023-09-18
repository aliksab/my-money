const express = require('express')
const InvoiceManipulation = require('../models/InvoiceManipulation')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
    try {
        const list = await InvoiceManipulation.find()
        res.status(200).send(list)
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибкаю Попробуйте позже'
        })
    }
})

module.exports = router