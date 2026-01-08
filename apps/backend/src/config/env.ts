import { createEnv } from '@cf-starter/env'
import { z } from 'zod'

export const envValidator = createEnv({
  server: {
    ENVIRONMENT: z.enum(['development', 'production', 'test']).default('development'),
    JWT_SECRET: z.string().min(32),
  },
})

export const getEnv = (bindings: Record<string, unknown>) => {
  return envValidator.validate(bindings)
}

export type Env = ReturnType<typeof getEnv>
