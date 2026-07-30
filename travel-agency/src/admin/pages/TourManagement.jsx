import React, { useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import { PRESET_IMAGES, getSmartLocationImage } from '../utils/imageSelector'

export default function TourManagement() {
  const { tours, destinations, categories, addTour, updateTour, deleteTour, duplicateTour, setTourStatus, archiveTour } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ title: '', destinationId: '', categoryNames: [], price: 999, durationDays: 5, maxGroupSize: 10, status: 'Draft', image: '/images/pkg-maldives.jpg', description: '', policy: 'Free cancellation up to 14 days before departure.', itinerary: '', faqs: '' })

  const filteredTours = tours.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.destinationName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    const initialDest = destinations[0]
    const initialImg = initialDest ? getSmartLocationImage(initialDest.city, initialDest.country) : '/images/dest-dubai.jpg'
    setFormData({ title: '', destinationId: initialDest?.id || '', categoryNames: [categories[0]?.name || 'Luxury Escapes'], price: 999, durationDays: 5, maxGroupSize: 12, status: 'Published', image: initialImg, description: 'Experience an extraordinary adventure with luxury amenities and curated tours.', policy: 'Standard 7-day refund policy applies.', itinerary: 'Day 1: Arrival & hotel check-in\nDay 2: City tour\nDay 3: Free exploration\nDay 4: Departure', faqs: 'Q: Is travel insurance included?\nA: Yes, basic coverage is included.\n\nQ: Can I customize the itinerary?\nA: Contact us for custom plans.' })
    setShowModal(true)
  }

  const handleOpenEdit = (tour) => {
    setEditingId(tour.id)
    setFormData({ title: tour.title, destinationId: tour.destinationId || '', categoryNames: tour.categoryNames || [], price: tour.price, durationDays: tour.durationDays, maxGroupSize: tour.maxGroupSize || 10, status: tour.status, image: tour.image || '/images/dest-dubai.jpg', description: tour.description || '', policy: tour.policy || '', itinerary: tour.itinerary || '', faqs: Array.isArray(tour.faqs) ? tour.faqs.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n') : (tour.faqs || '') })
    setShowModal(true)
  }

  const handleDestinationSelect = (destId) => {
    const selectedDest = destinations.find(d => d.id === destId)
    const autoImage = selectedDest ? getSmartLocationImage(selectedDest.city, selectedDest.country) : formData.image
    setFormData({ ...formData, destinationId: destId, image: autoImage })
  }

  const handleTitleChange = (val) => {
    const autoImage = getSmartLocationImage(val, '')
    setFormData({ ...formData, title: val, ...(val.length > 3 ? { image: autoImage } : {}) })
  }

  const toggleCategory = (catName) => {
    setFormData(prev => ({ ...prev, categoryNames: prev.categoryNames.includes(catName) ? prev.categoryNames.filter(c => c !== catName) : [...prev.categoryNames, catName] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dest = destinations.find(d => d.id === formData.destinationId)
    const faqLines = formData.faqs.split('\n\n').filter(Boolean)
    const parsedFaqs = faqLines.map(block => {
      const qMatch = block.match(/Q:\s*(.+)/); const aMatch = block.match(/A:\s*(.+)/s)
      return { q: qMatch?.[1]?.trim() || block, a: aMatch?.[1]?.trim() || '' }
    })
    const payload = { ...formData, faqs: parsedFaqs, destinationName: dest ? `${dest.city}, ${dest.country}` : 'Global' }
    if (editingId) updateTour(editingId, payload)
    else addTour(payload)
    setShowModal(false)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Tour Packages Management</h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>Create, edit, duplicate, publish, or archive travel packages with auto photo-matching.</p>
        </div>
        <button className="btn text-white px-3 py-2" style={{ background: '#0EA5E9', borderRadius: '8px', fontWeight: 600 }} onClick={handleOpenAdd}>
          <i className="fas fa-plus me-2"></i>Create New Package
        </button>
      </div>

      <div className="admin-card mb-4" style={{ padding: '1rem 1.25rem' }}>
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <div className="admin-search-wrap" style={{ width: '100%' }}>
              <i className="fas fa-search"></i>
              <input type="text" className="admin-search-input" style={{ width: '100%' }} placeholder="Search package title or location..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="col-md-4">
            <select className="form-select bg-light text-dark" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="All">All Package Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <div className="col-md-3 text-end" style={{ color: '#64748B', fontSize: '0.85rem' }}>Showing {filteredTours.length} of {tours.length} tours</div>
        </div>
      </div>

      <div className="admin-card p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr><th>Package Detail</th><th>Destination</th><th>Categories</th><th>Pricing</th><th>Duration</th><th>Status</th><th className="text-end">Actions</th></tr>
            </thead>
            <tbody>
              {filteredTours.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-5 text-muted">
                  <div className="mb-2" style={{ fontSize: '2rem' }}><i className="fas fa-route"></i></div>
                  No tour packages found. Click <strong>"+ Create New Package"</strong> to add your first tour!
                </td></tr>
              ) : filteredTours.map(t => (
                <tr key={t.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img src={t.image} alt={t.title} style={{ width: '56px', height: '42px', objectFit: 'cover', borderRadius: '6px' }} />
                      <div>
                        <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.92rem' }}>{t.title}</div>
                        <small style={{ color: '#64748B' }}>ID: {t.id}</small>
                      </div>
                    </div>
                  </td>
                  <td><i className="fas fa-map-marker-alt me-1 text-primary"></i>{t.destinationName}</td>
                  <td>{t.categoryNames?.map(c => <span key={c} className="badge bg-secondary me-1" style={{ fontSize: '0.7rem' }}>{c}</span>)}</td>
                  <td style={{ fontWeight: 700, color: '#16A34A' }}>${t.price}</td>
                  <td>{t.durationDays} Days</td>
                  <td><span className={`badge-admin badge-${t.status.toLowerCase()}`}>{t.status}</span></td>
                  <td className="text-end">
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-info me-1" onClick={() => handleOpenEdit(t)} title="Edit"><i className="fas fa-edit"></i></button>
                      <button className="btn btn-sm btn-outline-success me-1" onClick={() => setTourStatus(t.id, t.status === 'Published' ? 'Draft' : 'Published')} title={t.status === 'Published' ? 'Unpublish' : 'Publish'}><i className={`fas fa-${t.status === 'Published' ? 'eye-slash' : 'eye'}`}></i></button>
                      <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => archiveTour(t.id)} title="Archive"><i className="fas fa-archive"></i></button>
                      <button className="btn btn-sm btn-outline-warning me-1" onClick={() => duplicateTour(t.id)} title="Duplicate"><i className="fas fa-copy"></i></button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTour(t.id)} title="Delete"><i className="fas fa-trash-alt"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-admin d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingId ? 'Edit Tour Package' : 'Create New Tour Package'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Package Title</label>
                      <input type="text" className="form-control" required value={formData.title} onChange={e => handleTitleChange(e.target.value)} placeholder="e.g. Dubai Desert Safari & Burj Khalifa VIP" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Destination</label>
                      <select className="form-select" required value={formData.destinationId} onChange={e => handleDestinationSelect(e.target.value)}>
                        {destinations.length === 0
                          ? <option value="">No destinations yet — add one first</option>
                          : destinations.map(d => <option key={d.id} value={d.id}>{d.city}, {d.country} ({d.region})</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-select" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                        <option value="Published">Published (Live on Website)</option>
                        <option value="Draft">Draft (Hidden)</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Tour Categories</label>
                      {categories.length === 0
                        ? <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>No categories yet. Add categories first.</p>
                        : <div className="d-flex flex-wrap gap-2">
                          {categories.map(cat => (
                            <label key={cat.id} className="d-flex align-items-center gap-1 px-3 py-2 rounded" style={{ background: formData.categoryNames.includes(cat.name) ? '#E0F2FE' : '#F1F5F9', cursor: 'pointer', fontSize: '0.85rem', border: formData.categoryNames.includes(cat.name) ? '1px solid #0EA5E9' : '1px solid transparent' }}>
                              <input type="checkbox" checked={formData.categoryNames.includes(cat.name)} onChange={() => toggleCategory(cat.name)} />
                              {cat.name}
                            </label>
                          ))}
                        </div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label"><i className="fas fa-upload me-1 text-primary"></i>Package Cover Photo</label>
                      <input type="file" accept="image/*" className="form-control mb-2" onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onloadend = () => setFormData(p => ({ ...p, image: r.result })); r.readAsDataURL(f) } }} />
                      <small className="text-muted d-block mb-2">Or select from presets:</small>
                      <div className="d-flex align-items-center gap-3">
                        {formData.image && <img src={formData.image} alt="Cover preview" style={{ width: '70px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #CBD5E1' }} />}
                        <select className="form-select flex-1" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })}>
                          {PRESET_IMAGES.map(img => <option key={img.value} value={img.value}>{img.label}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Price ($ USD)</label>
                      <input type="number" className="form-control" required value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Duration (Days)</label>
                      <input type="number" className="form-control" required value={formData.durationDays} onChange={e => setFormData({ ...formData, durationDays: Number(e.target.value) })} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Max Travelers</label>
                      <input type="number" className="form-control" value={formData.maxGroupSize} onChange={e => setFormData({ ...formData, maxGroupSize: Number(e.target.value) })} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Itinerary (Day-by-day)</label>
                      <textarea className="form-control" rows="4" placeholder="Day 1: Arrival&#10;Day 2: City tour&#10;Day 3: Departure" value={formData.itinerary} onChange={e => setFormData({ ...formData, itinerary: e.target.value })}></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label">FAQs (Q: / A: format, blank line between each)</label>
                      <textarea className="form-control" rows="4" placeholder="Q: Is visa required?&#10;A: Yes, for most nationalities.&#10;&#10;Q: Are meals included?" value={formData.faqs} onChange={e => setFormData({ ...formData, faqs: e.target.value })}></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Cancellation Policy</label>
                      <input type="text" className="form-control" value={formData.policy} onChange={e => setFormData({ ...formData, policy: e.target.value })} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn text-white" style={{ background: '#0EA5E9' }}>{editingId ? 'Save Changes' : 'Create Package'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
