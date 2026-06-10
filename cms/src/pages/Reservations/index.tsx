import { useState } from 'react'
import { Search, Eye, X, Filter } from 'lucide-react'

type ResStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed'

interface Reservation {
  id: string
  user: string
  destination: string
  date: string
  persons: number
  total: number
  status: ResStatus
  createdAt: string
}

const reservations: Reservation[] = [
  { id: 'RES-001', user: 'Budi Santoso',    destination: 'Pantai Kuta',           date: '2024-07-20', persons: 2, total: 50000,  status: 'completed',  createdAt: '2024-07-10' },
  { id: 'RES-002', user: 'Siti Rahayu',     destination: 'Candi Borobudur',        date: '2024-07-22', persons: 4, total: 200000, status: 'confirmed',  createdAt: '2024-07-11' },
  { id: 'RES-003', user: 'Agus Wijaya',     destination: 'Raja Ampat',             date: '2024-07-25', persons: 3, total: 450000, status: 'pending',    createdAt: '2024-07-12' },
  { id: 'RES-004', user: 'Dewi Lestari',    destination: 'Gunung Bromo',           date: '2024-07-28', persons: 5, total: 250000, status: 'confirmed',  createdAt: '2024-07-13' },
  { id: 'RES-005', user: 'Rizky Pratama',   destination: 'Danau Toba',             date: '2024-08-01', persons: 2, total: 60000,  status: 'cancelled',  createdAt: '2024-07-14' },
  { id: 'RES-006', user: 'Nina Putri',      destination: 'Taman Nasional Komodo',  date: '2024-08-05', persons: 6, total: 900000, status: 'pending',    createdAt: '2024-07-15' },
  { id: 'RES-007', user: 'Hendra Kurniawan',destination: 'Keraton Yogyakarta',     date: '2024-08-10', persons: 3, total: 45000,  status: 'confirmed',  createdAt: '2024-07-16' },
  { id: 'RES-008', user: 'Lina Anggraini',  destination: 'Pantai Kuta',            date: '2024-08-12', persons: 2, total: 50000,  status: 'completed',  createdAt: '2024-07-17' },
  { id: 'RES-009', user: 'Tono Hartono',    destination: 'Raja Ampat',             date: '2024-08-15', persons: 4, total: 600000, status: 'pending',    createdAt: '2024-07-18' },
  { id: 'RES-010', user: 'Maya Safitri',    destination: 'Gunung Bromo',           date: '2024-08-18', persons: 2, total: 100000, status: 'cancelled',  createdAt: '2024-07-19' },
]

const statusMap: Record<ResStatus, string> = {
  confirmed:  'badge-success',
  pending:    'badge-warning',
  cancelled:  'badge-danger',
  completed:  'badge-info',
}

const statusLabel: Record<ResStatus, string> = {
  confirmed:  'Dikonfirmasi',
  pending:    'Menunggu',
  cancelled:  'Dibatalkan',
  completed:  'Selesai',
}

const summaryStats = [
  { label: 'Total Reservasi', value: reservations.length,                                         color: 'var(--accent)' },
  { label: 'Dikonfirmasi',    value: reservations.filter(r => r.status === 'confirmed').length,    color: 'var(--success)' },
  { label: 'Menunggu',        value: reservations.filter(r => r.status === 'pending').length,      color: 'var(--warning)' },
  { label: 'Dibatalkan',      value: reservations.filter(r => r.status === 'cancelled').length,    color: 'var(--danger)' },
  { label: 'Selesai',         value: reservations.filter(r => r.status === 'completed').length,    color: 'var(--info)' },
  { label: 'Total Pendapatan',value: `Rp ${reservations.filter(r => r.status !== 'cancelled').reduce((s, r) => s + r.total, 0).toLocaleString('id-ID')}`, color: 'var(--success)' },
]

export default function Reservations() {
  const [search, setSearch]     = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | ResStatus>('all')
  const [detail, setDetail]     = useState<Reservation | null>(null)

  const filtered = reservations.filter(r => {
    const matchSearch = r.user.toLowerCase().includes(search.toLowerCase()) ||
                        r.destination.toLowerCase().includes(search.toLowerCase()) ||
                        r.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || r.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalRevenue = filtered
    .filter(r => r.status !== 'cancelled')
    .reduce((s, r) => s + r.total, 0)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Laporan Reservasi</h1>
          <p className="page-subtitle">{reservations.length} total reservasi</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        {summaryStats.map(s => (
          <div key={s.label} className="card" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: typeof s.value === 'number' ? '1.8rem' : '1.1rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input id="res-search" placeholder="Cari reservasi, pengguna, destinasi..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} style={{ color: 'var(--text-muted)' }} />
          <select id="res-status-filter" style={{ maxWidth: 180 }} value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}>
            <option value="all">Semua Status</option>
            <option value="pending">Menunggu</option>
            <option value="confirmed">Dikonfirmasi</option>
            <option value="completed">Selesai</option>
            <option value="cancelled">Dibatalkan</option>
          </select>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          {filtered.length} hasil · Total: <strong style={{ color: 'var(--success)' }}>Rp {totalRevenue.toLocaleString('id-ID')}</strong>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID Reservasi</th>
              <th>Pengguna</th>
              <th>Destinasi</th>
              <th>Tgl Kunjungan</th>
              <th>Orang</th>
              <th>Total</th>
              <th>Status</th>
              <th>Dibuat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--accent)' }}>{r.id}</td>
                <td className="font-medium">{r.user}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{r.destination}</td>
                <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{r.date}</td>
                <td style={{ textAlign: 'center' }}>{r.persons}</td>
                <td style={{ whiteSpace: 'nowrap' }}>Rp {r.total.toLocaleString('id-ID')}</td>
                <td><span className={`badge ${statusMap[r.status]}`}>{statusLabel[r.status]}</span></td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{r.createdAt}</td>
                <td>
                  <button className="icon-btn" style={{ color: 'var(--text-secondary)' }} onClick={() => setDetail(r)} title="Lihat Detail">
                    <Eye size={15} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={9} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="modal-backdrop" onClick={() => setDetail(null)}>
          <div className="modal" style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detail Reservasi</h2>
              <button className="modal-close" onClick={() => setDetail(null)}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                ['ID Reservasi', detail.id],
                ['Pengguna', detail.user],
                ['Destinasi', detail.destination],
                ['Tanggal Kunjungan', detail.date],
                ['Jumlah Orang', `${detail.persons} orang`],
                ['Total Biaya', `Rp ${detail.total.toLocaleString('id-ID')}`],
                ['Tanggal Dibuat', detail.createdAt],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{k}</span>
                  <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Status</span>
                <span className={`badge ${statusMap[detail.status]}`}>{statusLabel[detail.status]}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
