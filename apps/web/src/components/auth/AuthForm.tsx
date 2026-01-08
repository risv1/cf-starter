import type React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { signInSchema, signUpSchema } from '../../validators/auth.validators'
import { Button } from '../common/Button'
import { Input } from '../common/Input'

export function AuthForm() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { signIn, signUp, isSigningIn, isSigningUp } = useAuth()
  const navigate = useNavigate()

  const validateField = (name: string, value: string, updatedFormData?: typeof formData) => {
    const dataToValidate = updatedFormData || formData

    try {
      if (mode === 'signin') {
        if (name === 'email') {
          signInSchema.shape.email.parse(value)
        } else if (name === 'password') {
          signInSchema.shape.password.parse(value)
        }
      } else {
        if (name === 'name') {
          signUpSchema.shape.name.parse(value)
        } else if (name === 'email') {
          signUpSchema.shape.email.parse(value)
        } else if (name === 'password') {
          signUpSchema.shape.password.parse(value)
        } else if (name === 'confirmPassword') {
          signUpSchema.parse(dataToValidate)
        }
      }
      setErrors((prev) => ({ ...prev, [name]: '' }))
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      const issues = (error && (error.issues ?? error.errors)) as
        | Array<{ path?: (string | number)[]; message?: string }>
        | undefined
      if (issues && issues.length > 0) {
        const errorMessage = issues[0]?.message
        setErrors((prev) => ({ ...prev, [name]: errorMessage || '' }))
      }
    }
  }

  const validateAllFields = () => {
    const schema = mode === 'signin' ? signInSchema : signUpSchema
    const result = schema.safeParse(formData)

    if (!result.success) {
      const newErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string
        if (!newErrors[field]) {
          newErrors[field] = issue.message || ''
        }
      }
      setErrors(newErrors)
      return false
    }

    setErrors({})
    return true
  }

  const isFormValid = () => {
    const schema = mode === 'signin' ? signInSchema : signUpSchema
    const result = schema.safeParse(formData)
    return result.success
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedFormData = { ...formData, [name]: value }
    setFormData(updatedFormData)
    validateField(name, value, updatedFormData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAllFields()) {
      return
    }

    try {
      if (mode === 'signin') {
        await signIn({ email: formData.email, password: formData.password })
      } else {
        await signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      }
      navigate('/dashboard')
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      setErrors({ form: error.message || 'Authentication failed' })
    }
  }

  return (
    <div className="flex-1 h-screen flex items-center justify-center p-12 bg-white dark:bg-neutral-950">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-neutral-950 dark:text-neutral-100">
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          {mode === 'signup' && (
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
          )}

          {errors.form && <div className="text-sm text-red-500">{errors.form}</div>}

          <Button
            type="submit"
            loading={mode === 'signin' ? isSigningIn : isSigningUp}
            disabled={!isFormValid()}
            className="w-full"
          >
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin')
              setErrors({})
            }}
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline"
          >
            {mode === 'signin'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}
