import type { Context } from 'hono'
import { deleteCookie, setCookie } from 'hono/cookie'
import {
  createUser,
  findUserByEmail,
  userExistsByEmail,
} from '../../database/repositories/user.repository'
import { hashPassword, verifyPassword } from '../../utils/hash.utils'
import { generateToken } from '../../utils/jwt.utils'
import { getError } from '../constants/errors'
import { signInSchema, signUpSchema } from '../validators/auth.validators'

export async function signUp(c: Context) {
  try {
    const body = await c.req.json()
    const validationResult = signUpSchema.safeParse(body)

    if (!validationResult.success) {
      return c.json(getError(400, validationResult.error.issues[0]?.message), 400)
    }

    const { name, email, password } = validationResult.data
    const db = c.get('db')

    const exists = await userExistsByEmail(db, email)
    if (exists) {
      return c.json(getError(409, 'User with this email already exists'), 409)
    }

    const hashedPassword = await hashPassword(password)

    const user = await createUser(db, {
      name,
      email,
      password: hashedPassword,
    })

    const token = generateToken(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      c.env.JWT_SECRET,
    )

    setCookie(c, 'auth_token', token, {
      httpOnly: true,
      secure: c.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return c.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
        },
      },
      201,
    )
  } catch (error) {
    console.error('Sign up error:', error)
    return c.json(getError(500, 'Failed to create user'), 500)
  }
}

export async function signIn(c: Context) {
  try {
    const body = await c.req.json()
    const validationResult = signInSchema.safeParse(body)

    if (!validationResult.success) {
      return c.json(getError(400, validationResult.error.issues[0]?.message), 400)
    }

    const { email, password } = validationResult.data
    const db = c.get('db')
    const user = await findUserByEmail(db, email)

    if (!user) {
      return c.json(getError(401, 'Invalid email or password'), 401)
    }

    const isValidPassword = await verifyPassword(password, user.password)

    if (!isValidPassword) {
      return c.json(getError(401, 'Invalid email or password'), 401)
    }

    const token = generateToken(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      c.env.JWT_SECRET,
    )

    setCookie(c, 'auth_token', token, {
      httpOnly: true,
      secure: c.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error('Sign in error:', error)
    return c.json(getError(500, 'Failed to sign in'), 500)
  }
}

export async function session(c: Context) {
  try {
    const user = c.get('user')

    if (!user) {
      return c.json(getError(401, 'Not authenticated'), 401)
    }

    return c.json({ user })
  } catch (error) {
    console.error('Session error:', error)
    return c.json(getError(500, 'Failed to get session'), 500)
  }
}

export async function logout(c: Context) {
  try {
    deleteCookie(c, 'auth_token', {
      path: '/',
    })

    return c.json({
      message: 'Logged out successfully',
    })
  } catch (error) {
    console.error('Logout error:', error)
    return c.json(getError(500, 'Failed to logout'), 500)
  }
}
