//-------------------------------------------------------------------
// Entregable 17: Persistencia
// Fecha de entrega: 11-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'

class MensajesDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('mensajes')
    }
}

export default MensajesDaoFirebase