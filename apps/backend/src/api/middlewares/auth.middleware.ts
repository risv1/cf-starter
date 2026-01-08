import type { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'
import { findUserById } from '../../database/repositories/user.repository'
import { verifyToken } from '../../utils/jwt.utils'
import { getError } from '../constants/errors'

export async function authMiddleware(c: Context, next: Next) {
  const token = getCookie(c, 'auth_token')

  if (!token) {
    return c.json(getError(401, 'No authentication token provided'), 401)
  }

  const payload = verifyToken(token, c.env.JWT_SECRET)

  if (!payload) {
    return c.json(getError(401, 'Invalid or expired token'), 401)
  }

  const db = c.get('db')

  const user = await findUserById(db, payload.userId)

  if (!user) {
    return c.json(getError(401, 'User not found'), 401)
  }

  c.set('user', {
    id: user.id,
    email: user.email,
    name: user.name,
  })

  await next()
}
