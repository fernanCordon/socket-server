"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./classes/server"));
const router_1 = __importDefault(require("./routes/router"));
// 1 Importo cors y en la ayuda me dice: npm i --save-dev @types/cors
// Hago por tanto ese npm
const cors_1 = __importDefault(require("cors"));
const server = new server_1.default();
server.app.use(express_1.default.urlencoded({ extended: true }));
server.app.use(express_1.default.json());
// 2 Tengo que habilitar el CORS: https://www.npmjs.com/package/cors
// para que la app Fronted (Angular) pueda estar corriendo en un servidor y el backend en otro
// Permito que cualquier persona pueda llamar mis servicios
server.app.use(cors_1.default({ origin: true, credentials: true }));
server.app.use('/', router_1.default);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
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
