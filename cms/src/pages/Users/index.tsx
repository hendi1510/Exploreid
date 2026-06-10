import { useState } from 'react'
import { Search, Plus, X, Pencil, Trash2, ShieldCheck, User } from 'lucide-react'

type Role = 'admin' | 'user' | 'guide'

interface UserData {
  id: number
  name: string
  email: string
  role: Role
  status: 'active' | 'inactive'
  joined: string
}

const initialUsers: UserData[] = [
  { id: 1, name: 'Budi Santoso',    email: 'budi@email.com',   role: 'admin', status: 'active',   joined: '2024-01-15' },
  { id: 2, name: 'Siti Rahayu',     email: 'siti@email.com',   role: 'user',  status: 'active',   joined: '2024-02-20' },
  { id: 3, name: 'Agus Wijaya',     email: 'agus@email.com',   role: 'guide', status: 'active',   joined: '2024-03-05' },
  { id: 4, name: 'Dewi Lestari',    email: 'dewi@email.com',   role: 'user',  status: 'inactive', joined: '2024-03-18' },
  { id: 5, name: 'Rizky Pratama',   email: 'rizky@email.com',  role: 'user',  status: 'active',   joined: '2024-04-01' },
  { id: 6, name: 'Nina Putri',      email: 'nina@email.com',   role: 'guide', status: 'active',   joined: '2024-04-22' },
  { id: 7, name: 'Hendra Kurniawan',email: 'hendra@email.com', role: 'user',  status: 'inactive', joined: '2024-05-10' },
]

const roleColors: Record<Role, string> = {
  admin: 'badge-info',
  user:  'badge-default',
  guide: 'badge-success',
}

const blank: Omit<UserData, 'id'> = { name: '', email: '', role: 'user', status: 'active', joined: '' }

export default function Users() {
  const [users, setUsers]       = useState<UserData[]>(initialUsers)
  const [search, setSearch]     = useState('')
  const [modal, setModal]       = useState(false)
  const [editing, setEditing]   = useState<UserData | null>(null)
  const [form, setForm]         = useState<Omit<UserData, 'id'>>(blank)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { setEditing(null); setForm(blank); setModal(true) }

  const openEdit = (u: UserData) => {
    setEditing(u)
    setForm({ name: u.name, email: u.email, role: u.role, status: u.status, joined: u.joined })
    setModal(true)
  }

  const save = () => {
    if (!form.name || !form.email) return
    if (editing) {
      setUsers(prev => prev.map(u => u.id === editing.id ? { ...form, id: editing.id } : u))
    } else {
      setUsers(prev => [...prev, { ...form, id: Date.now(), joined: new Date().toISOString().slice(0, 10) }])
    }
    setModal(false)
  }

  const confirmDelete = (id: number) => setDeleteId(id)
  const doDelete = () => { setUsers(prev => prev.filter(u => u.id !== deleteId)); setDeleteId(null) }

  const initials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Pengguna</h1>
          <p className="page-subtitle">{users.length} pengguna terdaftar</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd} id="btn-add-user">
          <Plus size={16} /> Tambah Pengguna
        </button>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input
            id="user-search"
            placeholder="Cari pengguna..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          id="role-filter"
          style={{ maxWidth: 150 }}
          onChange={e => setSearch(e.target.value === 'all' ? '' : e.target.value)}
        >
          <option value="all">Semua Role</option>
          <option value="admin">Admin</option>
          <option value="guide">Guide</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Pengguna</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Bergabung</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id}>
                <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                      {initials(u.name)}
                    </div>
                    <span className="font-medium">{u.name}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                <td>
                  <span className={`badge ${roleColors[u.role]}`}>
                    {u.role === 'admin' ? <ShieldCheck size={11} /> : <User size={11} />}
                    {u.role}
                  </span>
                </td>
                <td>
                  <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                    {u.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{u.joined}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="icon-btn edit" onClick={() => openEdit(u)} title="Edit"><Pencil size={15} /></button>
                    <button className="icon-btn delete" onClick={() => confirmDelete(u.id)} title="Hapus"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Add/Edit */}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Edit Pengguna' : 'Tambah Pengguna'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}><X size={18} /></button>
            </div>
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input id="input-name" placeholder="Masukkan nama" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input id="input-email" type="email" placeholder="Masukkan email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <select id="input-role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value as Role })}>
                <option value="user">User</option>
                <option value="guide">Guide</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select id="input-status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}>
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Batal</button>
              <button className="btn btn-primary" id="btn-save-user" onClick={save}>
                {editing ? 'Simpan Perubahan' : 'Tambah Pengguna'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {deleteId !== null && (
        <div className="modal-backdrop" onClick={() => setDeleteId(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Hapus Pengguna</h2>
              <button className="modal-close" onClick={() => setDeleteId(null)}><X size={18} /></button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteId(null)}>Batal</button>
              <button className="btn btn-danger" id="btn-confirm-delete" onClick={doDelete}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
