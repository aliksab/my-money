const express = require('express')
const auth = require('../middleware/auth.middlaware')
const Invoice = require('../models/Invoice')
const router = express.Router({ mergeParams: true })

router
    .route('/')
    .get(auth, async (req, res) => {
        try {
            const {orderBy, equalTo} = req.query
            const list = Comment.find({[orderBy]: equalTo})
            res.send(list)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибкаю Попробуйте позже'
            })
        }
    })
    .post(auth, async (req, res) => {
        try {
           const newInvoice = await Invoice.create({
            ...req.body,
            userId: req.user._id
           })
           res.status(201).send(newInvoice)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибкаю Попробуйте позже'
            })
        }
    })


router.delete('/invoiceId', auth, async (req, res) => {
    try {
        const { invoiceId } = req.params
        const removedInvoice = await Invoice.findById(invoiceId)

        if (removedInvoice.userId.toHexString() === req.user._id) {
            await removedInvoice.remove()
        } else {
            res.status(401).json({message: 'Unauthorized'})
        }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибкаю Попробуйте позже'
        })
    }
})

module.exports = router