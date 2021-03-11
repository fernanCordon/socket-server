"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 13 Me recomienda que instale: npm i --save-dev @types/express
// para que nos muestre ayudas al escribir código del paquete de express
// Lo instalo.
const express_1 = __importDefault(require("express"));
// 18 importo el puerto (se importa solo)
const environment_1 = require("../global/environment");
// 12 Para que sea el paquete el que se exporte por defecto cualdo alguien importe esta clase
class Server {
    // 17 Para inicializar las variables
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
    }
    // 19 Método para iniciar mi servidor
    start(callback) {
        this.app.listen(this.port, callback);
    }
}
exports.default = Server;
