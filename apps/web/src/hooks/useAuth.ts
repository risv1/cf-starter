import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as authService from '../services/auth.service'
import type { SignInInput, SignUpInput, User } from '../services/auth.service'

export function useAuth() {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['session'],
    queryFn: authService.getSession,
    retry: false,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpInput) => authService.signUp(data),
    onSuccess: (data: User) => {
      queryClient.setQueryData(['session'], data)
    },
  })

  const signInMutation = useMutation({
    mutationFn: (data: SignInInput) => authService.signIn(data),
    onSuccess: (data: User) => {
      queryClient.setQueryData(['session'], data)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['session'], null)
      queryClient.clear()
    },
  })

  return {
    user,
    isLoading,
    isError,
    isAuthenticated: !!user && !isError,

    signUp: signUpMutation.mutateAsync,
    signIn: signInMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,

    isSigningUp: signUpMutation.isPending,
    isSigningIn: signInMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    signUpError: signUpMutation.error,
    signInError: signInMutation.error,
    logoutError: logoutMutation.error,
  }
}
