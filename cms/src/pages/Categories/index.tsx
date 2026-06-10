import { useState } from 'react'
import { Plus, X, Pencil, Trash2, Tag } from 'lucide-react'

interface Category {
  id: number
  name: string
  slug: string
  icon: string
  description: string
  destCount: number
  status: 'active' | 'inactive'
}

const icons = ['🏖️', '🏔️', '🏛️', '🎭', '🍜', '🛍️', '🌊', '🌿', '🏕️', '🗺️']

const initialCats: Category[] = [
  { id: 1, name: 'Pantai',     slug: 'pantai',     icon: '🏖️', description: 'Destinasi tepi pantai dan laut',        destCount: 18, status: 'active'   },
  { id: 2, name: 'Alam',       slug: 'alam',       icon: '🌿', description: 'Hutan, gunung, dan keindahan alam',     destCount: 24, status: 'active'   },
  { id: 3, name: 'Sejarah',    slug: 'sejarah',    icon: '🏛️', description: 'Situs bersejarah dan peninggalan',      destCount: 12, status: 'active'   },
  { id: 4, name: 'Budaya',     slug: 'budaya',     icon: '🎭', description: 'Kebudayaan lokal dan tradisi daerah',   destCount: 9,  status: 'active'   },
  { id: 5, name: 'Kuliner',    slug: 'kuliner',    icon: '🍜', description: 'Wisata kuliner dan makanan khas',       destCount: 15, status: 'active'   },
  { id: 6, name: 'Belanja',    slug: 'belanja',    icon: '🛍️', description: 'Pusat perbelanjaan dan pasar tradisional', destCount: 7, status: 'inactive' },
  { id: 7, name: 'Petualangan',slug: 'petualangan',icon: '🏕️', description: 'Hiking, camping, dan olahraga alam',   destCount: 11, status: 'active'   },
]

const blank: Omit<Category, 'id' | 'destCount'> = {
  name: '', slug: '', icon: '🗺️', description: '', status: 'active',
}

export default function Categories() {
  const [cats, setCats]         = useState<Category[]>(initialCats)
  const [modal, setModal]       = useState(false)
  const [editing, setEditing]   = useState<Category | null>(null)
  const [form, setForm]         = useState<Omit<Category, 'id' | 'destCount'>>(blank)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const openAdd = () => { setEditing(null); setForm(blank); setModal(true) }

  const openEdit = (c: Category) => {
    setEditing(c)
    setForm({ name: c.name, slug: c.slug, icon: c.icon, description: c.description, status: c.status })
    setModal(true)
  }

  const save = () => {
    if (!form.name) return
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-')
    if (editing) {
      setCats(prev => prev.map(c => c.id === editing.id ? { ...form, slug, id: editing.id, destCount: editing.destCount } : c))
    } else {
      setCats(prev => [...prev, { ...form, slug, id: Date.now(), destCount: 0 }])
    }
    setModal(false)
  }

  const doDelete = () => { setCats(prev => prev.filter(c => c.id !== deleteId)); setDeleteId(null) }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Kategori Wisata</h1>
          <p className="page-subtitle">{cats.length} kategori terdaftar</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd} id="btn-add-cat">
          <Plus size={16} /> Tambah Kategori
        </button>
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {cats.map(c => (
          <div
            key={c.id}
            className="card"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '2rem' }}>{c.icon}</div>
              <div className="flex gap-2">
                <button className="icon-btn edit" onClick={() => openEdit(c)} title="Edit"><Pencil size={15} /></button>
                <button className="icon-btn delete" onClick={() => setDeleteId(c.id)} title="Hapus"><Trash2 size={15} /></button>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{c.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>/{c.slug}</div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', flexGrow: 1 }}>{c.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <Tag size={13} />
                {c.destCount} destinasi
              </div>
              <span className={`badge ${c.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                {c.status === 'active' ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Also show table view */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Icon</th>
              <th>Nama Kategori</th>
              <th>Slug</th>
              <th>Deskripsi</th>
              <th>Destinasi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((c, i) => (
              <tr key={c.id}>
                <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                <td style={{ fontSize: '1.4rem' }}>{c.icon}</td>
                <td className="font-medium">{c.name}</td>
                <td style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.8rem' }}>/{c.slug}</td>
                <td style={{ color: 'var(--text-secondary)', maxWidth: 200 }} className="truncate">{c.description}</td>
                <td>{c.destCount}</td>
                <td><span className={`badge ${c.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{c.status === 'active' ? 'Aktif' : 'Nonaktif'}</span></td>
                <td>
                  <div className="flex gap-2">
                    <button className="icon-btn edit" onClick={() => openEdit(c)} title="Edit"><Pencil size={15} /></button>
                    <button className="icon-btn delete" onClick={() => setDeleteId(c.id)} title="Hapus"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}><X size={18} /></button>
            </div>
            <div className="form-group">
              <label className="form-label">Pilih Icon</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {icons.map(ic => (
                  <button
                    key={ic}
                    onClick={() => setForm({ ...form, icon: ic })}
                    style={{
                      fontSize: '1.4rem', padding: '0.3rem 0.6rem', borderRadius: 8,
                      border: `2px solid ${form.icon === ic ? 'var(--accent)' : 'var(--border)'}`,
                      background: form.icon === ic ? 'var(--accent-light)' : 'transparent',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >{ic}</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Nama Kategori</label>
              <input id="input-cat-name" placeholder="Contoh: Pantai" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} />
            </div>
            <div className="form-group">
              <label className="form-label">Slug</label>
              <input id="input-cat-slug" placeholder="Otomatis dari nama" value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Deskripsi</label>
              <textarea id="input-cat-desc" placeholder="Deskripsi kategori..." value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select id="input-cat-status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}>
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Batal</button>
              <button className="btn btn-primary" id="btn-save-cat" onClick={save}>
                {editing ? 'Simpan Perubahan' : 'Tambah Kategori'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="modal-backdrop" onClick={() => setDeleteId(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Hapus Kategori</h2>
              <button className="modal-close" onClick={() => setDeleteId(null)}><X size={18} /></button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Apakah Anda yakin ingin menghapus kategori ini? Semua destinasi dalam kategori ini tidak akan terpengaruh.
            </p>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteId(null)}>Batal</button>
              <button className="btn btn-danger" id="btn-confirm-delete-cat" onClick={doDelete}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
