
import express from "express";
import Server from "./classes/server";
import router from "./routes/router";


const server = new Server();

 // 10 Para poder leer los datos que me lleguen de Postman . Seserializarán y genera un json
 // Es importante ponerlo antes de las rutas
server.app.use(express.urlencoded({extended:true})); 
server.app.use(express.json());

// 5 La aplicación de express. router lo importo del archivo router que he hecho antes
server.app.use( '/', router )


server.start( () => {
   console.log(`Servidor corriendo en el puerto ${ server.port }`);
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