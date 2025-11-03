import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterCheckInsService } from './RegisterCheckInService'
import { InMemoryCheckInsRepository } from '@database/in-memory/InMemoryCheckInsRepository'


describe('CheckIn Service', () => {

    let checkInRepository : InMemoryCheckInsRepository
    let sut : RegisterCheckInsService

    beforeEach(() => {

       checkInRepository = new InMemoryCheckInsRepository()
       sut = new RegisterCheckInsService(checkInRepository)

    })

    it('The users password must be alble to check in', async () => {

        const { checkIn } = await sut.execute({
            gymId : 'gym-01',
            userId : 'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    

})