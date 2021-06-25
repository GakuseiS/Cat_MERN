const {Schema, model} = require('mongoose')

const schema = new Schema({
    order: [
        {
            allPrice: Number,
            items: [
                { 
                    count: Number,
                    title: String,
                    size: String,
                    taste: String,
                    price: Number
                }

            ],
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

schema.addOrder = (order) => {
    if(order) {
        this.order.push(order.order)
    } 
    return this.save()
}

module.exports = model('Orders', schema)