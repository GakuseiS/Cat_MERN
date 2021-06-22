const {Router} = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const router = Router()

router.post('/register', async (req, res) => {
    const {name, login, password} = req.body
    const candidate = await User.findOne(login)
    if(candidate) {
        return res.json({message: 'Такой пользователь существует'})
    }
    const hashPassword = bcrypt.hash(password, 12)
    const user = new User({name, login, password: hashPassword})
    await user.save()
})

module.exports = router