import { prisma } from '@lib'
import { IUsersRepository } from '@modules/user/repository/UsersRepository'
import { Prisma, User } from '@prisma/client'



export class PrismaUsersRepository implements IUsersRepository {
    async create({ name, email, password_hash }: Prisma.UserCreateInput): Promise<User> {

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password_hash
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