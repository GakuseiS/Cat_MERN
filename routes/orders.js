const Router = require('express')
const Basket = require('../models/Basket')
const Orders = require('../models/Orders')
const auth = require('../middlewares/auth')
const router = Router()

router.post('/', auth, async (req, res) => {
    try{
        const basket = await Basket.findOne({userId: req.user.id})
        const orders = await Orders.findOne({userId: req.user.id})
        const add = {...req.body}

        if(!orders) {
            const order = new Orders({order: [add], userId: req.user.id})
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

router.get('/', auth, async (req, res) => {
    try{
        let orders = await Orders.findOne({userId: req.user.id}) || {}
        res.json({orders})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
    
})

module.exports = router