import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import config from '@/config/env.js'
import helmet from 'helmet'

/* Import all modules */
import '$/index.js'

const app = express()

/* Security Middleware */
app.use(helmet())
app.use(cors({ origin: config.CORS_ORIGIN }))

/* Body Parsing */
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

/* Health check endpoint */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

/* Build route and middleware */

export default app
