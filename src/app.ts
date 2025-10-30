import { exceptionHandle } from '@utils/exceptions/exceptionHandle'
import express from 'express'

const app = express()

app.use(express.json())

app.use(exceptionHandle)

export { app }
