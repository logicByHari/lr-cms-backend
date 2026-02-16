import dbConfig from '@/config/db-config.js'
import type { Config } from 'drizzle-kit'

export default {
  schema: ['./src/modules/**/schema/*.ts'],
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // url: dbConfig.DATABASE_MIGRATE_URL,
    // url: process.env.DATABASE_MIGRATE_URL!,
    url: 'postgresql://neondb_owner:npg_uQHf8F4CiSmA@ep-quiet-scene-aiim8b1o.c-4.us-east-1.aws.neon.tech/lr-learn-saas?sslmode=require',
  },
} satisfies Config
