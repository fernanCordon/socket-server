import { Usuario } from './usuario';

// 2 Para tener aquí centralizada la lógica de todos mis usuarios:
// procesos para agregar, para mandar un mensaje en particular, etc...
export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() {}

    // Método para agregar un usuario
    public agregar( usuario: Usuario ) {

        this.lista.push( usuario );
        console.log( this.lista );
        return usuario;
    }

    // Como de todos los usuarios tenemos id, podemos actualizar el nombre recorriendo la lista de usuarios con un for
    public actualizarNombre( id: string, nombre: string ) {

        for( let usuario of this.lista ) {
            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('==== Actualizando usuario');
        console.log( this.lista ); // Para ver que se ha actualizado la lista
    }

    // Método para obtener la lista de usuarios conectados (la lista es privada)
    public getLista() {
        return this.lista;
    }

    // Para devolver un usuario
    public getUsuario( id: string ) {
        return this.lista.find( usuario => usuario.id === id );
    }

    // Obtener todos los usuarios de una sala en particular
    public getUsuariosEnSala( sala: string ) {
        return this.lista.filter( usuario => usuario.sala == sala );
    }

    // Borrar un usuario
    public borrarUsuario( id: string ) {
        
        const tempusuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        // 8 Para que imprima la lista y ver si queda vacío
        // Cuando cierro la ventana del navegador lo veo
        // console.log( this.lista );

        return tempusuario;
    }

}