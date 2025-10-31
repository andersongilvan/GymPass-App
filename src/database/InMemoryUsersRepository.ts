
import { IUsersRepository } from '@modules/user/repository/UsersRepository'
import { Prisma, User } from '@prisma/client'


export class InMemoryUsersRepository implements IUsersRepository {

    private users: User[] = []

    async create({ name, email, password_hash }: Prisma.UserCreateInput): Promise<User> {
        const user: User = {
            id: 'user-1',
            name,
            email,
            password_hash,
            created_at: new Date()
        }

        this.users.push(user)

        return user
    }

    async findByEmail(email: string): Promise<User | null> {

        const user = this.users.find((user) => user.email === email)

        if (!user) {
            return null
        }

        return user

    }

}