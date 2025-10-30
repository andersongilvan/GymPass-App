import z from 'zod'
import { RegisterUserRequest } from '../dto/RegisterUserRequest'


export class UserMapper {

    static toUserRequest(boby: unknown): RegisterUserRequest {

        const createUserSchema = z.object({
            name: z.string({ message: 'Campo obrigatório' }).min(6, { message: 'O campo nome deve conter no mínimo 6 caracteres' }),
            email: z.email({ message: 'O campo e-mail deve ser um email válido' }).min(6, { message: 'O campo e-mail deve conter no mínimo 6 caracteres' }),
            password: z.string({ message: 'Campo obrigatório' }).min(6, { message: 'O campo senha deve conter no mínimo 6 caracteres' }),
        })

        const user = createUserSchema.parse(boby)

        return {
            name: user.name,
            email: user.email,
            password: user.password,
        }
    }
}