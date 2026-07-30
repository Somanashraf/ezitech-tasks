import React, { useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import { PRESET_IMAGES, getSmartLocationImage } from '../utils/imageSelector'

export default function DestinationManagement() {
  const { destinations, addDestination, updateDestination, deleteDestination, tours } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ country: '', city: '', region: 'Middle East', image: '/images/dest-dubai.jpg', description: '', status: 'Active' })

  const filteredDestinations = destinations.filter(d =>
    d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.region?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({ country: '', city: '', region: 'Middle East', image: '/images/dest-dubai.jpg', description: 'Stunning tourist destination with cultural heritage and modern landmarks.', status: 'Active' })
    setShowModal(true)
  }

  const handleOpenEdit = (dest) => {
    setEditingId(dest.id)
    setFormData({ country: dest.country, city: dest.city, region: dest.region || 'Europe', image: dest.image || '/images/dest-dubai.jpg', description: dest.description || '', status: dest.status || 'Active' })
    setShowModal(true)
  }

  const handleCityChange = (val) => { const matched = getSmartLocationImage(val, formData.country); setFormData({ ...formData, city: val, image: matched }) }
  const handleCountryChange = (val) => { const matched = getSmartLocationImage(formData.city, val); setFormData({ ...formData, country: val, image: matched }) }
  const handleFileChange = (e) => { const file = e.target.files[0]; if (file) { const r = new FileReader(); r.onloadend = () => setFormData(p => ({ ...p, image: r.result })); r.readAsDataURL(file) } }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) updateDestination(editingId, formData)
    else addDestination(formData)
    setShowModal(false)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Destination Hierarchy Management</h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>Define countries, cities, and regions with custom file upload or auto-matched photos.</p>
        </div>
        <button className="btn text-white px-3 py-2" style={{ background: '#0EA5E9', borderRadius: '8px', fontWeight: 600 }} onClick={handleOpenAdd}>
          <i className="fas fa-map-marker-alt me-2"></i>Add Destination
        </button>
      </div>

      <div className="admin-card mb-4" style={{ padding: '0.75rem 1.25rem' }}>
        <div className="admin-search-wrap" style={{ width: '100%' }}>
          <i className="fas fa-search"></i>
          <input type="text" className="admin-search-input" style={{ width: '100%' }} placeholder="Search destination by city, country, or region..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {filteredDestinations.length === 0 ? (
        <div className="admin-card text-center py-5">
          <div className="mb-3" style={{ fontSize: '3rem', color: '#CBD5E1' }}><i className="fas fa-map-marked-alt"></i></div>
          <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#0F172A', fontWeight: 700 }}>No Destinations Found</h4>
          <p className="text-muted mb-4">{searchTerm ? `No destinations matching "${searchTerm}".` : 'Click below to add your first destination.'}</p>
          <button className="btn text-white px-4 py-2" style={{ background: '#0EA5E9', borderRadius: '8px', fontWeight: 600 }} onClick={handleOpenAdd}>
            <i className="fas fa-plus me-2"></i>Create First Destination
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredDestinations.map(dest => {
            const linkedTours = tours.filter(t => t.destinationId === dest.id || t.destinationName?.toLowerCase().includes(dest.city.toLowerCase()))
            const minPrice = linkedTours.length > 0 ? Math.min(...linkedTours.map(t => t.price)) : 899
            return (
              <div className="col-lg-4 col-md-6" key={dest.id}>
                <div className="admin-card h-100 p-0 overflow-hidden d-flex flex-column justify-content-between">
                  <div>
                    <div style={{ height: '160px', position: 'relative', overflow: 'hidden' }}>
                      <img src={dest.image || '/images/dest-dubai.jpg'} alt={dest.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span className="badge bg-primary" style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '0.75rem' }}>{dest.region}</span>
                      <span className="badge-admin badge-approved" style={{ position: 'absolute', top: '12px', right: '12px' }}>{dest.status}</span>
                    </div>
                    <div className="p-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{dest.city}, {dest.country}</h4>
                        <span style={{ fontWeight: 700, color: '#16A34A', fontSize: '0.9rem' }}>Starting ${minPrice}</span>
                      </div>
                      <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{dest.description}</p>
                    </div>
                  </div>
                  <div className="px-3 pb-3 pt-2" style={{ borderTop: '1px solid #E2E8F0' }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <small style={{ color: '#334155', fontSize: '0.8rem', fontWeight: 600 }}><i className="fas fa-route me-1 text-info"></i>{linkedTours.length} Linked Tours</small>
                      <div>
                        <button className="btn btn-sm btn-outline-info me-1" onClick={() => handleOpenEdit(dest)}><i className="fas fa-edit"></i></button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteDestination(dest.id)}><i className="fas fa-trash-alt"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showModal && (
        <div className="modal modal-admin d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingId ? 'Edit Destination' : 'Add New Destination'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">City / Area Name</label>
                    <input type="text" className="form-control" required placeholder="e.g. Dubai, Paris, Hunza" value={formData.city} onChange={e => handleCityChange(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-control" required placeholder="e.g. United Arab Emirates, Pakistan" value={formData.country} onChange={e => handleCountryChange(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Region</label>
                    <select className="form-select" value={formData.region} onChange={e => setFormData({ ...formData, region: e.target.value })}>
                      <option value="Europe">Europe</option>
                      <option value="Middle East">Middle East</option>
                      <option value="South Asia">South Asia</option>
                      <option value="Southeast Asia">Southeast Asia</option>
                      <option value="Americas">Americas</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><i className="fas fa-upload me-1 text-primary"></i>Upload Destination Cover Photo</label>
                    <input type="file" accept="image/*" className="form-control mb-2" onChange={handleFileChange} />
                    <small className="text-muted d-block mb-2">Or select from presets:</small>
                    <div className="d-flex align-items-center gap-2">
                      {formData.image && <img src={formData.image} alt="Preview" style={{ width: '60px', height: '42px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CBD5E1' }} />}
                      <select className="form-select" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })}>
                        {PRESET_IMAGES.map(img => <option key={img.value} value={img.value}>{img.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Short Description</label>
                    <textarea className="form-control" rows="2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn text-white" style={{ background: '#0EA5E9' }}>Save Destination</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
