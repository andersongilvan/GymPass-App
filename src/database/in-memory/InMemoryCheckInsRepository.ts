import { CheckInRepository } from '@modules/check-in/repository/CheckInRepository'
import { Prisma, CheckIn } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInRepository {

    private checkIns: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {

        const checkIn: CheckIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        }

        this.checkIns.push(checkIn)

        return checkIn

    }



}