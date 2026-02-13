import dbConfig from '@/config/db-config.js'
import { drizzle } from 'drizzle-orm/node-postgres'
const db = drizzle(dbConfig.DATABASE_URL)
