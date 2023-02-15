const fs = require('fs')
const ListProducts = require('./ListProducts')

class ProductManager {
    constructor(path) {
        this.path = path
    }

    /* Method that gets the content of the products file returns the following.
        String - With content of the file.
        False – If the file is not found, or if the file exists, but is empty. */
    getContentFile = async () => {
        let content = ""
        try {
            content = await fs.promises.readFile(this.path, 'utf-8')
        } catch (error) {
            return false
        }

        if (content === '') {
            return false
        }

        return content
    }

    /* Method that writes the content of the products file, returns the following.
        True – Whether the file was successfully written to.
        False – If there was a problem writing to the file.
    If the file does not exist, it creates it. */
    setContentFile = async content => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(content, null, 4))
        } catch (error) {
            return false
        }
        return true
    }

    /* Method that gets all the products in the file, returns the following.
        Object Array – Whether the file contains an array (can be an empty array).
        False – If the file has no content to return or the file does not exist. */
    getAllProducts = async () => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        return products.getList()
    }

    /* Método que obtiene los primeros N productos del archivo, recibe el número de
    products a devolver como parámetro, devuelve lo siguiente.
        Object Array – Devuelve los productos solicitados, en caso de solicitar más
            productos que hay, sólo devolverá el número máximo de productos existentes
            productos
        False: si el archivo no tiene contenido para devolver o el archivo no existe. */
    getProducts = async nProducts => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        return products.getElements(nProducts)
    }

    /* Método que obtiene un producto del archivo, recibe la identificación del producto como parámetro,
    devuelve lo siguiente.
        Object: si encuentra el producto con la identificación solicitada.
        Undefined: si no se encuentra el producto con la identificación solicitada.
        False: si el archivo no tiene contenido para devolver o el archivo no existe. */
    getProductById = async idProduct => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        return products.getElementById(idProduct)
    }

    /* Método que agrega un producto al archivo, recibe como parámetro un objeto con el
    propiedades necesarias del objeto (título, descripción, código, precio, estado, existencias,
    categoría) y su propiedad opcional (miniaturas), devuelve lo siguiente.
        True: si la inserción del producto se realizó correctamente.
        False: si hubo algún error (no se cumplieron las propiedades requeridas, no se pudo registrar)
            producto a archivar). */
    addProduct = async data => {
        const content = await this.getContentFile()
        const products = new ListProducts()

        if (content !== false) {
            products.setList(content)
        }

        if (products.addElement(data)) {
            return await this.setContentFile(products.getList())
        }

        return false
    }

    /* Método que actualiza un producto en el archivo, recibe la identificación del producto y un objeto
    con los campos a actualizar como parámetros, devuelve lo siguiente.
        Array: si fue posible actualizar, devolverá una matriz con la actualización
        properties, la matriz puede estar vacía si no hubo necesidad de actualizar los productos.
        False: si el producto no se pudo actualizar o registrar en el archivo. */
    updateProductById = async (idProduct, dataUpdate) => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        const isUpdated = products.updateElementById(idProduct, dataUpdate)
        const isRegistered = await this.setContentFile(products.getList())

        if (Array.isArray(isUpdated) && isRegistered) {
            return isUpdated
        }

        return false
    }

    /* Método que elimina un producto del archivo, recibe la identificación del producto para
        remove como parámetro, devuelve lo siguiente.
        True: si el producto podría eliminarse.
        False: si no había contenido en el archivo, pero no se encontró el producto, o
        si hubo un problema al escribir en el archivo. */
    deleteProductById = async idProduct => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        if (!(products.deleteElementById(idProduct) < 0)) {
            return await this.setContentFile(products.getList())
        }

        return false
    }

}

module.exports = ProductManager