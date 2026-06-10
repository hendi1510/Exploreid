import { useState } from 'react'
import { Search, Check, X, Trash2, Star, Filter, MessageSquare } from 'lucide-react'

type ReviewStatus = 'pending' | 'approved' | 'rejected'

interface Review {
  id: number
  user: string
  destination: string
  rating: number
  comment: string
  date: string
  status: ReviewStatus
}

const initialReviews: Review[] = [
  { id: 1,  user: 'Budi Santoso',     destination: 'Pantai Kuta',             rating: 5, comment: 'Sangat indah dan bersih! Pasirnya putih lembut dan ombaknya sempurna untuk surfing.', date: '2024-07-21', status: 'approved'  },
  { id: 2,  user: 'Siti Rahayu',      destination: 'Candi Borobudur',         rating: 5, comment: 'Warisan budaya yang luar biasa. Pemandangan dari atas sangat menakjubkan.', date: '2024-07-23', status: 'approved'  },
  { id: 3,  user: 'Agus Wijaya',      destination: 'Raja Ampat',              rating: 4, comment: 'Snorkeling terbaik di Indonesia. Airnya jernih dan biodiversitasnya kaya.', date: '2024-07-26', status: 'pending'   },
  { id: 4,  user: 'Dewi Lestari',     destination: 'Gunung Bromo',            rating: 4, comment: 'Sunrise-nya spektakuler! Jalur pendakian cukup menantang tapi sepadan.', date: '2024-07-29', status: 'pending'   },
  { id: 5,  user: 'Rizky Pratama',    destination: 'Danau Toba',              rating: 3, comment: 'Pemandangan danau bagus namun fasilitas perlu ditingkatkan lagi.', date: '2024-08-02', status: 'pending'   },
  { id: 6,  user: 'Nina Putri',       destination: 'Taman Nasional Komodo',   rating: 5, comment: 'Pengalaman bertemu komodo nyata sangat mendebarkan! Pemandu sangat profesional.', date: '2024-08-06', status: 'approved'  },
  { id: 7,  user: 'Hendra Kurniawan', destination: 'Keraton Yogyakarta',      rating: 4, comment: 'Kaya akan sejarah Jawa. Saya belajar banyak tentang budaya Jawa di sini.', date: '2024-08-11', status: 'rejected'  },
  { id: 8,  user: 'Lina Anggraini',   destination: 'Pantai Kuta',             rating: 2, comment: 'Terlalu ramai dan banyak sampah. Tidak seindah yang diharapkan.', date: '2024-08-13', status: 'rejected'  },
  { id: 9,  user: 'Tono Hartono',     destination: 'Raja Ampat',              rating: 5, comment: 'Surga bawah laut yang tiada duanya! Wajib dikunjungi seumur hidup.', date: '2024-08-16', status: 'pending'   },
  { id: 10, user: 'Maya Safitri',     destination: 'Gunung Bromo',            rating: 3, comment: 'Pemandangan bagus tapi pengelolaan wisata masih perlu banyak perbaikan.', date: '2024-08-19', status: 'pending'   },
]

const statusMap: Record<ReviewStatus, string> = {
  approved: 'badge-success',
  pending:  'badge-warning',
  rejected: 'badge-danger',
}

const statusLabel: Record<ReviewStatus, string> = {
  approved: 'Disetujui',
  pending:  'Menunggu',
  rejected: 'Ditolak',
}

const Stars = ({ n }: { n: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} size={13} color="#f59e0b" fill={i <= n ? '#f59e0b' : 'none'} />
    ))}
    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginLeft: 2 }}>{n}.0</span>
  </div>
)

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState<'all' | ReviewStatus>('all')
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const filtered = reviews.filter(r => {
    const matchSearch = r.user.toLowerCase().includes(search.toLowerCase()) ||
                        r.destination.toLowerCase().includes(search.toLowerCase()) ||
                        r.comment.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filter === 'all' || r.status === filter
    return matchSearch && matchStatus
  })

  const approve = (id: number) => setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r))
  const reject  = (id: number) => setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
  const doDelete = () => { setReviews(prev => prev.filter(r => r.id !== deleteId)); setDeleteId(null) }

  const summary = [
    { label: 'Total Review',  value: reviews.length,                                         color: 'var(--accent)' },
    { label: 'Disetujui',     value: reviews.filter(r => r.status === 'approved').length,    color: 'var(--success)' },
    { label: 'Menunggu',      value: reviews.filter(r => r.status === 'pending').length,     color: 'var(--warning)' },
    { label: 'Ditolak',       value: reviews.filter(r => r.status === 'rejected').length,    color: 'var(--danger)' },
    { label: 'Rating Rata2',  value: (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) + ' ★', color: '#f59e0b' },
  ]

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Kelola Review</h1>
          <p className="page-subtitle">{reviews.length} ulasan dari wisatawan</p>
        </div>
      </div>

      {/* Summary */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', marginBottom: '1.25rem' }}>
        {summary.map(s => (
          <div key={s.label} className="card" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input id="review-search" placeholder="Cari review, pengguna, destinasi..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} style={{ color: 'var(--text-muted)' }} />
          <select id="review-filter" style={{ maxWidth: 160 }} value={filter} onChange={e => setFilter(e.target.value as typeof filter)}>
            <option value="all">Semua Status</option>
            <option value="pending">Menunggu</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          {filtered.length} hasil
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Wisatawan</th>
              <th>Destinasi</th>
              <th>Rating</th>
              <th>Komentar</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.id}>
                <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar" style={{ background: 'var(--accent-light)', color: 'var(--accent)', fontSize: '0.75rem' }}>
                      {r.user.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium">{r.user}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{r.destination}</td>
                <td><Stars n={r.rating} /></td>
                <td style={{ maxWidth: 280 }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    <MessageSquare size={12} style={{ marginRight: 4, display: 'inline', verticalAlign: 'middle' }} />
                    {r.comment}
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{r.date}</td>
                <td><span className={`badge ${statusMap[r.status]}`}>{statusLabel[r.status]}</span></td>
                <td>
                  <div className="flex gap-2">
                    {r.status !== 'approved' && (
                      <button className="icon-btn edit" onClick={() => approve(r.id)} title="Setujui" id={`btn-approve-${r.id}`}>
                        <Check size={15} />
                      </button>
                    )}
                    {r.status !== 'rejected' && (
                      <button className="icon-btn" style={{ color: 'var(--warning)' }} onClick={() => reject(r.id)} title="Tolak" id={`btn-reject-${r.id}`}>
                        <X size={15} />
                      </button>
                    )}
                    <button className="icon-btn delete" onClick={() => setDeleteId(r.id)} title="Hapus" id={`btn-delete-review-${r.id}`}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>Tidak ada review</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirm */}
      {deleteId !== null && (
        <div className="modal-backdrop" onClick={() => setDeleteId(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Hapus Review</h2>
              <button className="modal-close" onClick={() => setDeleteId(null)}><X size={18} /></button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Apakah Anda yakin ingin menghapus review ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteId(null)}>Batal</button>
              <button className="btn btn-danger" id="btn-confirm-delete-review" onClick={doDelete}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
