import type { D1Database, R2Bucket } from '@cloudflare/workers-types'

export type Bindings = {
  DB: D1Database
  R2: R2Bucket
  JWT_SECRET: string
  ENVIRONMENT: string
}
