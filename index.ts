
import express from "express";
import Server from "./classes/server";
import router from "./routes/router";

// 1 Importo cors y en la ayuda me dice: npm i --save-dev @types/cors
// Hago por tanto ese npm
import cors from 'cors';

const server = new Server();

server.app.use(express.urlencoded({extended:true})); 
server.app.use(express.json());

// 2 Tengo que habilitar el CORS: https://www.npmjs.com/package/cors
// para que la app Fronted (Angular) pueda estar corriendo en un servidor y el backend en otro
// Permito que cualquier persona pueda llamar mis servicios
server.app.use( cors({ origin: true, credentials: true }));

server.app.use( '/', router )

server.start( () => {
   console.log(`Servidor corriendo en el puerto ${ server.port }`);
});

// 3 Creo .gitignore  No debo subir a gitHub estas 2 carpetas
//    dist/
//    node_modules/


// 4 README.md
 /*
   Reconstruir módulos de Node
   ```
   npm install
   ``
   Generar el DIST
   ```
   tsc -w
   ``
   Levantar el servidor, cualquiera de estos dos comandos
   ```
   nodemon dist/
   node dist
   ```
*/