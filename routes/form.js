const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Programm = require('../models/Programm')
const router = Router()

router.post('/', [check('name').exists(), check('weight').exists(), check('email').exists(), check('tel').exists()], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({message: 'Ошибка в заполнении формы'})
    }
    try {
        const form = new Programm({
            name: req.body.name, weight: req.body.weight, age: req.body.age, type: req.body.type, email: req.body.email, tel: req.body.tel, comment: req.body.comment, addon: 
            {sugar: req.body.sugar, water: req.body.water, milk: req.body.milk, vitamin: req.body.vitamin}
        })
        await form.save()
        res.json({message: 'Данные успешно отправлены на сервер'})
    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так'})
    }
    
})

module.exports = router