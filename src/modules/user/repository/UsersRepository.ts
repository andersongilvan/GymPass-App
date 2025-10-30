import { User } from '@prisma/client'
import { RegisterUserRequest } from '../dto/RegisterUserRequest'

export interface IUsersRepository {
    create(data : RegisterUserRequest) : Promise<User | null>
    findByEmail(email : string) : Promise<User>
}