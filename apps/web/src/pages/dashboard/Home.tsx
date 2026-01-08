import { useAuth } from '../../hooks/useAuth'

export function DashboardHome() {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-neutral-950 dark:text-neutral-100">
        Welcome back, {user?.name}!
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400">Your dashboard is ready.</p>
    </div>
  )
}
