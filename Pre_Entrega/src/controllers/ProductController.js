const ProductManager = require('./../helpers/ProductManager')
const path = './Pre_Entrega/src/datastorage/products.json'
let info = {}

//función de ayuda para obtener todos los productos
const getAllProductsFromServer = async () => {
    const products = new ProductManager(path)
    const listProducts = await products.getAllProducts()
    let info = {}

    if(listProducts === false || (Array.isArray(listProducts) && listProducts.length === 0)){
        info = {
            status: "error",
            length: 0,
            message: "could not get the products, empty or non-existent file.",
            data: []
        }
        return info
    }

    const length = listProducts.length

    info = {
        status: "success",
        length: length,
        message: "products returned successfully",
        data: listProducts
    }

    return info
}

//función de ayuda para obtener una serie de productos
const getNProductsFromServer = async (limit) => {
    const products = new ProductManager(path)
    const listProducts = await products.getProducts(limit)
    let info = {}

    if(listProducts === false || (Array.isArray(listProducts) && listProducts.length === 0)){
        info = {
            status: "error",
            length: 0,
            message: "could not get the products, empty or non-existent file.",
            data: []
        }
        return info
    }

    const length = listProducts.length

    info = {
        status: length === limit ? "success" : "partial",
        length: length,
        message: length === limit ? "products returned successfully" : "Not all the requested products were available.",
        data: listProducts
    }
    return info
}

// Obtiene todos o N productos desde el servidor /api/products[?:limit=N]
const getProductsFromServer = async (req, res) => {
    let arrayQuery = Object.keys(req.query)

    if (!(arrayQuery.length > 0)) {
        let info = await getAllProductsFromServer()
        return res.status(200).json(info)
    }

    if (!arrayQuery.includes('limit') || arrayQuery.length > 1) {
        info = {
            status: "error",
            length: 0,
            message: "query with syntax error",
            data: []
        }
        return res.status(400).json(info)
    }

    let { limit } = req.query
    limit = parseInt(limit)

    if (!isNaN(limit) && limit > 0) {
        let info = await getNProductsFromServer(limit)
        return res.status(200).json(info)       
    }

    info = {
        status: "error",
        length: 0,
        message: "limit value is not a positive integer",
        data: []
    }
    return res.status(400).json(info)
}

// Obtiene un producto desde el servidor /api/products/:pid 
const getProductFromServer = async (req, res) => {
    let { pid } = req.params
    pid = parseInt(pid)
    let info = {}
    
    pid = isNaN(pid) ? undefined : pid

    if(pid === undefined){
        info = {
            status: "error",
            message: "the product id is not a correct number",
            data: {}
        }
        return res.status(400).json(info)
    }

    const products = new ProductManager(path)
    const product = await products.getProductById(pid)

    if(product === undefined || product === false){
        info = {
            status: "error",
            message: "a product with that id does not exist or the file could not be read",
            data: {}
        }
        return res.status(400).json(info)
    }

    info = {
        status: "success",
        message: "product found successfully",
        data: product
    }
    return res.status(200).json(info)
}

// Agrega un producto al servidor
const addProductOnServer = async (req, res) => {
    const data = req.body
    const products = new ProductManager(path)
    const isAdd = await products.addProduct(data)
    let info = {}

    if(isAdd){
       info ={
        status: "successs",
        message: "product added successfully."
       }
       return res.status(200).json(info)
    }
    
    info ={
        status: "error",
        message: "the product could not be added check the data sent."
       }
    return res.status(200).json(info)
}    

// Actualiza un producto al servidor
const updProductOnServer = async (req, res) => {
    let {pid} = req.params
    const data = req.body
    let info = {}
    
    pid = parseInt(pid)
    pid = isNaN(pid) ? undefined : pid 

    if(pid === undefined || data === undefined){
        info ={
            status: "error",
            message: "verify that id or data, does not exist or is invalid",
            updated: []
        }
        return res.status(400).json(info)
    }
    
    const products = new ProductManager(path)
    const isUpdated = await products.updateProductById(pid, data)

    if(isUpdated === false || (Array.isArray(isUpdated) && isUpdated.length === 0)){
        info ={
            status: "error",
            message: "could not update, id does not exist, or did not need to update.",
            updated: []
        }
        return res.status(400).json(info)
    }

    info ={
        status: "success",
        message: "updated information correctly.",
        updated: isUpdated
    }
    return res.status(200).json(info)

}

// Borra un producto del servidor
const delProductOnServer = async (req, res) => {
    let {pid} = req.params
    let info = {}
    
    pid = parseInt(pid)
    pid = isNaN(pid) ? undefined : pid
    
    if(pid === undefined){
        info ={
            status: "error",
            message: "verify that id, is invalid."
        }
        return res.status(400).json(info)
    }

    const products = new ProductManager(path)
    const isDeleted = await products.deleteProductById(pid)

    if(isDeleted === false){
        info ={
            status: "error",
            message: "could not delete, id does not exist."
        }
        return res.status(400).json(info)
    }

    info ={
        status: "success",
        message: `product id ${pid} removed successfully.`
    }
    return res.status(200).json(info)
}

module.exports = { getProductsFromServer, getProductFromServer, addProductOnServer, updProductOnServer, delProductOnServer }
