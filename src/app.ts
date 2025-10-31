import 'express-async-errors'
import { routes } from '@http/routes'
import { exceptionHandle } from '@utils/exceptions/exceptionHandle'
import express from 'express'

const app = express()

app.use(express.json())

app.use(routes)

app.use(exceptionHandle)

export { app }
