import { InMemoryUsersRepository } from '@database/InMemoryUsersRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUserService } from './AuthenticateService'
import { hash } from 'bcryptjs'
import { InvalidCredentialsException } from '@utils/exceptions/InvalidCredentialsException'

describe('Authenticate Service', () => {


    let usersRepository: InMemoryUsersRepository
    let sut: AuthenticateUserService

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUserService(usersRepository)
    })

    it('Should be alble to register', async () => {

        await usersRepository.create({
            name: 'John Doe',
            email: 'teste@teste',
            password: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'teste@teste',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))

    })

    it('Should not authenticate with the wrong email', async () => {

        await expect(() =>
            sut.execute({
                email: 'teste@teste',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsException)
    })

    it('Should not authenticate with the wrong password', async () => {


         await usersRepository.create({
            name: 'John Doe',
            email: 'teste@teste',
            password: await hash('123456', 6)
        })

        await expect(() =>
            sut.execute({
                email: 'teste@teste',
                password: 'password-error'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsException)
    })

})