import { config } from 'dotenv'
import z from 'zod'

config()

enum INODE_ENV {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
  TEST = 'TEST',
}
const configSchema = z.object({
  NODE_ENV: z.enum(INODE_ENV).default(INODE_ENV.DEVELOPMENT),
  PORT: z.number().nonnegative(),
  CORS_ORIGIN: z.array(z.string()),
})

type IAppConfig = z.infer<typeof configSchema>

type IEnvConfig = {
  [K in keyof IAppConfig]: IAppConfig[K] | undefined | string
}

const envConfig: IEnvConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT ?? ''),
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(','),
}

const appConfig = (): IAppConfig => {
  const validateEnv = configSchema.safeParse(envConfig)

  if (!validateEnv.success) {
    throw new Error(`Error parsing Env. : ${validateEnv.error.issues[0].message}`)
  }

  return validateEnv.data
}

export default appConfig()
