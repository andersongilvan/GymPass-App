import { IUsersRepository } from '@modules/user/repository/UsersRepository'
import { User } from '@prisma/client'
import { ResourseNotException } from '@utils/exceptions/ResourseNorFoundExceptions'

interface GetUserProfileServiceRequest {
   userId : string
}

interface GetUserProfileServiceResponse {
    user: User
}

export class GetUserProfileService {

    constructor(private usersRepository: IUsersRepository) {}

    async execute({ userId } : GetUserProfileServiceRequest) : Promise<GetUserProfileServiceResponse> {

        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new ResourseNotException('Usuário não encontrado')
        }

        return {
            user
        }

    }

}