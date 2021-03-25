import SocketIO from "socket.io";
import { Socket } from "socket.io";
import { Usuario } from "../classes/usuario";
import { UsuariosLista } from '../classes/usuarios-lista';

// 4 Necesito exportar una instancia de mi usuarioList
// y es la única instancia que usaré de los usuarios conectados
export const usuariosConectados = new UsuariosLista();

// 6 Implemento el método que tiene que almacenar el cliente en la lista de UsuarioLista
export const conectarCliente = ( cliente: Socket ) => {

    // Nueva instancia de un usuario. Le paso el id del socket
    const usuario = new Usuario( cliente.id );
    // Lo agrego con el método de usuariosConectados
    usuariosConectados.agregar( usuario );
}

export const desconectar = ( cliente: Socket ) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');

        // 7 Llamo la instancia de usuariosConectados y borro
        usuariosConectados.borrarUsuario( cliente.id );
     }); 
}

export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {

        console.log( 'Mensaje recibido', payload );
        
        io.emit('mensaje-nuevo', payload)

     }); 
}


export const configurarUsuario = ( cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {

        // 9 asigno un nombre a un id
        // OK en la terminal del nodemon lo veo
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
       
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });

     }); 
}