const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: String,
    size: String,
    price: Number
})

module.exports = model('Addons', schema)