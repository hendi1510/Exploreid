import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Destinations from './pages/Destinations'
import Categories from './pages/Categories'
import Reservations from './pages/Reservations'
import Statistics from './pages/Statistics'
import Reviews from './pages/Reviews'
import Content from './pages/Content'
import Reports from './pages/Reports'
import Login from './pages/Login'

export default function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {isAuthenticated ? (
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="categories" element={<Categories />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="content" element={<Content />} />
            <Route path="reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}
