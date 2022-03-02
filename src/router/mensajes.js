//-------------------------------------------------------------------
// Entregable 17: Persistencia
// Fecha de entrega: 11-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import {Router} from 'express'
const routerMensajes = new Router()

import {MensajesDao as mensajesApi} from '../daos/index.js'
import logger from '../logs/logger.js';

// Normalizacion
import { normalize,schema } from 'normalizr';
const authorNormalizerSchema = new schema.Entity('author',{},{
    idAttribute: 'mail'
})
const textNormalizerSchema = new schema.Entity('text',{author: authorNormalizerSchema}, {idAttribute: 'id'} )
const messagesNormalizerSchema = [textNormalizerSchema];


//-------------------------------------------
// Rutas de la api rest Mensajes
routerMensajes.get('/', async (req, res) => {
  let msjs= await mensajesApi.getAll()
  res.json(normalize(msjs, messagesNormalizerSchema, {idAttribute: 'email'}))
})
routerMensajes.post('/', async (req, res) => {
  const time = new Date()
  const newElem = { ...req.body, fyh: time.toLocaleString() }
  res.json(` ${await mensajesApi.save(newElem)}!`)
})
  
routerMensajes.get('*', (req, res) => {
  const { url, method } = req
  logger.warn(`Ruta ${method} ${url} no implementada`)
  res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})
export {routerMensajes}