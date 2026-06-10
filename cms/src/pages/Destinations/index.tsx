import { useState } from 'react'
import { Search, Plus, X, Pencil, Trash2, MapPin, Star } from 'lucide-react'

interface Destination {
  id: number
  name: string
  location: string
  category: string
  rating: number
  price: number
  status: 'published' | 'draft' | 'archived'
  visitors: number
}

const initialDests: Destination[] = [
  { id: 1, name: 'Pantai Kuta',          location: 'Bali',         category: 'Pantai',     rating: 4.8, price: 25000,  status: 'published', visitors: 12400 },
  { id: 2, name: 'Candi Borobudur',      location: 'Magelang',     category: 'Sejarah',    rating: 4.9, price: 50000,  status: 'published', visitors: 9000  },
  { id: 3, name: 'Raja Ampat',           location: 'Papua Barat',  category: 'Alam',       rating: 4.9, price: 150000, status: 'published', visitors: 3500  },
  { id: 4, name: 'Gunung Bromo',         location: 'Probolinggo',  category: 'Alam',       rating: 4.7, price: 50000,  status: 'published', visitors: 7800  },
  { id: 5, name: 'Danau Toba',           location: 'Sumatera Utara', category: 'Alam',     rating: 4.6, price: 30000,  status: 'draft',     visitors: 5200  },
  { id: 6, name: 'Taman Nasional Komodo',location: 'NTT',          category: 'Alam',       rating: 4.8, price: 150000, status: 'published', visitors: 4100  },
  { id: 7, name: 'Keraton Yogyakarta',   location: 'Yogyakarta',   category: 'Budaya',     rating: 4.5, price: 15000,  status: 'archived',  visitors: 6300  },
]

const statusMap: Record<Destination['status'], string> = {
  published: 'badge-success',
  draft:     'badge-warning',
  archived:  'badge-danger',
}

const statusLabel: Record<Destination['status'], string> = {
  published: 'Dipublikasi',
  draft:     'Draft',
  archived:  'Diarsipkan',
}

const blank: Omit<Destination, 'id' | 'visitors'> = {
  name: '', location: '', category: 'Pantai', rating: 4.5, price: 0, status: 'draft',
}

const categories = ['Pantai', 'Alam', 'Sejarah', 'Budaya', 'Kuliner', 'Belanja']

export default function Destinations() {
  const [dests, setDests]       = useState<Destination[]>(initialDests)
  const [search, setSearch]     = useState('')
  const [modal, setModal]       = useState(false)
  const [editing, setEditing]   = useState<Destination | null>(null)
  const [form, setForm]         = useState<Omit<Destination, 'id' | 'visitors'>>(blank)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const filtered = dests.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.location.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { setEditing(null); setForm(blank); setModal(true) }

  const openEdit = (d: Destination) => {
    setEditing(d)
    setForm({ name: d.name, location: d.location, category: d.category, rating: d.rating, price: d.price, status: d.status })
    setModal(true)
  }

  const save = () => {
    if (!form.name || !form.location) return
    if (editing) {
      setDests(prev => prev.map(d => d.id === editing.id ? { ...form, id: editing.id, visitors: editing.visitors } : d))
    } else {
      setDests(prev => [...prev, { ...form, id: Date.now(), visitors: 0 }])
    }
    setModal(false)
  }

  const doDelete = () => { setDests(prev => prev.filter(d => d.id !== deleteId)); setDeleteId(null) }

  const fmt = (n: number) => n.toLocaleString('id-ID')
  const fmtPrice = (n: number) => `Rp ${n.toLocaleString('id-ID')}`

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Destinasi Wisata</h1>
          <p className="page-subtitle">{dests.length} destinasi terdaftar</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd} id="btn-add-dest">
          <Plus size={16} /> Tambah Destinasi
        </button>
      </div>

      <div className="toolbar">
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input id="dest-search" placeholder="Cari destinasi..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select id="dest-cat-filter" style={{ maxWidth: 170 }} onChange={e => setSearch(e.target.value === 'all' ? '' : e.target.value)}>
          <option value="all">Semua Kategori</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Destinasi</th>
              <th>Lokasi</th>
              <th>Kategori</th>
              <th>Rating</th>
              <th>Harga Tiket</th>
              <th>Pengunjung</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr key={d.id}>
                <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="dest-img" style={{ background: 'var(--accent-light)' }}>
                      <MapPin size={16} color="var(--accent)" />
                    </div>
                    <span className="font-medium">{d.name}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{d.location}</td>
                <td><span className="badge badge-info">{d.category}</span></td>
                <td>
                  <div className="flex items-center gap-1">
                    <Star size={13} color="#f59e0b" fill="#f59e0b" />
                    <span>{d.rating}</span>
                  </div>
                </td>
                <td>{fmtPrice(d.price)}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{fmt(d.visitors)}</td>
                <td><span className={`badge ${statusMap[d.status]}`}>{statusLabel[d.status]}</span></td>
                <td>
                  <div className="flex gap-2">
                    <button className="icon-btn edit" onClick={() => openEdit(d)} title="Edit"><Pencil size={15} /></button>
                    <button className="icon-btn delete" onClick={() => setDeleteId(d.id)} title="Hapus"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={9} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Edit Destinasi' : 'Tambah Destinasi'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}><X size={18} /></button>
            </div>
            {[
              { label: 'Nama Destinasi', key: 'name', type: 'text', placeholder: 'Contoh: Pantai Kuta' },
              { label: 'Lokasi', key: 'location', type: 'text', placeholder: 'Contoh: Bali' },
            ].map(f => (
              <div className="form-group" key={f.key}>
                <label className="form-label">{f.label}</label>
                <input
                  id={`input-dest-${f.key}`}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={(form as Record<string, unknown>)[f.key] as string}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                />
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">Kategori</label>
              <select id="input-dest-cat" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-3">
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Rating (1-5)</label>
                <input id="input-dest-rating" type="number" min={1} max={5} step={0.1} value={form.rating}
                  onChange={e => setForm({ ...form, rating: parseFloat(e.target.value) })} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Harga Tiket (Rp)</label>
                <input id="input-dest-price" type="number" min={0} value={form.price}
                  onChange={e => setForm({ ...form, price: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select id="input-dest-status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Destination['status'] })}>
                <option value="draft">Draft</option>
                <option value="published">Dipublikasi</option>
                <option value="archived">Diarsipkan</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Batal</button>
              <button className="btn btn-primary" id="btn-save-dest" onClick={save}>
                {editing ? 'Simpan Perubahan' : 'Tambah Destinasi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="modal-backdrop" onClick={() => setDeleteId(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Hapus Destinasi</h2>
              <button className="modal-close" onClick={() => setDeleteId(null)}><X size={18} /></button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Apakah Anda yakin ingin menghapus destinasi ini?</p>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteId(null)}>Batal</button>
              <button className="btn btn-danger" id="btn-confirm-delete-dest" onClick={doDelete}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
