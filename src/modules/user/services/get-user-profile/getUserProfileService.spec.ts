import { InMemoryUsersRepository } from '@database/InMemoryUsersRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from './GetUserProfileService'
import { ResourseNotException } from '@utils/exceptions/ResourseNorFoundExceptions'



describe('Get User Profile Service', () => {


    let usersRepository: InMemoryUsersRepository
    let sut: GetUserProfileService

    beforeEach(() => {

        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileService(usersRepository)

    })

    it('Should be alble to get user profile', async () => {

        const userCreated = await usersRepository.create({
            name: 'John Doe',
            email: 'teste@teste',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: userCreated.id
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')

    })

    it('Should not be alble to get user with wrong id', async () => {

        await usersRepository.create({
            name: 'John Doe',
            email: 'teste@teste',
            password_hash: await hash('123456', 6)
        })

        await expect(() =>
            sut.execute({
                userId: 'invalid-id'
            })
        ).rejects.toBeInstanceOf(ResourseNotException)

    })

})