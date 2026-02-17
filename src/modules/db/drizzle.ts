import dbConfig from '@/config/db-config.js'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: dbConfig.DATABASE_URL,
  connectionTimeoutMillis: 60000,
  max: 20,
  idleTimeoutMillis: 30000,
  allowExitOnIdle: false,
})

pool
  .connect()
  .then((client) => {
    console.log('✅ Database connection successful')
    client.release()
  })
  .catch((err) => {
    console.log('connection url :', dbConfig.DATABASE_URL)
    console.error('❌ Database connection failed:', err.message)
  })

const db = drizzle(pool)

export default db
