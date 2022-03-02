//-------------------------------------------------------------------
// Entregable 17: Persistencia
// Fecha de entrega: 11-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js'

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super("productos", {
            title: {type: String, required: true},
            price: {type: Number, required: false},
            thumbnail: {type: String, required: false},
            fyh: {type: String, required: false},
            id: {type: Number, required: true, unique: true}
        })
    }
}

export default ProductosDaoMongoDB