import socketIO from "socket.io";
import { Socket } from "socket.io";
import { Usuario } from "../classes/usuario";
import { UsuariosLista } from '../classes/usuarios-lista';
import Server from '../classes/server';


export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );

}

// 7 Tengo que emitir 'usuarios-activos' desde aquí, porque despues de que se elimine el usuario
// queda un usuario menos
// Como necesito mandar un mensaje a todo el mundo necesito el io
// Por eso lo meto como 2º parámetro
export const desconectar = ( cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario( cliente.id );
        // 9 .emit porque es a todo el mundo. Y el payload es usuariosConectados.getLista()
        io.emit('usuarios-activos', usuariosConectados.getLista());
     }); 
}

export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {

        console.log( 'Mensaje recibido', payload );
        
        io.emit('mensaje-nuevo', payload)

     }); 
}


export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        // 10 Porque lo tengo que emitir desde aquí también
        io.emit('usuarios-activos', usuariosConectados.getLista());
       
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });

     }); 
}