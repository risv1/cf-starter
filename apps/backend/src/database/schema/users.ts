import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { ulid } from 'ulid'
import { ulidType } from '../types'

export const users = sqliteTable('users', {
  id: ulidType('id')
    .primaryKey()
    .$defaultFn(() => ulid()),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date()),
  deletedAt: integer('deletedAt', { mode: 'timestamp' }),
})

export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
