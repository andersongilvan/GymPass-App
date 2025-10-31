import { PrismaUsersRepository } from '@database/PrismaUsersRepository'
import { AuthenticateUserService } from '../AuthenticateService'


export function makeAuthenticateUserService() {

    const postgresRepository = new PrismaUsersRepository()

    const authenticateUserService = new AuthenticateUserService(postgresRepository)

    return authenticateUserService

}