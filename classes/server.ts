import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

// 3 importa todo de esa dirección y le pongo el nombre socket
import * as socket from '../sockets/socket';
import { Socket } from 'socket.io';


export default class Server {

   private static _instance: Server;

   public app: express.Application;
   public port: number;

   public io: socketIO.Server;

   private httpServer: http.Server;


   private constructor () {
      this.app = express();
      this.port = SERVER_PORT

      this.httpServer = new http.Server( this.app );

      this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );

      this.escucharSockets();

   }

   public static get instance() {
      return this._instance || ( this._instance = new this() );
   }

   private escucharSockets() {
      
      console.log('Escuchando conexiones - sockets');

      this.io.on('connection', cliente => {
         console.log('Cliente conectado');

         // 1 Detectar desde el servidor cuando se desconecta un cliente
         // cliente.on('disconnect', () => {
         //    console.log('Cliente desconectado');
         // }); 

         // 4 Llamo a la función desconectar que creé en sockets/socket.ts
         socket.desconectar( cliente );

      });

   }


   start( callback:  () => void ) {
      this.httpServer.listen( this.port, callback );
   }

}