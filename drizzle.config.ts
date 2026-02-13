import dbConfig from '@/config/db-config.js'
import type { Config } from 'drizzle-kit'

export default {
  schema: ['./src/modules/**/schema/*.ts'],
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbConfig.DATABASE_MIGRATE_URL,
  },
} satisfies Config
