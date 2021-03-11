// 1 De express traigo esto
import { Router, Request, Response } from 'express';

// 2 Creo el Router
const router = Router();

// 3 Defino una petición GET con la ruta /mensajes
router.get('/mensajes', ( req: Request, res: Response ) => {
   res.json({
      ok: true,
      mensaje: 'Todo está bien!!'
   });
});

// 7 Defino una petición POST con la ruta /mensajes
router.post('/mensajes', ( req: Request, res: Response ) => {

   // 11 En estas constantes recibiré lo que me llegue
   const cuerpo = req.body.cuerpo;
   const de = req.body.de;

   res.json({
      ok: true,
      // 12 Pongo estos atributos
      cuerpo,  //cuerpo: cuerpo,
      de       // de: de
   });
});


// 14 Lo copio de arriba y le pongo /:id en la ruta (eso es un argumento)
router.post('/mensajes/:id', ( req: Request, res: Response ) => {

   // 11 En estas constantes recibiré lo que me llegue
   const cuerpo = req.body.cuerpo;
   const de = req.body.de;
   // 16 Para recoger ese argumento (podría ser en usuario)
   const id = req.params.id;

   res.json({
      ok: true,
      // 12 Pongo estos atributos
      cuerpo,  //cuerpo: cuerpo,
      de,      // de: de
      // 17 y coloco aquí lo del params
      id
   });
});

// 15 POSTMAN: Duplico el tab de la petición anterior y añado /ABC
// localhost:5000/mensajes/ABC
// Lo tendré también que recoger

// 18 POSTMAN: localhost:5000/mensajes/ABC



// 4 Solo exporto el router (por defecto)
export default router;