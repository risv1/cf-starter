import { eq } from 'drizzle-orm'
import type { DbInstance } from '../db'
import { type User, users } from '../schema/users'

export interface CreateUserInput {
  email: string
  name: string
  password: string
}

export interface UpdateUserInput {
  name?: string
  email?: string
  password?: string
}

export async function createUser(db: DbInstance, data: CreateUserInput): Promise<User> {
  const [user] = await db
    .insert(users)
    .values({
      email: data.email,
      name: data.name,
      password: data.password,
    })
    .returning()

  if (!user) {
    throw new Error('Failed to create user')
  }

  return user
}

export async function findUserByEmail(db: DbInstance, email: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)

  return user || null
}

export async function findUserById(db: DbInstance, id: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1)

  return user || null
}

export async function updateUser(db: DbInstance, id: string, data: UpdateUserInput): Promise<User> {
  const [user] = await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning()

  if (!user) {
    throw new Error('Failed to update user')
  }

  return user
}

export async function softDeleteUser(db: DbInstance, id: string): Promise<User> {
  const [user] = await db
    .update(users)
    .set({ deletedAt: new Date() })
    .where(eq(users.id, id))
    .returning()

  if (!user) {
    throw new Error('Failed to delete user')
  }

  return user
}

export async function hardDeleteUser(db: DbInstance, id: string): Promise<User> {
  const [user] = await db.delete(users).where(eq(users.id, id)).returning()

  if (!user) {
    throw new Error('Failed to delete user')
  }

  return user
}

export async function userExistsByEmail(db: DbInstance, email: string): Promise<boolean> {
  const [result] = await db.select().from(users).where(eq(users.email, email)).limit(1)

  return !!result
}
