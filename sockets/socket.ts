import { Socket } from "socket.io";

export const desconectar = ( cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
     }); 
}

// 1 Hay que hacer algo para recibir el evento 'mensaje' que viene de Angular
export const mensaje = ( cliente: Socket) => {
    // Lo que venga se mete en payload (luego lo haremos mejor lo de la definición del payload)
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
        console.log( 'Mensaje recibido', payload );
     }); 
}