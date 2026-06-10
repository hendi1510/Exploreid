import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
