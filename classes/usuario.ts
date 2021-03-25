// 1 Configuración básica de un usuario del lado del servidor
export class Usuario {

    // Es el ID del socket que se está conectando y siempre tiene que existir
    public id: string;
    // El nombre es opcional porque en el momento que alguien se conecta al servidor todavía no tiene nombre
    public nombre: string;
    // también opcional
    public sala: string;

    constructor( id: string ) {
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
    }
}