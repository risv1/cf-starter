import { AuthForm } from '../components/auth/AuthForm'
import { InfoCard } from '../components/auth/InfoCard'

export function Auth() {
  return (
    <div className="flex h-screen">
      <InfoCard />
      <AuthForm />
    </div>
  )
}
