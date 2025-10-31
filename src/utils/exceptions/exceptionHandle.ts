import { Request, Response, NextFunction } from 'express'
import { UserAlreadyException } from './EmailAlreadyExistException'
import { ZodError } from 'zod'


export function exceptionHandle(error: Error, _request: Request, response: Response, _next: NextFunction) {
    if (error instanceof UserAlreadyException) {

        return response.status(error.statusCode).json({ message: error.message })

    }

    if (error instanceof ZodError) {

        const errors = error._zod.def.map((e) => {
            return {
                fields: e.path.join(),
                message: e.message
            }

        })

        return response.status(400).json(errors)

    }

}