import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Login } from '../pages/Login'
import { Transactions } from '../pages/Transactions'
import { RedirectIfAuthenticated } from './RedirectIfAuthenticated'
import { RequireAuth } from './RequireAuth'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Transactions />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
