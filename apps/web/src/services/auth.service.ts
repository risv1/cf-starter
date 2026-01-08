import { API } from '../utils/api'

export interface SignUpInput {
  name: string
  email: string
  password: string
}

export interface SignInInput {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt?: string
}

export async function signUp(data: SignUpInput): Promise<User> {
  const response = await fetch(API.BASE_URL() + API.AUTH.BASE_URL() + API.AUTH.SIGN_UP(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || error.message || 'Sign up failed')
  }

  const result = await response.json()
  return result.user
}

export async function signIn(data: SignInInput): Promise<User> {
  const response = await fetch(API.BASE_URL() + API.AUTH.BASE_URL() + API.AUTH.SIGN_IN(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || error.message || 'Sign in failed')
  }

  const result = await response.json()
  return result.user
}

export async function getSession(): Promise<User> {
  const response = await fetch(API.BASE_URL() + API.AUTH.BASE_URL() + API.AUTH.SESSION(), {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Not authenticated')
  }

  const result = await response.json()
  return result.user
}

export async function logout(): Promise<void> {
  const response = await fetch(API.BASE_URL() + API.AUTH.BASE_URL() + API.AUTH.LOGOUT(), {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || error.message || 'Logout failed')
  }
}
