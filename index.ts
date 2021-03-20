import express from "express";
import Server from './classes/server';
import router from "./routes/router";
import cors from 'cors';

// 16 Ahora llamo al Server así
// const server = new Server();
const server = Server.instance;


server.app.use(express.urlencoded({extended:true})); 
server.app.use(express.json());

server.app.use( cors({ origin: true, credentials: true }));

server.app.use( '/', router )

server.start( () => {
   console.log(`Servidor corriendo en el puerto ${ server.port }`);
});