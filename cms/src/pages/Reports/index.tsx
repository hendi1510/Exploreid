import { useState } from 'react'
import { Download, FileText, TrendingUp, Users, BookOpen, DollarSign, Filter } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from 'recharts'

const monthlyData = [
  { month: 'Jan', reservasi: 180, pendapatan: 9200000,  pengunjung: 3200 },
  { month: 'Feb', reservasi: 155, pendapatan: 7900000,  pengunjung: 2900 },
  { month: 'Mar', reservasi: 230, pendapatan: 12100000, pengunjung: 4100 },
  { month: 'Apr', reservasi: 290, pendapatan: 15400000, pengunjung: 4800 },
  { month: 'Mei', reservasi: 320, pendapatan: 17100000, pengunjung: 5200 },
  { month: 'Jun', reservasi: 410, pendapatan: 22300000, pengunjung: 6400 },
  { month: 'Jul', reservasi: 480, pendapatan: 26500000, pengunjung: 7100 },
  { month: 'Agt', reservasi: 540, pendapatan: 29800000, pengunjung: 8200 },
  { month: 'Sep', reservasi: 430, pendapatan: 23400000, pengunjung: 6800 },
  { month: 'Okt', reservasi: 380, pendapatan: 20100000, pengunjung: 5900 },
  { month: 'Nov', reservasi: 295, pendapatan: 15600000, pengunjung: 4700 },
  { month: 'Des', reservasi: 355, pendapatan: 18900000, pengunjung: 5500 },
]

const reservationRows = [
  { id: 'RES-001', user: 'Budi Santoso',    destination: 'Pantai Kuta',          date: '2024-07-20', total: 50000,  status: 'Selesai' },
  { id: 'RES-002', user: 'Siti Rahayu',     destination: 'Candi Borobudur',      date: '2024-07-22', total: 200000, status: 'Dikonfirmasi' },
  { id: 'RES-003', user: 'Agus Wijaya',     destination: 'Raja Ampat',           date: '2024-07-25', total: 450000, status: 'Menunggu' },
  { id: 'RES-004', user: 'Dewi Lestari',    destination: 'Gunung Bromo',         date: '2024-07-28', total: 250000, status: 'Dikonfirmasi' },
  { id: 'RES-005', user: 'Rizky Pratama',   destination: 'Danau Toba',           date: '2024-08-01', total: 60000,  status: 'Dibatalkan' },
  { id: 'RES-006', user: 'Nina Putri',      destination: 'Taman Nasional Komodo',date: '2024-08-05', total: 900000, status: 'Menunggu' },
  { id: 'RES-007', user: 'Hendra Kurniawan',destination: 'Keraton Yogyakarta',   date: '2024-08-10', total: 45000,  status: 'Dikonfirmasi' },
  { id: 'RES-008', user: 'Lina Anggraini',  destination: 'Pantai Kuta',          date: '2024-08-12', total: 50000,  status: 'Selesai' },
]

const tooltipStyle = {
  contentStyle: { background: '#1e2535', border: '1px solid #2a3349', borderRadius: 8, color: '#f1f5f9', fontSize: '0.82rem' },
  labelStyle: { color: '#94a3b8', marginBottom: 4 },
}

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')
const fmtK = (n: number) => n >= 1_000_000 ? `Rp ${(n / 1_000_000).toFixed(1)}Jt` : fmt(n)

const statusColor: Record<string, string> = {
  'Selesai': 'badge-info', 'Dikonfirmasi': 'badge-success', 'Menunggu': 'badge-warning', 'Dibatalkan': 'badge-danger',
}

export default function Reports() {
  const [period, setPeriod] = useState('all')
  const [chartType, setChartType] = useState<'pendapatan' | 'reservasi' | 'pengunjung'>('pendapatan')

  const totalPendapatan = monthlyData.reduce((s, d) => s + d.pendapatan, 0)
  const totalReservasi  = monthlyData.reduce((s, d) => s + d.reservasi, 0)
  const totalPengunjung = monthlyData.reduce((s, d) => s + d.pengunjung, 0)
  const avgPerBulan     = Math.round(totalPendapatan / 12)

  const kpis = [
    { label: 'Total Pendapatan 2024', value: fmt(totalPendapatan), icon: DollarSign,  color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
    { label: 'Total Reservasi',       value: totalReservasi.toLocaleString('id-ID'),   icon: BookOpen,   color: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
    { label: 'Total Pengunjung',      value: totalPengunjung.toLocaleString('id-ID'),  icon: Users,      color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
    { label: 'Rata-rata/Bulan',       value: fmtK(avgPerBulan),                        icon: TrendingUp, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  ]

  const exportCSV = () => {
    const header = 'ID Reservasi,Pengguna,Destinasi,Tanggal,Total,Status\n'
    const rows = reservationRows.map(r => `${r.id},${r.user},${r.destination},${r.date},${r.total},${r.status}`).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'laporan-reservasi.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const exportPDF = () => window.print()

  const chartColors: Record<typeof chartType, string> = {
    pendapatan: '#10b981', reservasi: '#6366f1', pengunjung: '#3b82f6',
  }
  const chartLabels: Record<typeof chartType, string> = {
    pendapatan: 'Pendapatan (Rp)', reservasi: 'Jumlah Reservasi', pengunjung: 'Jumlah Pengunjung',
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Laporan & Export</h1>
          <p className="page-subtitle">Rangkuman data reservasi, pengunjung, dan pendapatan</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" id="btn-export-pdf" onClick={exportPDF}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileText size={15} /> Export PDF
          </button>
          <button className="btn btn-primary" id="btn-export-excel" onClick={exportCSV}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Download size={15} /> Export Excel
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid" style={{ marginBottom: '1.25rem' }}>
        {kpis.map(k => {
          const Icon = k.icon
          return (
            <div className="stat-card" key={k.label}>
              <div className="stat-icon" style={{ background: k.bg }}>
                <Icon size={22} color={k.color} />
              </div>
              <div>
                <div className="stat-value" style={{ fontSize: '1.1rem' }}>{k.value}</div>
                <div className="stat-label">{k.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart Controls */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div className="chart-title" style={{ margin: 0 }}>📈 Grafik Bulanan 2024</div>
          <div className="flex gap-2">
            {(['pendapatan', 'reservasi', 'pengunjung'] as const).map(type => (
              <button key={type} id={`chart-btn-${type}`} onClick={() => setChartType(type)}
                style={{ padding: '0.3rem 0.75rem', borderRadius: 6, border: `1px solid ${chartType === type ? chartColors[type] : 'var(--border)'}`, background: chartType === type ? chartColors[type] + '22' : 'transparent', color: chartType === type ? chartColors[type] : 'var(--text-secondary)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: chartType === type ? 700 : 400 }}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3349" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => chartType === 'pendapatan' ? fmtK(v) : v.toLocaleString()} />
            <Tooltip {...tooltipStyle} formatter={(v: number) => [chartType === 'pendapatan' ? fmt(v) : v.toLocaleString('id-ID'), chartLabels[chartType]]} />
            <Bar dataKey={chartType} fill={chartColors[chartType]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Line Chart */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div className="chart-title">📊 Tren Reservasi vs Pengunjung</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3349" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '0.8rem', color: '#94a3b8' }} />
            <Line type="monotone" dataKey="reservasi" name="Reservasi" stroke="#6366f1" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="pengunjung" name="Pengunjung" stroke="#10b981" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Reservation Table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="chart-title" style={{ margin: 0 }}>📋 Detail Reservasi Terbaru</div>
          <div className="flex items-center gap-2">
            <Filter size={15} style={{ color: 'var(--text-muted)' }} />
            <select id="report-period" style={{ maxWidth: 140 }} value={period} onChange={e => setPeriod(e.target.value)}>
              <option value="all">Semua Periode</option>
              <option value="2024-07">Juli 2024</option>
              <option value="2024-08">Agustus 2024</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                <th>ID Reservasi</th><th>Pengguna</th><th>Destinasi</th>
                <th>Tanggal</th><th>Total</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservationRows
                .filter(r => period === 'all' || r.date.startsWith(period))
                .map(r => (
                  <tr key={r.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--accent)' }}>{r.id}</td>
                    <td className="font-medium">{r.user}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{r.destination}</td>
                    <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{r.date}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{fmt(r.total)}</td>
                    <td><span className={`badge ${statusColor[r.status] || 'badge-default'}`}>{r.status}</span></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .sidebar, nav, .btn, button, select { display: none !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>
    </div>
  )
}
