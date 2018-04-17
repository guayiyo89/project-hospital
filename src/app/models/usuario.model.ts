export class Usuario {

// El orden importa
// ALgunas (?) son opcionales
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) { }
// tslint:disable-next-line:eofline
}