import { authenticate } from '@http/controllers/users/authenticate/authenticate'
import { register } from '@http/controllers/users/register/register'
import { Router } from 'express'


const usersRoutes = Router()

usersRoutes.post('/', register)
usersRoutes.post('/session', authenticate)

export { usersRoutes }