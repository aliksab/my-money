const express = require('express')
const InvoiceManipulation = require('../models/InvoiceManipulation')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middlaware')


router
    .route('/')
    .get(auth, async (req, res) => {
        const userId = req.user._id
        try {
            const list = await InvoiceManipulation.find()
            res.status(200).send(list.filter(manipulation => manipulation.userId == userId))
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибкаю Попробуйте позже'
            })
        }
    })
    .post(auth, async (req, res) => {
        const userId = req.user
        try {
            const newManipulation = await InvoiceManipulation.create({...req.body, userId: userId })
            res.status(201).send(newManipulation)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибкаю Попробуйте позже'
            })
        }
    })

router
    .route('/:manipulationId')
    .delete(auth, async (req, res) => {
        try {
            const { manipulationId } = req.params
            const removedManipulation = await InvoiceManipulation.findByIdAndDelete(manipulationId)
            res.send(removedManipulation)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибкаю Попробуйте позже'
            })
        }
    })
    .patch(auth, async (req, res) => {
        try {
            const { manipulationId } = req.params
    
            if (manipulationId) {
                const updatedInvoiceManipulation = await InvoiceManipulation.findByIdAndUpdate(manipulationId, req.body, {new: true})
                res.send(updatedInvoiceManipulation)
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