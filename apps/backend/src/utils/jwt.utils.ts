import jwt, { type SignOptions } from 'jsonwebtoken'

export interface JWTPayload {
  userId: string
  email: string
  name: string
}

export function generateToken(
  payload: JWTPayload,
  secret: string,
  expiresIn: SignOptions['expiresIn'] = '7d',
): string {
  return jwt.sign(payload, secret, {
    expiresIn,
    algorithm: 'HS256',
  })
}

export function verifyToken(token: string, secret: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: ['HS256'],
    }) as JWTPayload

    return decoded
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.decode(token) as JWTPayload
    return decoded
  } catch (error) {
    console.error('JWT decode failed:', error)
    return null
  }
}
