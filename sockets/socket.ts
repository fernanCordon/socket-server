import SocketIO from "socket.io";
import { Socket } from "socket.io";

export const desconectar = ( cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
     }); 
}

export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {

        console.log( 'Mensaje recibido', payload );
        
        io.emit('mensaje-nuevo', payload)

     }); 
}

// 1 Configurar usuario con este método en el que recojo el evento configurar-usuario

export const configurarUsuario = ( cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {

        console.log( 'Configurando usuario', payload.nombre );

        // 2 Y puedo llamar el callback para retornar este objeto
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });

     }); 
}