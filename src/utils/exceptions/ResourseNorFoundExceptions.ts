export class ResourseNotException extends Error {

    constructor(readonly message : string, readonly statusCode : number = 400) {
        super(message)
    }

}