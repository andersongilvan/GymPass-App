import { RegisterUserRequest } from '@modules/user/dto/RegisterUserRequest'
import { IUsersRepository } from '@modules/user/repository/UsersRepository'
import { UserAlreadyException } from '@utils/exceptions/EmailAlreadyExistException'
import { hash } from 'bcryptjs'



export class RegisterUsersService {

    constructor(private usersRepository: IUsersRepository) { }

    async execute(registerUserRequest: RegisterUserRequest) {

        const userWithDuplicateEmail = await this.usersRepository.findByEmail(registerUserRequest.email)

        if (userWithDuplicateEmail) {
            throw new UserAlreadyException()
        }

        const passwordHash = await hash(registerUserRequest.password, 6)

        registerUserRequest.password = passwordHash

        const newUser = await this.usersRepository.create(registerUserRequest)

        return newUser

    }

}