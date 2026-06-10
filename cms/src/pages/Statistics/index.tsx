import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Users, MapPin, BookOpen, TrendingUp, Eye } from 'lucide-react'

const monthlyVisitors = [
  { month: 'Jan', pengunjung: 3200, reservasi: 180 },
  { month: 'Feb', pengunjung: 2900, reservasi: 155 },
  { month: 'Mar', pengunjung: 4100, reservasi: 230 },
  { month: 'Apr', pengunjung: 4800, reservasi: 290 },
  { month: 'Mei', pengunjung: 5200, reservasi: 320 },
  { month: 'Jun', pengunjung: 6400, reservasi: 410 },
  { month: 'Jul', pengunjung: 7100, reservasi: 480 },
  { month: 'Agt', pengunjung: 8200, reservasi: 540 },
  { month: 'Sep', pengunjung: 6800, reservasi: 430 },
  { month: 'Okt', pengunjung: 5900, reservasi: 380 },
  { month: 'Nov', pengunjung: 4700, reservasi: 295 },
  { month: 'Des', pengunjung: 5500, reservasi: 355 },
]

const topDestinations = [
  { name: 'Pantai Kuta',            pengunjung: 12400 },
  { name: 'Candi Borobudur',        pengunjung: 9800  },
  { name: 'Gunung Bromo',           pengunjung: 7800  },
  { name: 'Taman Komodo',           pengunjung: 6200  },
  { name: 'Danau Toba',             pengunjung: 5200  },
  { name: 'Raja Ampat',             pengunjung: 3500  },
]

const categoryStats = [
  { name: 'Alam',    persen: 35 },
  { name: 'Pantai',  persen: 28 },
  { name: 'Sejarah', persen: 16 },
  { name: 'Budaya',  persen: 12 },
  { name: 'Lainnya', persen: 9  },
]

const kpiCards = [
  { label: 'Total Pengunjung 2024', value: '64,800', delta: '+24%', icon: Users,    color: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
  { label: 'Destinasi Aktif',       value: '72',     delta: '+3',   icon: MapPin,   color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  { label: 'Total Reservasi',       value: '3,867',  delta: '+18%', icon: BookOpen, color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
  { label: 'Rata-rata/Bulan',       value: '5,400',  delta: '+8%',  icon: TrendingUp,color:'#f59e0b', bg: 'rgba(245,158,11,0.15)' },
]

const tooltipStyle = {
  contentStyle: {
    background: '#1e2535',
    border: '1px solid #2a3349',
    borderRadius: 8,
    color: '#f1f5f9',
    fontSize: '0.82rem',
  },
  labelStyle: { color: '#94a3b8', marginBottom: 4 },
}

export default function Statistics() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Statistik Pengunjung</h1>
          <p className="page-subtitle">Data analitik pengunjung wisata tahun 2024</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        {kpiCards.map(k => {
          const Icon = k.icon
          return (
            <div className="stat-card" key={k.label}>
              <div className="stat-icon" style={{ background: k.bg }}>
                <Icon size={22} color={k.color} />
              </div>
              <div>
                <div className="stat-value">{k.value}</div>
                <div className="stat-label">{k.label}</div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>
                ↑ {k.delta}
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row 1 */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div className="chart-card">
          <div className="chart-title">📈 Tren Pengunjung & Reservasi Bulanan (2024)</div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyVisitors} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3349" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '0.8rem', color: '#94a3b8' }} />
              <Line
                type="monotone" dataKey="pengunjung" name="Pengunjung"
                stroke="#6366f1" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }}
              />
              <Line
                type="monotone" dataKey="reservasi" name="Reservasi"
                stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-grid">
        {/* Top Destinations Bar */}
        <div className="chart-card">
          <div className="chart-title">🏆 Top 6 Destinasi by Pengunjung</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topDestinations} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3349" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="pengunjung" name="Pengunjung" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="chart-card">
          <div className="chart-title">📊 Distribusi Pengunjung per Kategori</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryStats} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3349" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis unit="%" tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`${v}%`, 'Persentase']} />
              <Bar dataKey="persen" name="Persentase" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Top Detail */}
      <div className="chart-card mt-6">
        <div className="chart-title flex items-center gap-2">
          <Eye size={16} /> Rincian Top Destinasi
        </div>
        <div className="table-wrapper mt-4" style={{ border: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Destinasi</th>
                <th>Pengunjung</th>
                <th>Kontribusi</th>
              </tr>
            </thead>
            <tbody>
              {topDestinations.map((d, i) => {
                const total = topDestinations.reduce((s, x) => s + x.pengunjung, 0)
                const pct = ((d.pengunjung / total) * 100).toFixed(1)
                return (
                  <tr key={d.name}>
                    <td>
                      <div style={{
                        width: 26, height: 26, borderRadius: '50%',
                        background: i < 3 ? 'var(--accent-light)' : 'var(--bg-secondary)',
                        color: i < 3 ? 'var(--accent)' : 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '0.8rem',
                      }}>{i + 1}</div>
                    </td>
                    <td className="font-medium">{d.name}</td>
                    <td>{d.pengunjung.toLocaleString('id-ID')}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div style={{
                          height: 6, width: `${pct}%`, maxWidth: 120,
                          background: 'var(--accent)', borderRadius: 999, minWidth: 8,
                        }} />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{pct}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
