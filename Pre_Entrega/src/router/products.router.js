const { Router } = require('express')
const { getProductsFromServer, getProductFromServer, addProductOnServer, updProductOnServer, delProductOnServer } = require('./../controllers/ProductController')

const router = Router()

// GET  /api/products[?:limit=N] 
router.get('/', getProductsFromServer )

// GET 	/api/products/:pid  
router.get('/:pid', getProductFromServer )

// POST /api/products
router.post('/', addProductOnServer )

// PUT /api/products/:pid 
router.put('/:pid', updProductOnServer ) 

// DELETE /api/products/:pid
router.delete('/:pid', delProductOnServer)

module.exports = router