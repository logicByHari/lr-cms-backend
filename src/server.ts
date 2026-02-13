import app from './app.js'
import config from '@/config/env.js'

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  process.exit(0)
})

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION 💥', err)
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION 💥', err)
  process.exit(1)
})

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`)
})
