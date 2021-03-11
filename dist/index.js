"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./classes/server"));
const router_1 = __importDefault(require("./routes/router"));
const server = new server_1.default();
// 10 Para poder leer los datos que me lleguen de Postman . Seserializarán y genera un json
// Es importante ponerlo antes de las rutas
server.app.use(express_1.default.urlencoded({ extended: true }));
server.app.use(express_1.default.json());
// 5 La aplicación de express. router lo importo del archivo router que he hecho antes
server.app.use('/', router_1.default);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
// 6 Lo pruebo desde Postman: GET localhost:5000/mensajes
// 8 Postman: POST localhost:5000/mensajes
// 9 en POSTMAN quiero haré la prueba de enviar datos. Y yo la debo recibir en router.post...
// 13 Ahora ya puedo hacer esta petición desde postman
/*
   POST --   Body  /  x-www-form-urlencoded

   key         Value
   cuerpo      Hola desde REST-POST
   de          RestUser

   */ 
