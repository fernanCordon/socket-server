import { Usuario } from './usuario';


export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() {}

    public agregar( usuario: Usuario ) {

        this.lista.push( usuario );
        console.log( this.lista );
        return usuario;
    }

    public actualizarNombre( id: string, nombre: string ) {

        for( let usuario of this.lista ) {
            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('==== Actualizando usuario');
        console.log( this.lista ); 
    }

    // 11 Hago una validación. Si hay un usuario sin nombre, no me vale. Puede haber
    // alguien que haya abierto la aplicación pero todavía no ha hecho nada
    // 'sin-nombre' es lo que puse por defecto en el constructor de usuario.ts
    public getLista() {
        // return this.lista;
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre');
    }

    public getUsuario( id: string ) {
        return this.lista.find( usuario => usuario.id === id );
    }

    public getUsuariosEnSala( sala: string ) {
        return this.lista.filter( usuario => usuario.sala == sala );
    }


    public borrarUsuario( id: string ) {
        
        const tempusuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        return tempusuario;
    }

}