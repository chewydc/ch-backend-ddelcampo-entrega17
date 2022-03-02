//-------------------------------------------------------------------
// Entregable 17: Persistencia
// Fecha de entrega: 11-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import { Router } from 'express'
const routerInfo = new Router()
import os from 'os'
import logger from '../logs/logger.js';


routerInfo.get('/', (req, res) => {
    console.log('Test Performance')

    res.json(
        {
            Arg: process.argv.slice(2),
            SO: process.platform,
            Node: process.version,
            Memoria: process.memoryUsage().rss,
            execPath: process.execPath,
            PID: process.pid,
            ProjectFolder: process.cwd(),
            NroSrv: os.cpus().length
        }
    );
})

routerInfo.get('*', (req, res) => {
    const { url, method } = req
    logger.warn(`Ruta ${method} /api/info${url} no está implementada`)
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})
export {routerInfo}