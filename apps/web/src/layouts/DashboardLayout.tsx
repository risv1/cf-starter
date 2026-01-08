import { Navigate, Outlet } from 'react-router-dom'
import { Sidebar } from '../components/dashboard/Sidebar'
import { useAuth } from '../hooks/useAuth'

export function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <div className="text-neutral-950 dark:text-neutral-100">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-neutral-950 text-neutral-950 dark:text-neutral-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}
