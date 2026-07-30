import React, { useState } from 'react'
import { useAdmin } from '../context/AdminContext'

export default function CategoryManagement() {
  const { categories, addCategory, updateCategory, deleteCategory, tours } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', slug: '', icon: 'fa-tag', badgeColor: '#0EA5E9', image: '/images/pkg-maldives.jpg', description: '' })

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({ name: '', slug: '', icon: 'fa-star', badgeColor: '#0EA5E9', image: '/images/pkg-maldives.jpg', description: 'Exclusive travel category designed for specialized itineraries.' })
    setShowModal(true)
  }

  const handleOpenEdit = (cat) => {
    setEditingId(cat.id)
    setFormData({ name: cat.name, slug: cat.slug, icon: cat.icon || 'fa-tag', badgeColor: cat.badgeColor || '#0EA5E9', image: cat.image || '/images/pkg-maldives.jpg', description: cat.description || '' })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const payload = { ...formData, slug }
    if (editingId) updateCategory(editingId, payload)
    else addCategory(payload)
    setShowModal(false)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Tour Categories & Tagging</h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>Manage reusable categories (Adventure, Family, Luxury, Honeymoon) with file uploads.</p>
        </div>
        <button className="btn text-white px-3 py-2" style={{ background: '#0EA5E9', borderRadius: '8px', fontWeight: 600 }} onClick={handleOpenAdd}>
          <i className="fas fa-tags me-2"></i>Add Category
        </button>
      </div>

      <div className="admin-card mb-4" style={{ padding: '0.75rem 1.25rem' }}>
        <div className="admin-search-wrap" style={{ width: '100%' }}>
          <i className="fas fa-search"></i>
          <input type="text" className="admin-search-input" style={{ width: '100%' }} placeholder="Search category name or slug..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="admin-card text-center py-5">
          <div className="mb-3" style={{ fontSize: '3rem', color: '#CBD5E1' }}><i className="fas fa-layer-group"></i></div>
          <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#0F172A', fontWeight: 700 }}>No Categories Found</h4>
          <p className="text-muted mb-4">{searchTerm ? `No category matching "${searchTerm}".` : 'Click below to create your first category.'}</p>
          <button className="btn text-white px-4 py-2" style={{ background: '#0EA5E9', borderRadius: '8px', fontWeight: 600 }} onClick={handleOpenAdd}>
            <i className="fas fa-plus me-2"></i>Create First Category
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredCategories.map(cat => {
            const tourCount = tours.filter(t => t.categoryNames?.includes(cat.name)).length
            return (
              <div className="col-lg-4 col-md-6" key={cat.id}>
                <div className="admin-card h-100 p-0 overflow-hidden d-flex flex-column justify-content-between">
                  <div>
                    <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
                      <img src={cat.image || '/images/pkg-maldives.jpg'} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '12px', left: '12px', width: '38px', height: '38px', borderRadius: '10px', background: cat.badgeColor, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                        <i className={`fas ${cat.icon}`}></i>
                      </div>
                      <span className="badge" style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: cat.badgeColor, fontSize: '0.75rem' }}>{cat.slug}</span>
                    </div>
                    <div className="p-3">
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.4rem' }}>{cat.name}</h4>
                      <p style={{ color: '#64748B', fontSize: '0.85rem' }}>{cat.description}</p>
                    </div>
                  </div>
                  <div className="px-3 pb-3 pt-2" style={{ borderTop: '1px solid #E2E8F0' }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <small style={{ color: '#334155', fontSize: '0.8rem', fontWeight: 600 }}><i className="fas fa-tags me-1 text-primary"></i>{tourCount} Packages Tagged</small>
                      <div>
                        <button className="btn btn-sm btn-outline-info me-1" onClick={() => handleOpenEdit(cat)}><i className="fas fa-edit"></i></button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteCategory(cat.id)}><i className="fas fa-trash-alt"></i></button>
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
                <h5 className="modal-title">{editingId ? 'Edit Category' : 'Create Tour Category'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input type="text" className="form-control" required placeholder="e.g. Eco Tourism" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label">FontAwesome Icon</label>
                      <input type="text" className="form-control" placeholder="fa-mountain" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Badge Color</label>
                      <input type="color" className="form-control form-control-color w-100" value={formData.badgeColor} onChange={e => setFormData({ ...formData, badgeColor: e.target.value })} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><i className="fas fa-upload me-1 text-primary"></i>Category Cover Image</label>
                    <input type="file" accept="image/*" className="form-control mb-2" onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onloadend = () => setFormData(p => ({ ...p, image: r.result })); r.readAsDataURL(f) } }} />
                    <small className="text-muted d-block mb-1">Or enter image URL / path:</small>
                    <input type="text" className="form-control" placeholder="/images/pkg-maldives.jpg or https://..." value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn text-white" style={{ background: '#0EA5E9' }}>Save Category</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
