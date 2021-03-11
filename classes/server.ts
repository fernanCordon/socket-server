// 13 Me recomienda que instale: npm i --save-dev @types/express
// para que nos muestre ayudas al escribir código del paquete de express
// Lo instalo.
import express from 'express';

// 18 importo el puerto (se importa solo)
import { SERVER_PORT } from '../global/environment';

// 12 Para que sea el paquete el que se exporte por defecto cualdo alguien importe esta clase
export default class Server {

   // 14 Ahora ya express tiene me ayuda con el tipado. Pongo también port
   public app: express.Application;
   public port: number;

   // 17 Para inicializar las variables
   constructor () {
      this.app = express();
      this.port = SERVER_PORT
   }

   // 19 Método para iniciar mi servidor
   start( callback:  () => void ) {
      this.app.listen( this.port, callback );
   }

}