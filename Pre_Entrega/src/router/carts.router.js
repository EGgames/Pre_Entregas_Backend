const { Router } = require('express')
const {getProductsCartFromServer, addCartOnServer, addProductCartOnServer} = require('./../controllers/CartController')

const router = Router()

// GET /api/carts/:cid 
router.get('/:cid', getProductsCartFromServer)

//POST /api/carts/ 
router.post('/', addCartOnServer)

//POST /api/carts/:cid/product/:pid  
router.post('/:cid/product/:pid', addProductCartOnServer)

module.exports = router