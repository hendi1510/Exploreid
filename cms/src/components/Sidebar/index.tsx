import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  MapPin,
  Tag,
  BookOpen,
  BarChart2,
  Globe,
  Star,
  FileText,
  BarChart,
  QrCode,
} from 'lucide-react'
import './Sidebar.css'

const mainNav = [
  { to: '/',              icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/users',         icon: Users,           label: 'Kelola User' },
  { to: '/destinations',  icon: MapPin,           label: 'Destinasi Wisata' },
  { to: '/categories',    icon: Tag,             label: 'Kategori Wisata' },
  { to: '/reservations',  icon: BookOpen,        label: 'Kelola Reservasi' },
  { to: '/statistics',    icon: BarChart2,       label: 'Statistik' },
]

const contentNav = [
  { to: '/reviews', icon: Star,     label: 'Kelola Review' },
  { to: '/content', icon: FileText, label: 'Kelola Konten' },
  { to: '/reports', icon: BarChart, label: 'Laporan & Export' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Globe size={22} />
        </div>
        <div>
          <div className="brand-name">ExploreID</div>
          <div className="brand-sub">Admin Panel</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <p className="nav-section-label">Menu Utama</p>
        {mainNav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} className="nav-icon" />
            <span className="nav-label">{label}</span>
          </NavLink>
        ))}
        <p className="nav-section-label" style={{ marginTop: '1rem' }}>Konten & Laporan</p>
        {contentNav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} className="nav-icon" />
            <span className="nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer" style={{ flexDirection: 'column', gap: '0.75rem', height: 'auto', padding: '1rem' }}>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }} onClick={() => alert('Fitur Scan QR Aktif...')}>
          <QrCode size={18} /> Scan QR Ticket
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div className="avatar" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>A</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div className="text-sm font-medium truncate">Administrator</div>
            <div className="text-xs text-muted">admin@exploreid.id</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
