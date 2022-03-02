//-------------------------------------------------------------------
// Entregable 17: Persistencia
// Fecha de entrega: 11-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import config from '../config.js'
import logger from '../logs/logger.js';

let ProductosDao

switch (config.server.persistenciaProd) {
    case 'file':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        logger.info("Productos persistirá en arhivo local")
        ProductosDao = new ProductosDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        logger.info("Productos persistirá en firebase")
        ProductosDao = new ProductosDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDB } = await import('./productos/ProductosDaoMongoDb.js')
        logger.info("Productos persistirá en mongoDB")
        ProductosDao = new ProductosDaoMongoDB()
        break
    default:
        const { default: ProductosDaoMemoria } = await import('./productos/ProductosDaoMemoria.js')
        logger.info("Productos persistirá por defecto en memoria")
        ProductosDao = new ProductosDaoMemoria()
        break
}

let MensajesDao

switch (config.server.persistenciaMsj) {
    case 'file':
        const { default: MensajesDaoArchivo } = await import('./mensajes/MensajesDaoArchivo.js')
        logger.info("Mensajes persistirá en arhivo local")
        MensajesDao = new MensajesDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: MensajesDaoFirebase } = await import('./mensajes/MensajesDaoFirebase.js')
        logger.info("Mensajes persistirá en firebase")
        MensajesDao = new MensajesDaoFirebase()
        break
    case 'mongodb':
        const { default: MensajesDaoMongoDB } = await import('./mensajes/MensajesDaoMongoDb.js')
        logger.info("Mensajes persistirá en mongoDB")
        MensajesDao = new MensajesDaoMongoDB()
        break
    default:
        const { default: MensajesDaoMemoria } = await import('./mensajes/MensajesDaoMemoria.js')
        logger.info("Mensajes persistirá por defecto en memoria")
        MensajesDao = new MensajesDaoMemoria()
        break
}

let UsuariosDao
let { default: userModel } = await import('./usuarios/UsuariosMongoDB.js')
switch (config.server.persistenciaUser) {
    case 'mongodb':
        logger.info("Usuarios persistirá en MongoDB")
        UsuariosDao = userModel
        break
    default:
        logger.info("Usuarios persistirá por defecto en MongoDB")
        UsuariosDao = userModel
        break
}

export { ProductosDao,MensajesDao,UsuariosDao }
//export { ProductosDao,MensajesDao }