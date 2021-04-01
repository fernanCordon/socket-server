"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const socket_1 = require("../sockets/socket");
const router = express_1.Router();
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo está bien!!'
    });
});
router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
// 1 Servicio para obtener todos los id de los usuarios
router.get('/usuarios', (req, res) => {
    // Para obtener la sesión, o los ids de los sockets ocuparé una instancia del servidor de io
    const server = server_1.default.instance;
    // Para barrer todos los clientes conectados necesito ese servidor. Llamo la función allSockets, que se 
    // encuentra en el servidor de io y que regresa una promesa
    // El argumento clientes entra como un set de strings, luego lo cambio
    server.io.allSockets().then((clientes) => {
        // Si todo está bien mando este servicio, primero diciendo que todo está bien
        res.json({
            ok: true,
            // Aquí lo convierto en un array de Strings
            clientes: Array.from(clientes)
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        });
    });
});
// 2 Para probarlo abro también Safari y con 2 ventanas para tener 3 conexiones: 1 en chrome y 2 en safari
// Usuarios: Fenando, Susana y Andrés
// En Postman hago una petición a localhost:5000/usuarios y me salen 3 ids
// Cierro la ventana de Andrés y en Postman repito la petición y me salen 2 ids
// Tengo los ids para mandar mensajes privados, pero el problema es que no sé que persona tiene ese id
// 3 Servicio para obtener usuarios y sus nombres
// En sockets.ts tengo el objeto usuariosConectados que crea una instancia de UsuariosLista
// Toda la comunicación de sockets está basada en esa clase (agregarUsuarios, borrarUsuarios, etc)
// A usuariosConectados le puse un export, pero hasta ahora no se había usado fuera de aquel archivo
// Ahora lo usaré aquí
router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        // En usuarios-lista.ts está el método getLista que devuelve una lista
        clientes: socket_1.usuariosConectados.getLista()
    });
});
// 4 Postman: localhost:5000/usuarios/detalle. Pero solo se ve el nombre si previamente he recargado el navegador
// Eso se debe a que en la app de angular, cuando se recarga (archivo websocket.servive.ts) se dispara cargarStorage()
// y en ese método, volvemos a autenticarnos (loginWS)
// Voy a corregir eso a angular y añado cargarStorage() en el método checkStatus
// 5 Después de añadir lo de angular vuelvo a postman: pongo 2 usuarios, bajo el servidor, lo vuelvo a subir 
// hago la petición localhost:5000/usuarios/detalle y ya se ven los nombres de los 2 usuarios
// 6 Para mandarle un mensaje privado a Fernando copio su id de Postman
// y hago la siguiente peticion: localhost:5000/mensajes/8BZLfTOYS4bhgDEmAAAD
// En body estaba: 
// cuerpo: Hola desde REST-POST 
// de: RestUser
// Veo en la consola del navegador que ha llegado
exports.default = router;
