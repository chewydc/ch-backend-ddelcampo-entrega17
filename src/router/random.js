//-------------------------------------------------------------------
// Entregable 17: Persistencia
// Fecha de entrega: 11-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import {Router} from 'express'
const routerRandom = new Router()
import {fork} from 'child_process'
import path from 'path'

routerRandom.get('/', (req,res)=> {
    const scriptPath = path.resolve(__dirname, "../utils/random-child.js");

    const computo = fork(scriptPath)
    const msj = {
        command: "start",
        cant: req.query.cant,
    };
    computo.send(msj);
    computo.on('message', (re) => {
        res.json({resultado: re});
    })
})

export {routerRandom}