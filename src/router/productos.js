//-------------------------------------------------------------------
// Entregable 17: Persistencia
// Fecha de entrega: 11-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import Router from 'express'
const routerProductos = new Router()


const MESSAGEERROR = 'Producto no encontrado';

import {ProductosDao as a} from '../daos/index.js'
import logger from '../logs/logger.js';


routerProductos.get('/',async (req,res)=> {
    res.json(await a.getAll());
})

routerProductos.get('/:id',async (req,res)=> {
    const { id } = req.params
    let b=await a.getById(id)
    if(b.length == 0) {b=MESSAGEERROR}
    res.json(b)
})

routerProductos.post('/',async (req,res)=> {
    const time = new Date()
    const newElem = { ...req.body, fyh: time.toLocaleString() }  
    res.json(`Nuevo producto ID: ${await a.save(newElem)} cargado OK!`)
})

routerProductos.put('/:id',async (req,res)=> {
    const { id } = req.params
    const nuevoProducto = req.body
    let productos=await a.getById(id)
    if(productos.length == 0) {res.json(MESSAGEERROR)}
    else {
        let productos=await a.getAll()
            await a.deleteAll()
            for (let i = 0; i < productos.length; i++) {
                if(productos[i].id==id) {productos[i]=nuevoProducto}
                await a.save(productos[i]);
            }
            res.json(await a.getAll())
        } 
})

routerProductos.delete('/:id',async (req,res)=> {
    const { id } = req.params
    let b=await a.getById(id)
    if(b.length == 0) {res.json(MESSAGEERROR)}
    else  {
        await a.deleteById(id)
        res.json(`Producto ID: ${id} eliminado OK!`)
    }
})

routerProductos.get('*', (req, res) => {
    const { url, method } = req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
  })

  export {routerProductos}