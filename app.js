const express = require('express')
const mongoose = require('mongoose')
const keys = require('./keys/keys.dev')
const path = require("path")

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, "./client/build")))

app.use('/api/form', require('./routes/form'))
app.use('/api/cards', require('./routes/cards'))
app.use('/api/card', require('./routes/basket'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/addons', require('./routes/addons'))
app.use('/api/users', require('./routes/user'))

const start = async () => {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`)
        })
    } catch(e) {
        console.log(e)
    }
}

start()

