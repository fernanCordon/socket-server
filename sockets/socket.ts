import { Socket } from "socket.io";

// 2 Función con el export para poder utilizarla en otro lugar
export const desconectar = ( cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
     }); 
}