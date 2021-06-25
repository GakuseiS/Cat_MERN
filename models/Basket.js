const {Schema, model} = require('mongoose')

const schema = new Schema({
    items: [
        {
            title: String,
            size: String,
            taste: String,
            price: Number,
            count: {
                type: Number,
                default: 1
            }
        }
    ],
    allPrice: {
        type: Number,
        default: 0
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

schema.methods.addToBasket = function (card) {
    const idx = this.items.findIndex(item => item._id.toString() === card._id.toString())
    if (idx > -1) {
        this.items[idx].count++
    } else {
        this.items.push({title: card.title, size: card.size, taste: card.taste, price: card.price, _id: card._id})
    }
    this.allPrice += card.price

    return this.save()
}

schema.methods.deleteFromBasket = function (id) {
    const idx = this.items.findIndex(item => item._id.toString() === id.toString())

    this.allPrice -= this.items[idx].price
    
    if (this.items[idx].count > 1) {
        this.items[idx].count--

    } else {
        this.items = [...this.items.slice(0, idx), ...this.items.slice(idx + 1)]
    }

    if(this.allPrice === 0) {
        return this.remove()
    }

    return this.save()
}

module.exports = model('Basket', schema)