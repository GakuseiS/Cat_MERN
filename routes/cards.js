const {Router} = require('express')
const Card = require('../models/Card')
const router = Router()


router.get('/', async (req, res) => {
    try{
        
        const cards = await Card.find()
        res.json(cards)
    } catch(e) {
        res.status(400).json({message: `Что-то пошло не так`})
    }
})

module.exports = router

