import { Outlet } from 'react-router-dom'
import { Footer } from '../components/common/Footer'
import { Navbar } from '../components/common/Navbar'

export function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-950 dark:text-neutral-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
