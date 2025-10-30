export class UserAlreadyException extends Error {

    constructor( readonly statusCode : number = 400) {
        super('Usuário já cadastrado')
    }

}