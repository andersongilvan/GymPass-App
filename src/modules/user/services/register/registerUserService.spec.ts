import { InMemoryUsersRepository } from '@database/InMemoryUsersRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUsersService } from './RegisterUserService'
import { compare } from 'bcryptjs'
import { UserAlreadyException } from '@utils/exceptions/EmailAlreadyExistException'

describe('Register Service', () => {

    let inMemoryUsersRepository: InMemoryUsersRepository
    let sut: RegisterUsersService

    beforeEach(() => {

        inMemoryUsersRepository = new InMemoryUsersRepository()
        sut = new RegisterUsersService(inMemoryUsersRepository)

    })

    // A senha deve ser hash
    it('The users password must be alble hash when registering', async () => {

        const {user }= await sut.execute({
            name: 'John Doe',
            email: 'teste@teste',
            password: '123456'
        })

        const isPasswordHash = await compare('123456', user.password_hash)

        expect(isPasswordHash).toBe(true)

    })

    it('Should not be alble to register with a duplicate email', async () => {

        const email = 'teste@teste'

        await sut.execute({
            name: 'John Doe',
            email,
            password: '123456'
        })

        await expect(() =>
            sut.execute({
                name: 'John Doe',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyException)

    })

    it('Should be alble register to user', async () => {

        const {user} = await sut.execute({
            name: 'John Doe',
            email: 'teste@teste',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

})