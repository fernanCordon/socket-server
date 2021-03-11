"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_PORT = void 0;
// 15 Puerto. Por si lo llevo a Heroku (allí me dan un puerto)
exports.SERVER_PORT = Number(process.env.PORT) || 5000;
