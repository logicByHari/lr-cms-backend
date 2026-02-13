import z from 'zod'

enum INODE_ENV {
  'DEVELOPMENT',
  'PRODUCTION',
  'TEST',
}
const configSchema = z.object({
  NODE_ENV: z.enum(INODE_ENV).default(0),
  PORT: z.number().nonnegative(),
  CORS_ORIGIN: z.array(z.string()),
})

type IAppConfig = z.infer<typeof configSchema>

type IEnvConfig = {
  [K in keyof IAppConfig]: IAppConfig[K] | undefined | string
}

const envConfig: IEnvConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
}

const config = (): IAppConfig => {
  const validateEnv = configSchema.safeParse(envConfig)
  if (!validateEnv.success) {
    throw new Error('Error parsing Env. :', validateEnv.error)
  }

  return validateEnv.data
}

export default config()
