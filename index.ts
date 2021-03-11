// 21 Al haberlo exportado por default ahora el import se hace así
import Server from "./classes/server";

// 1 npm init -y
// 2 npm i express
// 3 npm i cors  (porque el server estará en un sitio y la app en otro)
// 4 npm i body-parser
// 5 tsc --init  (creo el tsconfig.json)
// 6 En el archivo tsconfig.json:   "target": "es6"  y  "outDir": "dist/"



// 8 En la consola: tsc -w  (modo watch) y se crea el index.js en dist

// 9 En otra terminal: nodemon dist/

// 7 Voy a probar este código que en el punto 10 comentaré 
// 10 Comento este código para crear el servidor
// const nombre = "Fernando Cordón";
// console.log(`Mi nombre es ${ nombre }`);


/* 11 
Esto es lo que yo necesito hacer

   const server = new Server();

   server.start( () => {
      console.log("Servidor corriendo en el puerto XXX");
   });

*/

// 20 Ahora ya lo puedo poner (lo importo arriba) y llamo a start
// OK, Veo el mensaje en la consola
const server = new Server();

server.start( () => {
   console.log(`Servidor corriendo en el puerto ${ server.port }`);
});