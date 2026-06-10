import { useState } from 'react'
import { Plus, X, Pencil, Trash2, Image, Calendar, Newspaper, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

type Tab = 'banner' | 'event' | 'berita' | 'faq'

interface Banner { id: number; title: string; imageUrl: string; link: string; status: 'active' | 'inactive'; order: number }
interface Event  { id: number; name: string; date: string; location: string; description: string; status: 'upcoming' | 'ongoing' | 'finished' }
interface News   { id: number; title: string; category: string; author: string; date: string; status: 'published' | 'draft' }
interface FAQ    { id: number; question: string; answer: string; order: number; open?: boolean }

const initBanners: Banner[] = [
  { id: 1, title: 'Explore Nusantara – Musim Liburan 2024', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', link: '/destinasi', status: 'active', order: 1 },
  { id: 2, title: 'Promo Spesial Tiket Wisata Alam', imageUrl: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800', link: '/promo', status: 'active', order: 2 },
  { id: 3, title: 'Wisata Budaya Nusantara', imageUrl: '', link: '/budaya', status: 'inactive', order: 3 },
]
const initEvents: Event[] = [
  { id: 1, name: 'Festival Bali Arts 2024',       date: '2024-08-15', location: 'Denpasar, Bali',        description: 'Festival seni dan budaya terbesar di Bali.',        status: 'upcoming' },
  { id: 2, name: 'Java Jazz On The Beach',         date: '2024-07-20', location: 'Pantai Losari, Makassar', description: 'Konser jazz internasional di tepi pantai.',          status: 'ongoing'  },
  { id: 3, name: 'Dieng Culture Festival',         date: '2024-06-01', location: 'Dieng, Wonosobo',        description: 'Festival budaya di Dataran Tinggi Dieng.',          status: 'finished' },
  { id: 4, name: 'Toraja International Festival',  date: '2024-09-10', location: 'Rantepao, Sulawesi',     description: 'Merayakan tradisi dan keindahan alam Tana Toraja.', status: 'upcoming' },
]
const initNews: News[] = [
  { id: 1, title: '5 Destinasi Wisata Terpopuler di Jawa Tengah 2024', category: 'Destinasi', author: 'Admin',   date: '2024-07-15', status: 'published' },
  { id: 2, title: 'Tips Wisata Hemat ke Bali untuk Backpacker',         category: 'Tips',      author: 'Redaksi', date: '2024-07-20', status: 'published' },
  { id: 3, title: 'Update Protokol Kesehatan Wisata Alam Nasional',     category: 'Berita',    author: 'Admin',   date: '2024-07-25', status: 'draft'     },
  { id: 4, title: 'Raja Ampat Raih Penghargaan Destinasi Terbaik Asia', category: 'Berita',    author: 'Redaksi', date: '2024-08-01', status: 'published' },
]
const initFAQs: FAQ[] = [
  { id: 1, question: 'Bagaimana cara memesan tiket wisata?',         answer: 'Pilih destinasi, tentukan tanggal, isi data diri, dan lakukan pembayaran melalui aplikasi ExploreID.',       order: 1, open: false },
  { id: 2, question: 'Metode pembayaran apa saja yang tersedia?',    answer: 'Transfer bank, kartu kredit/debit, e-wallet (GoPay, OVO, Dana), dan minimarket (Indomaret/Alfamart).',       order: 2, open: false },
  { id: 3, question: 'Apakah tiket bisa dibatalkan atau direfund?',  answer: 'Pembatalan dapat dilakukan maksimal H-3. Refund diproses 3-5 hari kerja ke metode pembayaran asal.',         order: 3, open: false },
  { id: 4, question: 'Bagaimana cara melakukan check-in?',           answer: 'Tunjukkan QR Code tiket digital pada petugas di pintu masuk. QR Code ada di aplikasi atau email konfirmasi.', order: 4, open: false },
  { id: 5, question: 'Apakah harga tiket sudah termasuk parkir?',    answer: 'Harga tiket belum termasuk biaya parkir. Biaya parkir sesuai tarif masing-masing destinasi.',               order: 5, open: false },
]

export default function Content() {
  const [tab, setTab] = useState<Tab>('banner')
  const [banners, setBanners] = useState<Banner[]>(initBanners)
  const [events,  setEvents]  = useState<Event[]>(initEvents)
  const [news,    setNews]    = useState<News[]>(initNews)
  const [faqs,    setFaqs]    = useState<FAQ[]>(initFAQs)
  const [modal,    setModal]    = useState(false)
  const [editing,  setEditing]  = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const [bf, setBf] = useState<Omit<Banner, 'id'>>({ title: '', imageUrl: '', link: '', status: 'active', order: 1 })
  const [ef, setEf] = useState<Omit<Event,  'id'>>({ name: '', date: '', location: '', description: '', status: 'upcoming' })
  const [nf, setNf] = useState<Omit<News,   'id'>>({ title: '', category: 'Destinasi', author: '', date: '', status: 'draft' })
  const [ff, setFf] = useState<{ question: string; answer: string; order: number }>({ question: '', answer: '', order: 1 })

  const openAdd = () => {
    setEditing(null); setModal(true)
    if (tab === 'banner') setBf({ title: '', imageUrl: '', link: '', status: 'active', order: banners.length + 1 })
    if (tab === 'event')  setEf({ name: '', date: '', location: '', description: '', status: 'upcoming' })
    if (tab === 'berita') setNf({ title: '', category: 'Destinasi', author: '', date: new Date().toISOString().slice(0,10), status: 'draft' })
    if (tab === 'faq')    setFf({ question: '', answer: '', order: faqs.length + 1 })
  }

  const openEdit = (item: Banner | Event | News | FAQ) => {
    setEditing(item.id); setModal(true)
    if (tab === 'banner') { const b = item as Banner; setBf({ title: b.title, imageUrl: b.imageUrl, link: b.link, status: b.status, order: b.order }) }
    if (tab === 'event')  { const e = item as Event;  setEf({ name: e.name, date: e.date, location: e.location, description: e.description, status: e.status }) }
    if (tab === 'berita') { const n = item as News;   setNf({ title: n.title, category: n.category, author: n.author, date: n.date, status: n.status }) }
    if (tab === 'faq')    { const f = item as FAQ;    setFf({ question: f.question, answer: f.answer, order: f.order }) }
  }

  const save = () => {
    if (tab === 'banner') {
      if (!bf.title) return
      editing !== null ? setBanners(p => p.map(b => b.id === editing ? { ...bf, id: b.id } : b)) : setBanners(p => [...p, { ...bf, id: Date.now() }])
    }
    if (tab === 'event') {
      if (!ef.name) return
      editing !== null ? setEvents(p => p.map(e => e.id === editing ? { ...ef, id: e.id } : e)) : setEvents(p => [...p, { ...ef, id: Date.now() }])
    }
    if (tab === 'berita') {
      if (!nf.title) return
      editing !== null ? setNews(p => p.map(n => n.id === editing ? { ...nf, id: n.id } : n)) : setNews(p => [...p, { ...nf, id: Date.now() }])
    }
    if (tab === 'faq') {
      if (!ff.question) return
      editing !== null ? setFaqs(p => p.map(f => f.id === editing ? { ...ff, id: f.id, open: f.open } : f)) : setFaqs(p => [...p, { ...ff, id: Date.now(), open: false }])
    }
    setModal(false)
  }

  const doDelete = () => {
    if (tab === 'banner') setBanners(p => p.filter(b => b.id !== deleteId))
    if (tab === 'event')  setEvents(p => p.filter(e => e.id !== deleteId))
    if (tab === 'berita') setNews(p => p.filter(n => n.id !== deleteId))
    if (tab === 'faq')    setFaqs(p => p.filter(f => f.id !== deleteId))
    setDeleteId(null)
  }

  const evColor: Record<Event['status'], string> = { upcoming: 'badge-info', ongoing: 'badge-success', finished: 'badge-default' }
  const evLabel: Record<Event['status'], string>  = { upcoming: 'Mendatang', ongoing: 'Berlangsung', finished: 'Selesai' }

  const tabs: Array<{ key: Tab; label: string; icon: React.ReactNode }> = [
    { key: 'banner', label: 'Banner',  icon: <Image size={15} /> },
    { key: 'event',  label: 'Event',   icon: <Calendar size={15} /> },
    { key: 'berita', label: 'Berita',  icon: <Newspaper size={15} /> },
    { key: 'faq',    label: 'FAQ',     icon: <HelpCircle size={15} /> },
  ]

  const actionCounts: Record<Tab, number> = { banner: banners.length, event: events.length, berita: news.length, faq: faqs.length }
  const actionLabel: Record<Tab, string>  = { banner: 'Tambah Banner', event: 'Tambah Event', berita: 'Tambah Berita', faq: 'Tambah FAQ' }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Kelola Konten</h1>
          <p className="page-subtitle">Banner, Event, Berita, dan FAQ website</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1.25rem' }}>
        {tabs.map(t => (
          <button key={t.key} id={`tab-${t.key}`} onClick={() => { setTab(t.key); setModal(false) }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.1rem', border: 'none', background: 'none', cursor: 'pointer', fontWeight: tab === t.key ? 700 : 400, color: tab === t.key ? 'var(--accent)' : 'var(--text-secondary)', borderBottom: tab === t.key ? '2px solid var(--accent)' : '2px solid transparent', fontSize: '0.875rem', transition: 'all 0.15s' }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Sub-header */}
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{actionCounts[tab]} item terdaftar</p>
        <button className="btn btn-primary" id={`btn-add-${tab}`} onClick={openAdd}><Plus size={16} /> {actionLabel[tab]}</button>
      </div>

      {/* ── Banner Table ── */}
      {tab === 'banner' && (
        <div className="table-wrapper">
          <table>
            <thead><tr><th>#</th><th>Gambar</th><th>Judul</th><th>Link</th><th>Urutan</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {banners.map((b, i) => (
                <tr key={b.id}>
                  <td style={{ color: 'var(--text-muted)' }}>{i+1}</td>
                  <td>
                    <div style={{ width: 80, height: 45, borderRadius: 6, overflow: 'hidden', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {b.imageUrl ? <img src={b.imageUrl} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display='none' }} /> : <Image size={18} color="var(--text-muted)" />}
                    </div>
                  </td>
                  <td className="font-medium">{b.title}</td>
                  <td style={{ color: 'var(--accent)', fontSize: '0.8rem', fontFamily: 'monospace' }}>{b.link}</td>
                  <td style={{ textAlign: 'center' }}>{b.order}</td>
                  <td><span className={`badge ${b.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{b.status === 'active' ? 'Aktif' : 'Nonaktif'}</span></td>
                  <td><div className="flex gap-2"><button className="icon-btn edit" onClick={() => openEdit(b)}><Pencil size={15}/></button><button className="icon-btn delete" onClick={() => setDeleteId(b.id)}><Trash2 size={15}/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Event Table ── */}
      {tab === 'event' && (
        <div className="table-wrapper">
          <table>
            <thead><tr><th>#</th><th>Nama Event</th><th>Tanggal</th><th>Lokasi</th><th>Deskripsi</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {events.map((e, i) => (
                <tr key={e.id}>
                  <td style={{ color: 'var(--text-muted)' }}>{i+1}</td>
                  <td className="font-medium">{e.name}</td>
                  <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{e.date}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{e.location}</td>
                  <td style={{ color: 'var(--text-secondary)', maxWidth: 200, fontSize: '0.82rem' }} className="truncate">{e.description}</td>
                  <td><span className={`badge ${evColor[e.status]}`}>{evLabel[e.status]}</span></td>
                  <td><div className="flex gap-2"><button className="icon-btn edit" onClick={() => openEdit(e)}><Pencil size={15}/></button><button className="icon-btn delete" onClick={() => setDeleteId(e.id)}><Trash2 size={15}/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── News Table ── */}
      {tab === 'berita' && (
        <div className="table-wrapper">
          <table>
            <thead><tr><th>#</th><th>Judul</th><th>Kategori</th><th>Penulis</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {news.map((n, i) => (
                <tr key={n.id}>
                  <td style={{ color: 'var(--text-muted)' }}>{i+1}</td>
                  <td className="font-medium" style={{ maxWidth: 240 }}>{n.title}</td>
                  <td><span className="badge badge-info">{n.category}</span></td>
                  <td style={{ color: 'var(--text-secondary)' }}>{n.author}</td>
                  <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{n.date}</td>
                  <td><span className={`badge ${n.status === 'published' ? 'badge-success' : 'badge-warning'}`}>{n.status === 'published' ? 'Diterbitkan' : 'Draft'}</span></td>
                  <td><div className="flex gap-2"><button className="icon-btn edit" onClick={() => openEdit(n)}><Pencil size={15}/></button><button className="icon-btn delete" onClick={() => setDeleteId(n.id)}><Trash2 size={15}/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── FAQ Accordion ── */}
      {tab === 'faq' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {[...faqs].sort((a,b) => a.order - b.order).map(f => (
            <div key={f.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 1rem', cursor: 'pointer' }} onClick={() => setFaqs(p => p.map(x => x.id === f.id ? { ...x, open: !x.open } : x))}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>{f.order}</div>
                <span style={{ fontWeight: 600, flex: 1, fontSize: '0.9rem' }}>{f.question}</span>
                <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                  <button className="icon-btn edit" onClick={() => openEdit(f)}><Pencil size={14}/></button>
                  <button className="icon-btn delete" onClick={() => setDeleteId(f.id)}><Trash2 size={14}/></button>
                </div>
                {f.open ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
              </div>
              {f.open && <div style={{ padding: '0 1rem 1rem 3.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65, borderTop: '1px solid var(--border)' }}>{f.answer}</div>}
            </div>
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing !== null ? 'Edit' : 'Tambah'} {tab === 'banner' ? 'Banner' : tab === 'event' ? 'Event' : tab === 'berita' ? 'Berita' : 'FAQ'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}><X size={18}/></button>
            </div>

            {tab === 'banner' && <>
              {(['title','imageUrl','link'] as const).map(k => (
                <div className="form-group" key={k}><label className="form-label">{k === 'title' ? 'Judul' : k === 'imageUrl' ? 'URL Gambar' : 'Link Tujuan'}</label><input id={`input-banner-${k}`} value={bf[k] as string} onChange={e => setBf({...bf,[k]:e.target.value})} /></div>
              ))}
              <div className="flex gap-3">
                <div className="form-group" style={{flex:1}}><label className="form-label">Urutan</label><input type="number" min={1} value={bf.order} onChange={e => setBf({...bf,order:parseInt(e.target.value)||1})} /></div>
                <div className="form-group" style={{flex:1}}><label className="form-label">Status</label><select value={bf.status} onChange={e => setBf({...bf,status:e.target.value as Banner['status']})}><option value="active">Aktif</option><option value="inactive">Nonaktif</option></select></div>
              </div>
            </>}

            {tab === 'event' && <>
              <div className="form-group"><label className="form-label">Nama Event</label><input id="input-event-name" value={ef.name} onChange={e => setEf({...ef,name:e.target.value})} /></div>
              <div className="flex gap-3">
                <div className="form-group" style={{flex:1}}><label className="form-label">Tanggal</label><input type="date" value={ef.date} onChange={e => setEf({...ef,date:e.target.value})} /></div>
                <div className="form-group" style={{flex:1}}><label className="form-label">Status</label><select value={ef.status} onChange={e => setEf({...ef,status:e.target.value as Event['status']})}><option value="upcoming">Mendatang</option><option value="ongoing">Berlangsung</option><option value="finished">Selesai</option></select></div>
              </div>
              <div className="form-group"><label className="form-label">Lokasi</label><input id="input-event-loc" value={ef.location} onChange={e => setEf({...ef,location:e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Deskripsi</label><textarea value={ef.description} onChange={e => setEf({...ef,description:e.target.value})} /></div>
            </>}

            {tab === 'berita' && <>
              <div className="form-group"><label className="form-label">Judul Berita</label><input id="input-news-title" value={nf.title} onChange={e => setNf({...nf,title:e.target.value})} /></div>
              <div className="flex gap-3">
                <div className="form-group" style={{flex:1}}><label className="form-label">Kategori</label><select value={nf.category} onChange={e => setNf({...nf,category:e.target.value})}>{['Destinasi','Tips','Berita','Promo','Kuliner'].map(c=><option key={c}>{c}</option>)}</select></div>
                <div className="form-group" style={{flex:1}}><label className="form-label">Status</label><select value={nf.status} onChange={e => setNf({...nf,status:e.target.value as News['status']})}><option value="draft">Draft</option><option value="published">Diterbitkan</option></select></div>
              </div>
              <div className="flex gap-3">
                <div className="form-group" style={{flex:1}}><label className="form-label">Penulis</label><input value={nf.author} onChange={e => setNf({...nf,author:e.target.value})} /></div>
                <div className="form-group" style={{flex:1}}><label className="form-label">Tanggal</label><input type="date" value={nf.date} onChange={e => setNf({...nf,date:e.target.value})} /></div>
              </div>
            </>}

            {tab === 'faq' && <>
              <div className="form-group"><label className="form-label">Pertanyaan</label><input id="input-faq-q" value={ff.question} onChange={e => setFf({...ff,question:e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Jawaban</label><textarea value={ff.answer} onChange={e => setFf({...ff,answer:e.target.value})} style={{minHeight:100}} /></div>
              <div className="form-group"><label className="form-label">Urutan</label><input type="number" min={1} value={ff.order} onChange={e => setFf({...ff,order:parseInt(e.target.value)||1})} /></div>
            </>}

            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Batal</button>
              <button className="btn btn-primary" id="btn-save-content" onClick={save}>{editing !== null ? 'Simpan' : 'Tambah'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId !== null && (
        <div className="modal-backdrop" onClick={() => setDeleteId(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>Hapus Konten</h2><button className="modal-close" onClick={() => setDeleteId(null)}><X size={18}/></button></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Apakah Anda yakin ingin menghapus item ini?</p>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteId(null)}>Batal</button>
              <button className="btn btn-danger" id="btn-confirm-delete-content" onClick={doDelete}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
