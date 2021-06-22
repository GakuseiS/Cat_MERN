const jwt = require('jsonwebtoken')
const key = require('../keys/keys.dev')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1]

        if(!token) {
            return res.status(401).json({message: 'Вы не авторизированы'})
        }
        req.user = jwt.verify(token, key.secretKey)
        next()
    } catch(e) {
        res.status(401).json({message: 'Вы не авторизированы'})
    }
}