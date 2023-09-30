const express = require('express')
const auth = require('../middleware/auth.middlaware')
const Invoice = require('../models/Invoice')
const router = express.Router({ mergeParams: true })

router
    .route('/')
    .get(auth, async (req, res) => {
        try {
            const list = await Invoice.find()
            res.status(200).send(list)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибкаю Попробуйте позже'
            })
        }
    })
    .post(auth, async (req, res) => {
        const userId = req.user
        try {
           const newInvoice = await Invoice.create({
            ...req.body,
            defaultAmount: req.body.amount,
            userId: userId          
           })
           res.status(201).send(newInvoice)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибкаю Попробуйте позже'
            })
        }
    })


router
    .route('/:invoiceId')
    .delete(auth, async (req, res) => {
        try {
            const { invoiceId } = req.params
            const removedInvoice = await Invoice.findByIdAndDelete(invoiceId)
            res.send(removedInvoice)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибкаю Попробуйте позже'
            })
        }
    })
    .patch(auth, async (req, res) => {
        try {
            const { invoiceId } = req.params
            
            if (invoiceId) {
                const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, req.body, {new: true})
                res.send(updatedInvoice)
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