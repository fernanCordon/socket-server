import { Router, Request, Response } from 'express';

// 2 Lo importo de aquí
import Server from '../classes/server';

// 7 Esta comunicación entre los servicios Rest que acabamos de hacer es muy interesante  
// Nos ayuda a que otros usuarios que no están conectados a socket puedan enviar información
// y que los usuarios que están trabajando en tiempo real se den cuenta de eventos
// que suceden a pesar de que no están esos usuarios conectados con Sockets



const router = Router();

router.get('/mensajes', ( req: Request, res: Response ) => {
   res.json({
      ok: true,
      mensaje: 'Todo está bien!!'
   });
});


router.post('/mensajes', ( req: Request, res: Response ) => {

   const cuerpo = req.body.cuerpo;
   const de = req.body.de;

   // 7 Creo otro payload
   const payload = {
      de,
      cuerpo
   }

   // 5 instancia de nuestro server
   const server = Server.instance;

   // 6 Ahora le enviamos esto a todo el mundo y por eso no ponemos el in
   // En angular estamos emitiendo los mensajes con el 'de' y el 'cuerpo'
   // Voy a Postman: localhost:5000/mensajes y OK llega el mensaje a la web
   server.io.emit( 'mensaje-nuevo', payload );

   res.json({
      ok: true,
      cuerpo, 
      de       
   });
});


router.post('/mensajes/:id', ( req: Request, res: Response ) => {

   const cuerpo = req.body.cuerpo;
   const de = req.body.de;
   const id = req.params.id;

   // 3 Creo los datos que voy a enviar a un usuario privado
   // el de y el cuerpo del body del posteo
   const payload = {
      de,
      cuerpo
   }


   // 1 Declaramos la instancia de nuestro server. Como es un Singleton tenemos la misma instancia que corre ya en node
   // Este server tiene una propiedad que es nuestro seridor de sockets (public io: socketIO.Server;)
   const server = Server.instance;

   // 2 para mandar un mensaje, a uno o a todos los usuarios (propiedad io)
   // El método in me sirve para mandar un mensaje a una persona que se encuentra en un canal particular
   // Todas las personas en Socket están conectadas al chat global y a una sala que tiene como nombre el mismo id
   // Por eso al mandar el id del usuario le envío un mensaje a ese usuario
   // 4 Y le pongo el payload
   // Recargo el navegador, copio el id, en postman: localhost:5000/mensajes/LHUC02PQtMrZ_sfPAAAH
   // Y puedo ver en la consola del angular que le ha llegado el mensaje
   // lo importante es que ya estamos recibiendo mensajes privados
   server.io.in( id ).emit( 'mensaje-privado', payload )

   res.json({
      ok: true,
      cuerpo,  
      de,    
      id
   });
});


export default router;