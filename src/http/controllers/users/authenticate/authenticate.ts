import { makeAuthenticateUserService } from '@modules/user/services/authenticate/@factories/makeAuthenticateUsersService'
import { Request, Response, NextFunction } from 'express'
import z from 'zod'

export async function authenticate(request: Request, response: Response, next: NextFunction) {

    const { email, password } = request.body

    const authenticateUserSchema = z.object({
        email: z.email({ message: 'O campo e-mail deve ser um email válido' }).min(6, { message: 'O campo e-mail deve conter no mínimo 6 caracteres' }),
        password: z.string({ message: 'Campo obrigatório' }).min(6, { message: 'O campo senha deve conter no mínimo 6 caracteres' })
    })

    authenticateUserSchema.parse({ email, password })

    try {
        const authenticateUserService = makeAuthenticateUserService()

        const result = await authenticateUserService.execute({ email, password })

        return response.status(200).json(result)

    } catch (error) {
        next(error)
    }

}