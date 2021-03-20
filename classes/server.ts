import express from 'express';
import { SERVER_PORT } from '../global/environment';

// 2 Importo socket.io
import socketIO from 'socket.io';
// 4 importo el intermediario entre io y express
import http from 'http';

// 1 https://socket.io/ --> npm install socket.io
//                      --> npm install @types/socket.io --save-dev

// 8 Levanto en una terminal el Tipescript: tsc -w
//         y en otra: nodemon dist/
//  Voy a Postman a probarlo: GET  localhost:5000/mensajes/ABC   OK

export default class Server {

   // 14 Declaro la propiedad de clase privada _instance, de la clase Server.
   private static _instance: Server;

   public app: express.Application;
   public port: number;

   // 3 Pensemos que io es muy parecido al servidor de Express. Es la configuración de la conexión de los sockets
   // Propiedad encargada de emitir eventos y escuchar otras cosas
   // Socket io necesita recibir la configuración del servidor que está corriendo y como no son muy compatibles Express e io necesito un intermediario que va a ser http
   public io: socketIO.Server;

   // 5 Realmente levantaremos este servidor y no el app de express
   private httpServer: http.Server;

   // 13 Implemento el patrón Singleton porque solo quiero tener una única instancia de mi clase Server.
   // Por eso hago privado el constructor
   private constructor () {
      this.app = express();
      this.port = SERVER_PORT

      // 6 Inicializamos el http server con la configuración que tiene la app de express
      this.httpServer = new http.Server( this.app );

      // 9 Inicializamos el io que recibe la configuración del httpServer
      // Sería ideal que funcionará con el this.app pero por ahora hay que utilizar un http server de Node
      this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );
   
      // 11 Llamo al método
      this.escucharSockets();
   
   }

   // 15 Solo propiedades o métodos internos a la clase van a poder llamar al constructor
   public static get instance() {
      // Si ya hay alguna instancia llama a la que ya hay y si no, la crea
      // this() es lo mismo que Server()
      return this._instance || ( this._instance = new this() );
   }

   // 10 Voy a escuchar sockets con este método. Es privado porque solo se va allamar desde la inicialización de la clase
   private escucharSockets() {
      console.log('Escuchando conexiones - sockets');
      // 12 Para ver cuando un cliente se conecta mediante sockets. on es para escuchar algún evento
      // Escucharé el evento connection. En el 2º parámetro recibo un socket (lo llamao cliente) que es un nuevo dispositivo que se conecta
      this.io.on('connection', cliente => {
         console.log('Cliente conectado');
      });
   }



   start( callback:  () => void ) {

      // 7 Ahora en lugar de inicializar el app inicializo el httpServer
      // this.app.listen( this.port, callback );
      this.httpServer.listen( this.port, callback );
   }

}