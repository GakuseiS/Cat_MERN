const {Router} = require('express')
const Addons = require('../models/Addons')
const router = Router()

router.get('/', async (req, res) => {
    const addons = await Addons.find()
    res.json({addons})
})

module.exports = router