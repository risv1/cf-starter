import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'

export function Navbar() {
  const { user, isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div
        className="
        bg-neutral-100/80 dark:bg-neutral-900/80
        backdrop-blur-lg
        border border-neutral-200 dark:border-neutral-800
        rounded-2xl px-6 py-3
        flex items-center justify-between
      "
      >
        <Link to="/" className="font-bold text-lg text-neutral-950 dark:text-neutral-100">
          CF Starter
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-neutral-950 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">{user?.name}</span>
            </>
          ) : (
            <Link
              to="/auth"
              className="text-neutral-950 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
            >
              Sign In
            </Link>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-neutral-950 dark:text-neutral-100"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
