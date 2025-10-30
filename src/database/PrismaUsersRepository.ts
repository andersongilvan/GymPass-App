import { prisma } from '@lib'
import { RegisterUserRequest } from '@modules/user/dto/RegisterUserRequest'
import { IUsersRepository } from '@modules/user/repository/UsersRepository'
import { User } from '@prisma/client'



export class PrismaUsersRepository implements IUsersRepository {

    async create(data: RegisterUserRequest): Promise<User> {

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password_hash: data.password
            }
        })

        return user

    }

    async findByEmail(email: string): Promise<User | null> {

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return null
        }

        return user

    }

}