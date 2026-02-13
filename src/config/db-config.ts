import { config } from 'dotenv'
import z from 'zod'
config()

const configSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_MIGRATE_URL: z.string(),
})

type IAppConfig = z.infer<typeof configSchema>

type IEnvConfig = {
  [K in keyof IAppConfig]: IAppConfig[K] | undefined | string
}

const dbEnvConfig: IEnvConfig = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_MIGRATE_URL: process.env.DATABASE_MIGRATE_URL,
}

const dbConfig = (): IAppConfig => {
  const validateEnv = configSchema.safeParse(dbEnvConfig)

  if (!validateEnv.success) {
    throw new Error(`Error parsing Env. : ${validateEnv.error.issues[0].message}`)
  }

  return validateEnv.data
}

export default dbConfig()
