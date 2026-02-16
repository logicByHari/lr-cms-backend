import express from 'express'
import cors from 'cors'
import appConfig from '@/config/env-config.js'
import helmet from 'helmet'
import { globalErrorHandler } from './errors/globalErrorHandler.js'
import { bindControllers } from './decorators/index.js'
import { UserController } from './modules/user/user.controller.js'

const app = express()

/* Security Middleware */
app.use(helmet())
app.use(cors({ origin: appConfig.CORS_ORIGIN }))

/* Body Parsing */
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

/* Health check endpoint */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

/* Bind Route */
bindControllers(app, [UserController])

/* Error Handling */
app.use(globalErrorHandler)

export default app
