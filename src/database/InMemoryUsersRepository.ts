import { RegisterUserRequest } from '@modules/user/dto/RegisterUserRequest'
import { IUsersRepository } from '@modules/user/repository/UsersRepository'
import { User } from '@prisma/client'


export class InMemoryUsersRepository implements IUsersRepository {

    private users: User[] = []

    async create(data: RegisterUserRequest): Promise<User> {
        const user : User = {
            id : 'user-1',
            name : data.name,
            email : data.email,
            password_hash : data.password,
            created_at : new Date()
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