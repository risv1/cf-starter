import { MdHome, MdLogout, MdSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function Sidebar() {
  const { logout, isLoggingOut } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
      <div className="p-6">
        <h2 className="font-bold text-xl text-neutral-950 dark:text-neutral-100">Dashboard</h2>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-950 dark:text-neutral-100 transition-colors"
            >
              <MdHome size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-950 dark:text-neutral-100 transition-colors"
            >
              <MdSettings size={20} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-white dark:hover:bg-neutral-950 rounded-lg text-neutral-950 dark:text-neutral-100 transition-colors disabled:opacity-50"
        >
          <MdLogout size={20} />
          <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </aside>
  )
}
