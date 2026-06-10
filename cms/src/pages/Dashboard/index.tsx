import { Users, MapPin, Tag, BookOpen, BarChart2, TrendingUp, Star, FileText, BarChart, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { label: 'Total Pengguna',    value: '1,248', icon: Users,       color: '#6366f1', bg: 'rgba(99,102,241,0.15)',  delta: '+12%' },
  { label: 'Destinasi Wisata',  value: '84',    icon: MapPin,      color: '#10b981', bg: 'rgba(16,185,129,0.15)',  delta: '+3%'  },
  { label: 'Total Reservasi',   value: '3,527', icon: BookOpen,    color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', delta: '+8%'  },
  { label: 'Pendapatan Tiket',  value: 'Rp 218Jt', icon: DollarSign,color:'#f59e0b', bg: 'rgba(245,158,11,0.15)', delta: '+15%' },
]

const quickLinks = [
  { to: '/users',        label: 'Kelola User',        icon: Users,    desc: 'Tambah, edit, hapus pengguna' },
  { to: '/destinations', label: 'Kelola Destinasi',   icon: MapPin,   desc: 'Manajemen destinasi wisata' },
  { to: '/categories',   label: 'Kelola Kategori',    icon: Tag,      desc: 'Atur kategori wisata' },
  { to: '/reservations', label: 'Kelola Reservasi',   icon: BookOpen, desc: 'Daftar dan verifikasi reservasi' },
  { to: '/statistics',   label: 'Statistik',          icon: BarChart2,desc: 'Analitik dan tren pengunjung' },
  { to: '/reviews',      label: 'Kelola Review',      icon: Star,     desc: 'Approve dan hapus ulasan' },
  { to: '/content',      label: 'Kelola Konten',      icon: FileText, desc: 'Banner, event, berita, FAQ' },
  { to: '/reports',      label: 'Laporan & Export',   icon: BarChart, desc: 'Export PDF & Excel' },
]

export default function Dashboard() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Selamat datang kembali, Administrator!</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon" style={{ background: s.bg }}>
                <Icon size={22} color={s.color} />
              </div>
              <div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: s.delta.startsWith('+') ? 'var(--success)' : 'var(--text-muted)' }}>
                <TrendingUp size={12} style={{ marginRight: 2, display: 'inline' }} />
                {s.delta}
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Links */}
      <div className="card">
        <div className="chart-title">Akses Cepat</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem' }}>
          {quickLinks.map(({ to, label, icon: Icon, desc }) => (
            <Link
              to={to}
              key={to}
              style={{
                display: 'flex', flexDirection: 'column', gap: '0.5rem',
                padding: '1rem', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                background: 'var(--bg-secondary)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--accent)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--border)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color="var(--accent)" />
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
