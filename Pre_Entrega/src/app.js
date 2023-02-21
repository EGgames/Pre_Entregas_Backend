const express = require('express')
const productRouter = require('./router/products.router')
const cartRouter = require('./router/carts.router')

const server = express()

const port = 8080

server.listen(port, () => console.log('Servidor conectado exitosamente en puerto ' + port))

server.use(express.json())
server.use(express.urlencoded({extends: true}))

server.use('/api/products', productRouter)
server.use('/api/carts', cartRouter)