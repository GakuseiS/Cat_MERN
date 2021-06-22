const express = require('express')
const mongoose = require('mongoose')
const keys = require('./keys/keys.dev')

const PORT = 5000
const app = express()

app.use(express.json())

app.use('/api/form', require('./routes/form'))
app.use('/api/cards', require('./routes/cards'))
app.use('/api/card', require('./routes/basket'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/addons', require('./routes/addons'))

const start = async () => {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(keys.PORT, () => {
            console.log(`Server has been started on port ${PORT}`)
        })
    } catch(e) {
        console.log(e)
    }
}

start()

