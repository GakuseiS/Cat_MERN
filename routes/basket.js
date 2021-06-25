const {Router} = require('express')
const Addons = require('../models/Addons')
const Basket = require('../models/Basket')
const Card = require('../models/Card')
const auth = require('../middlewares/auth')
const router = Router()

router.get('/', auth, async (req, res) => {
    let basket = await Basket.findOne({userId: req.user.id})
    if(!basket) {
        return res.json({basket: {allPrice: 0}})
    }

    res.json({basket})
})

router.post('/', auth, async (req, res) => {
    try{
        let add = await Card.findById(req.body.id) //Нужно добавить
        if(!add) {
            add = await Addons.findById(req.body.id)
        }
        let basket = await Basket.findOne({userId: req.user.id})

        if(!basket) {
            const plus = new Basket({
                items: [{title: add.title, size: add.size, taste: add.taste, price: add.price, _id: add._id}],
                allPrice: add.price,
                userId: req.user.id
            })
            await plus.save()
            return res.status(200).json({message: 'Товар добавлен в корзину'})
        }
        
        await basket.addToBasket(add)
        res.status(200).json({message: 'Товар добавлен в корзину'})
    } catch(e) {
        res.status(500).json({message: 'Error'})
    }
    
})

router.delete('/', auth, async(req, res) => {
    try {
        const basket = await Basket.findOne({userId: req.user.id}) 
        await basket.remove()
        res.status(200).json({message: 'Ok'})
    } catch (e) {
        res.status(500).json({message: 'Error'})
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        let basket = await Basket.findOne({userId: req.user.id})

        await basket.deleteFromBasket(req.params.id)
       
        res.status(200).json({message: 'Ok'})
    } catch (e) {
        res.status(500).json({message: 'Error'})
    }
})

module.exports = router