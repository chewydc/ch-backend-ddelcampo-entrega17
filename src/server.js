//-------------------------------------------------------------------
// Entregable 17: Persistencia
// Fecha de entrega: 11-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import express from 'express'
import cluster from 'cluster'
import os from 'os'

const app = express()

import { Server as HttpServer } from 'http' 
import { Server as IOServer } from 'socket.io'
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

import logger from './logs/logger.js';
import passport from 'passport'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import {default as config} from './config.js'
import {UsuariosDao as userModel} from './daos/index.js'

//-------------------------------------------------------------------
// Seteo la Session
app.use(
  session({
      //Persistencias de sesiones en MongoDB Atlas
      store: MongoStore.create({
      mongoUrl: config.mongodb.url,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
      }),
    secret: config.server.session,
    resave: false,
    saveUninitialized: true,  
    cookie: {
      maxAge: 600000
    }
  })
);
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// Setting up the passport plugin
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

//-------------------------------------------------------------------
//Declaro Router a utilizar
import {routerMensajes} from "./router/mensajes.js"
import {routerProductos} from "./router/productos.js"
import {routerProductostest} from "./router/productos-test.js"
import {routerInfo} from "./router/info.js"
import {routerRandom} from "./router/random.js"
import {routerWeb} from "./router/webpage.js"

app.use('/api/mensajes',routerMensajes)
app.use('/api/productos',routerProductos)
app.use('/api/productos-test',routerProductostest)
app.use('/api/info',routerInfo)
app.use('/api/randoms',routerRandom)
app.use('/',routerWeb)
//-------------------------------------------------------------------

//-------------------------------------------------------------------
//Manejo de websockets
io.on('connection', clientSocket => {
  logger.info(`#${clientSocket.id} se conectó`)

  clientSocket.on('nuevoProducto', (msj) => {
    logger.info(msj)
    io.sockets.emit('updateProd')
  })
  
  clientSocket.on('nuevoMensaje', (msj) => {
    logger.info(msj)
    io.sockets.emit('updateMsj')
  })

})
//----------------------------------------------------------
// Tomo el puerto de los argumentos ingresado por linea de comando
import parseArgs from 'minimist';
const options = {
    alias: {
        p: 'puerto',
        m: 'modo'
        },
    default: {
        puerto: config.server.port,
        modo: config.server.modo
    }
}
const commandLineArgs = process.argv.slice(2);
const { puerto, modo, _ } = parseArgs(commandLineArgs, options);
logger.info({ puerto, modo, otros: _ });

//-------------------------------------------------------------------
// Cargo el server
if(modo=='CLUSTER' && !cluster.isWorker) {
  const numCPUs = os.cpus().length
  
  logger.info(`Número de procesadores: ${numCPUs}`)
  logger.info(`PID MASTER ${process.pid}`)

  for(let i=0; i<numCPUs; i++) {
      cluster.fork()
  }

  cluster.on('exit', worker => {
      logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
      cluster.fork()
  })
}

else {
  
  const server = httpServer.listen(puerto, () => {
    logger.info(`Servidor HTTP escuchando en el puerto ${server.address().port} - PID WORKER ${process.pid}`)
    })
    server.on("error", error => logger.error(`Error en servidor ${error}`))
}

