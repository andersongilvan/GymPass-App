import { IUsersRepository } from '@modules/user/repository/UsersRepository'
import { User } from '@prisma/client'
import { InvalidCredentialsException } from '@utils/exceptions/InvalidCredentialsException'
import { compare } from 'bcryptjs'


interface AuthenticateUserServiceRequest {
    email: string
    password: string
}


interface AuthenticateUserServiceResponse {
    user: User
}


export class AuthenticateUserService {

    constructor(private usersRepository: IUsersRepository) { }

    async execute({ email, password }: AuthenticateUserServiceRequest): Promise<AuthenticateUserServiceResponse> {

        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsException()
        }

        const doesPasswordMatch = await compare(password, user.password_hash)

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsException()
        }

        return {
            user
        }

    }

}