const fs = require('fs')
const ListCarts = require('./ListCarts')

class CartManager {
    constructor(path) {
        this.path = path
    }

    /* El método que obtiene el contenido del archivo de carritos de compras devuelve lo siguiente.
        String - Con contenido del archivo.
        False: si no se encuentra el archivo o si existe, pero se encuentra vacío. */
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

    /* MMétodo que escribe el contenido del archivo del carrito de compras, devuelve lo siguiente.
        True: indica si el archivo se escribió correctamente.
        False: si hubo un problema al escribir en el archivo. */
    setContentFile = async content => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(content, null, 4))
        } catch (error) {
            return false
        }
        return true
    }

    /* Método que obtiene un carrito de compras del archivo, recibe la identificación del solicitado
        carro de la compra como parámetro, devuelve lo siguiente.
        Object – Si encuentra el carrito de compras solicitado.
        Undefined: si no se encuentra el carrito de compras solicitado.
        False: si no se encuentra el archivo o si existe, pero está vacío.*/
    getCartById = async idCart => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const carts = new ListCarts()
        carts.setList(content)

        return carts.getElementById(idCart)
    }

    /* Método que crea un nuevo carrito de compras, devuelve lo siguiente.
        True: si el carrito se pudo crear correctamente.
        False: si hubo un problema al crear o registrar el carrito de compras.*/
    addCart = async () => {
        const content = await this.getContentFile()
        const carts = new ListCarts()

        if (content !== false) {
            carts.setList(content)
        }

        if (carts.addElement()) {
            return await this.setContentFile(carts.getList())
        }

        return false
    }

    /* Método que agrega o actualiza un producto al carrito de compras existente, recibe el
    id del carrito de compras y el id del producto a agregar como parámetros, devuelve lo siguiente.
    True: si el producto se pudo agregar o actualizar correctamente.
    False: si no se encuentra el archivo o si existe, pero está vacío. si las compras
    No se encontró carrito para agregar el producto. */
    addProductToCart = async (idCart, idProduct) => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const carts = new ListCarts()
        carts.setList(content)
        if (carts.addElementByIds(idCart, idProduct)) {
            return await this.setContentFile(carts.getList())
        }

        return false
    }
}

module.exports = CartManager