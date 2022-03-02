//-------------------------------------------------------------------
// Entregable 17: Persistencia
// Fecha de entrega: 11-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('productos')
    }
}

export default ProductosDaoFirebase