import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import { HomeLayout } from './layouts/HomeLayout'
import { Auth } from './pages/Auth'
import { GlobalError } from './pages/GlobalError'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { DashboardHome } from './pages/dashboard/Home'

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalError>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </GlobalError>
    </BrowserRouter>
  )
}

export default Router
