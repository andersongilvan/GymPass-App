import { makeRegisterService } from '@modules/user/services/register/@factories/makeRegisterUsersService'
import { Request, Response, NextFunction } from 'express'
import z from 'zod'

export async function register(request: Request, response: Response, next: NextFunction) {

    const { name, email, password } = request.body


    const createUserSchema = z.object({
        name: z.string({ message: 'Campo nome obrigatório' }).min(6, { message: 'O campo nome deve conter no mínimo 6 caracteres' }),
        email: z.email({ message: 'O campo e-mail deve ser um email válido' }).min(6, { message: 'O campo e-mail deve conter no mínimo 6 caracteres' }),
        password: z.string({ message: 'Campo obrigatório' }).min(6, { message: 'O campo senha deve conter no mínimo 6 caracteres' }),
    })

    createUserSchema.parse({ name, email, password })

    try {
        const registerUsersService = makeRegisterService()

        const result = await registerUsersService.execute({ name, email, password })

        return response.status(201).json(result)

    } catch (error) {
        next(error)
    }

}
