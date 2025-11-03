import { CheckInRepository } from '@modules/check-in/repository/CheckInRepository'
import { CheckIn } from '@prisma/client'

interface RegisterCheckInServiceRequest {
    userId: string
    gymId: string
}

interface RegisterCheckInServiceResponse {
    checkIn: CheckIn
}

export class RegisterCheckInsService {

    constructor(private checkInRepository: CheckInRepository) { }

    async execute({ userId, gymId }: RegisterCheckInServiceRequest): Promise<RegisterCheckInServiceResponse> {

        const checkIn = await this.checkInRepository.create({     
            gym_id: gymId,
            user_id: userId
        })

        return {
            checkIn
        }

    }

}