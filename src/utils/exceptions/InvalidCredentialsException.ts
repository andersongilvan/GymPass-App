export class InvalidCredentialsException extends Error {

    constructor(private statusCode : number = 400) {
        super('Credenciais inválidas')
    }

}