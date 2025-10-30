import { PrismaUsersRepository } from '@database/PrismaUsersRepository'
import { RegisterUsersService } from '../RegisterUserService'

export function makeRegisterService() {

    const postgresRepository = new PrismaUsersRepository()

    const registerUserService = new RegisterUsersService(postgresRepository)

    return registerUserService

}