"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("../global/environment");
// 2 Importo socket.io
const socket_io_1 = __importDefault(require("socket.io"));
// 4 importo el intermediario entre io y express
const http_1 = __importDefault(require("http"));
// 1 https://socket.io/ --> npm install socket.io
//                      --> npm install @types/socket.io --save-dev
// 8 Levanto en una terminal el Tipescript: tsc -w
//         y en otra: nodemon dist/
//  Voy a Postman a probarlo: GET  localhost:5000/mensajes/ABC   OK
class Server {
    // 13 Implemento el patrón Singleton porque solo quiero tener una única instancia de mi clase Server.
    // Por eso hago privado el constructor
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        // 6 Inicializamos el http server con la configuración que tiene la app de express
        this.httpServer = new http_1.default.Server(this.app);
        // 9 Inicializamos el io que recibe la configuración del httpServer
        // Sería ideal que funcionará con el this.app pero por ahora hay que utilizar un http server de Node
        this.io = new socket_io_1.default.Server(this.httpServer, { cors: { origin: true, credentials: true } });
        // 11 Llamo al método
        this.escucharSockets();
    }
    // 15 Solo propiedades o métodos internos a la clase van a poder llamar al constructor
    static get instance() {
        // Si ya hay alguna instancia llama a la que ya hay y si no, la crea
        // this() es lo mismo que Server()
        return this._instance || (this._instance = new this());
    }
    // 10 Voy a escuchar sockets con este método. Es privado porque solo se va allamar desde la inicialización de la clase
    escucharSockets() {
        console.log('Escuchando conexiones - sockets');
        // 12 Para ver cuando un cliente se conecta mediante sockets. on es para escuchar algún evento
        // Escucharé el evento connection. En el 2º parámetro recibo un socket (lo llamao cliente) que es un nuevo dispositivo que se conecta
        this.io.on('connection', cliente => {
            console.log('Cliente conectado');
        });
    }
    start(callback) {
        // 7 Ahora en lugar de inicializar el app inicializo el httpServer
        // this.app.listen( this.port, callback );
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
