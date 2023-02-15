class ListProducts{
    constructor(){
        this.list = []
    }

    /* Método que obtiene la longitud de la lista de productos. */
    getLength = () => this.list.length

    /* Método que crea una ID única que se incrementa automáticamente. */
    createId = () => this.getLength() ? this.list[this.getLength() - 1].id + 1 : 1

    /* Método que inicializa la lista de productos. */
    setList = contFile => this.list = JSON.parse(contFile)

    /* Método que devuelve la lista completa de productos. */
    getList = () => this.list 

    /* Método que devuelve los primeros N productos de la lista, si el número es
    mayor que los productos existentes, solo devolverá los existentes
    productos */
    getElements = numElements => this.list.slice( 0, numElements )  

    /* Método que devuelve un producto, utiliza la identificación del producto para buscar
    lo, si no lo encuentra, lo devuelve Undefined. */
    getElementById = id => this.list.find( ele => ele.id === id )
    
    /* Método que devuelve el índice de un producto, usa el id del producto
    para buscarlo, si no lo encuentra devuelve -1. */
    getIndexElementById = id => this.list.findIndex( ele => ele.id === id)

    /* Método que agrega un producto a la lista, recibe un objeto con el
    siguientes propiedades requeridas: título, descripción, código, precio, estado,
    acción, categoría; la propiedad thumbnails es una matriz y es opcional. Si
    no se cumplen las propiedades obligatorias, devuelve false; si la inserción
    tiene éxito, devuelve true. */
    addElement = data => {
        let { title, description, code, price, status, stock, category, thumbnails } = data

        if( title === undefined || description === undefined || code === undefined || price === undefined || status === undefined || stock === undefined || category === undefined ){
            return false
        }

        if( thumbnails === undefined ){
            thumbnails = []
        }

        let oldLength = this.list.length

        this.list.push({
            id: this.createId(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        })

        let newLength = this.list.length

        if( newLength > oldLength ){
            return true
        }

        return false
    }

    /* Método que actualiza un producto, usa la identificación para encontrar el producto para
    actualizar. Si no encuentra el id del producto, devuelve falso, si
    hace, devolverá una matriz con los nombres de las propiedades que podrían
    estar actualizado. */
    updateElementById = ( id, data ) => {
        const indexId = this.getIndexElementById( id )

        if(indexId < 0 ){
            return false
        }

        const element = this.list[ indexId ]
        const { title, description, code, price, status, stock, category, thumbnails } = data
        const updated = []

        const isUpdated = {
            title : false,
            description: false,
            code: false,
            price: false,
            status: false,
            stock: false,
            category: false,
            thumbnails: false
        }

        if(title !== undefined && !(element.title === title)){
            element.title = title
            isUpdated.title = true
        }
        
        if(description !== undefined && !(element.description === description)){
            element.description = description
            isUpdated.description = true
        }

        if(code !== undefined && !(element.code === code)){
            element.code = code
            isUpdated.code = true
        }

        if(price !== undefined && !(element.price === price)){
            element.price = price
            isUpdated.price = true
        }

        if(status !== undefined && !(element.status === status)){
            element.status = status
            isUpdated.status = true
        }

        if(stock !== undefined && !(element.stock === stock)){
            element.stock = stock
            isUpdated.stock = true
        }

        if(category !== undefined && !(element.category === category)){
            element.category = category
            isUpdated.category = true
        }

        if(thumbnails !== undefined && !(element.thumbnails.length === thumbnails.length && element.thumbnails.every( strurl => thumbnails.includes(strurl)) )){
            element.thumbnails = thumbnails
            isUpdated.thumbnails = true
        }

        for (const property in isUpdated) {
            if (isUpdated[property] === true) {
                updated.push(property)
            }
        }

        return updated
    }

    /* Método que elimina un producto, usa la identificación para buscar el artículo para
    eliminar. En caso de no encontrar el id del producto devuelve -1, si
    lo encuentra, lo eliminará y devolverá el índice del elemento eliminado. */
    deleteElementById = id => {
        const indexId = this.getIndexElementById( id )
        
        if( !(indexId < 0) ){
            this.list.splice( indexId, 1 )
        }
        
        return indexId
    }
    
    /* Método que vacía la lista de productos. */
    emptyList = () => this.list.length = 0 
}

module.exports = ListProducts