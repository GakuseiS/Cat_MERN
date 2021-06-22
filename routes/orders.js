const Router = require('express')
const Basket = require('../models/Basket')
const Orders = require('../models/Orders')
const router = Router()

router.post('/', async (req, res) => {
    try{
        const basket = await Basket.findOne()
        const orders = await Orders.findOne()
        const add = {...req.body}

        if(!orders) {
            const order = new Orders({order: [add]})
            await order.save()
            
        } else {
            orders.order.push(add)
            await orders.save()
        }
        await basket.remove()
        res.json({message: 'Ok'})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get('/', async (req, res) => {
    try{
        let orders = await Orders.findOne() || {}
        res.json({orders})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
    
})

module.exports = router