import { Request, Response, NextFunction } from 'express'
import { UserAlreadyException } from './EmailAlreadyExistException'
import { ZodError } from 'zod'

export function exceptionHandle(error: Error, _request: Request, response: Response, _next: NextFunction) {
    if (error instanceof UserAlreadyException) {

        return response.status(error.statusCode).json({ message: error.message })

    }

    if (error instanceof ZodError) {
        return response.status(400).json(error)
    }


    return response.status(500).json({ validationError: error })
}