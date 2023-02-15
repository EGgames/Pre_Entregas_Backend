const express = require('express')
const productRouter = require('./router/products.router')
const cartRouter = require('./router/carts.router')

const server = express()

server.listen(8080, () => console.log('Servidor conectado exitosamente'))

server.use(express.json())
server.use(express.urlencoded({extends: true}))

server.use('/api/products', productRouter)
server.use('/api/carts', cartRouter)