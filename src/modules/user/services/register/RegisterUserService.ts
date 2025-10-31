import { IUsersRepository } from '@modules/user/repository/UsersRepository'
import { User } from '@prisma/client'
import { UserAlreadyException } from '@utils/exceptions/EmailAlreadyExistException'
import { hash } from 'bcryptjs'

interface RegisterUserServiceRequest {
    name: string
    email: string
    password: string
}

interface RegisterUserServiceResponse {
    user: User
}

export class RegisterUsersService {

    constructor(private usersRepository: IUsersRepository) { }

    async execute({ name, email, password }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {

        const userWithDuplicateEmail = await this.usersRepository.findByEmail(email)

        if (userWithDuplicateEmail) {
            throw new UserAlreadyException()
        }

        const passwordHash = await hash(password, 6)

        password = passwordHash

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash: password
        })

        return {
            user
        }

    }

}