import React, { useState } from 'react'
import { useAdmin } from '../context/AdminContext'

export default function BlogManagement() {
  const { blogs, addBlog, updateBlog, deleteBlog, toggleBlogStatus } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Destinations',
    author: 'Admin',
    img: 'gal-travel.jpg',
    read: '5 min read',
    excerpt: '',
    status: 'Published'
  })

  // Unique categories
  const categories = ['All', ...new Set((blogs || []).map(b => b.category))]

  // Filtered blogs
  const filteredBlogs = (blogs || []).filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory
    return matchesSearch && matchesCat
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({
      title: '',
      category: 'Destinations',
      author: 'WanderLux Team',
      img: 'gal-travel.jpg',
      read: '5 min read',
      excerpt: '',
      status: 'Published'
    })
    setShowModal(true)
  }

  const handleOpenEdit = (blog) => {
    setEditingId(blog.id)
    setFormData({
      title: blog.title,
      category: blog.category,
      author: blog.author,
      img: blog.img,
      read: blog.read || '5 min read',
      excerpt: blog.excerpt,
      status: blog.status || 'Published'
    })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      updateBlog(editingId, formData)
    } else {
      addBlog(formData)
    }
    setShowModal(false)
  }

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete the blog post "${title}"?`)) {
      deleteBlog(id)
    }
  }

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
            <i className="fas fa-newspaper text-accent me-2"></i>Blog Management
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>
            Create, update, and manage travel articles and guides shown on the public website.
          </p>
        </div>
        <button
          className="btn text-white px-3 py-2"
          style={{ background: '#0EA5E9', borderRadius: '8px', fontWeight: 600 }}
          onClick={handleOpenAdd}
        >
          <i className="fas fa-plus me-2"></i>Add New Blog Post
        </button>
      </div>

      {/* ── KPI Summary Cards ── */}
      <div className="row g-3 mb-4">
        <div className="col-md-3 col-6">
          <div className="admin-card p-3 d-flex align-items-center gap-3">
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.1)', color: '#0EA5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              <i className="fas fa-newspaper"></i>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A' }}>{(blogs || []).length}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Total Articles</div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="admin-card p-3 d-flex align-items-center gap-3">
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A' }}>
                {(blogs || []).filter(b => b.status === 'Published').length}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Published Live</div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="admin-card p-3 d-flex align-items-center gap-3">
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              <i className="fas fa-file-alt"></i>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A' }}>
                {(blogs || []).filter(b => b.status === 'Draft').length}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Draft Posts</div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="admin-card p-3 d-flex align-items-center gap-3">
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              <i className="fas fa-folder"></i>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A' }}>{categories.length - 1}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Toolbar ── */}
      <div className="admin-card mb-4" style={{ padding: '0.85rem 1.25rem' }}>
        <div className="row g-3 align-items-center">
          <div className="col-md-8">
            <div className="admin-search-wrap" style={{ width: '100%' }}>
              <i className="fas fa-search"></i>
              <input
                type="text"
                className="admin-search-input"
                style={{ width: '100%' }}
                placeholder="Search blog title, author, or excerpt..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2">
              <label className="text-muted small mb-0 fw-semibold" style={{ whiteSpace: 'nowrap' }}>Category:</label>
              <select
                className="form-select form-select-sm"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                style={{ borderRadius: '8px' }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Blog Grid ── */}
      {filteredBlogs.length === 0 ? (
        <div className="admin-card text-center py-5">
          <div className="mb-3" style={{ fontSize: '3rem', color: '#CBD5E1' }}>
            <i className="fas fa-newspaper"></i>
          </div>
          <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#0F172A', fontWeight: 700 }}>No Blog Articles Found</h4>
          <p className="text-muted mb-4">
            {searchTerm || selectedCategory !== 'All'
              ? 'No articles match your search criteria.'
              : 'Click below to publish your first blog article.'}
          </p>
          <button
            className="btn text-white px-4 py-2"
            style={{ background: '#0EA5E9', borderRadius: '8px', fontWeight: 600 }}
            onClick={handleOpenAdd}
          >
            <i className="fas fa-plus me-2"></i>Create New Post
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredBlogs.map(blog => (
            <div className="col-lg-4 col-md-6" key={blog.id}>
              <div className="admin-card h-100 p-0 overflow-hidden d-flex flex-column justify-content-between position-relative">
                <div>
                  <div style={{ height: '160px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={blog.img?.startsWith('data:') || blog.img?.startsWith('http') ? blog.img : `/images/${blog.img}`}
                      alt={blog.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      className="badge position-absolute"
                      style={{ top: '12px', left: '12px', background: '#0EA5E9', fontSize: '0.75rem' }}
                    >
                      {blog.category}
                    </span>
                    <button
                      className={`badge position-absolute border-0 cursor-pointer ${blog.status === 'Published' ? 'bg-success' : 'bg-warning text-dark'}`}
                      style={{ top: '12px', right: '12px', fontSize: '0.75rem', padding: '6px 10px' }}
                      onClick={() => toggleBlogStatus(blog.id)}
                      title="Click to toggle Published / Draft status"
                    >
                      <i className={`fas fa-${blog.status === 'Published' ? 'check-circle' : 'clock'} me-1`}></i>
                      {blog.status}
                    </button>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center gap-2 mb-2 text-muted small" style={{ fontSize: '0.78rem' }}>
                      <span><i className="fas fa-user text-primary me-1"></i>{blog.author}</span>
                      <span>•</span>
                      <span><i className="fas fa-calendar me-1"></i>{blog.date}</span>
                      <span>•</span>
                      <span><i className="fas fa-clock me-1"></i>{blog.read}</span>
                    </div>
                    <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                      {blog.title}
                    </h5>
                    <p style={{ color: '#64748B', fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {blog.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-3 pb-3 pt-2" style={{ borderTop: '1px solid #E2E8F0' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className={`btn btn-sm ${blog.status === 'Published' ? 'btn-outline-secondary' : 'btn-outline-success'} py-1 px-2`}
                      style={{ fontSize: '0.78rem' }}
                      onClick={() => toggleBlogStatus(blog.id)}
                    >
                      {blog.status === 'Published' ? 'Unpublish' : 'Publish Live'}
                    </button>
                    <div className="d-flex gap-1">
                      <button className="btn btn-sm btn-outline-info" onClick={() => handleOpenEdit(blog)} title="Edit Article">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(blog.id, blog.title)} title="Delete Article">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal Form (Add / Edit) ── */}
      {showModal && (
        <div className="modal modal-admin d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <i className={`fas fa-${editingId ? 'edit' : 'plus-circle'} text-accent me-2`}></i>
                  {editingId ? 'Edit Blog Article' : 'Add New Blog Article'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Article Title</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="e.g. Top 10 Hidden Gems in Pakistan 2026"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="e.g. Destinations, Travel Tips"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Author Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="e.g. Sarah Miles"
                        value={formData.author}
                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Read Time</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. 5 min read"
                        value={formData.read}
                        onChange={e => setFormData({ ...formData, read: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Featured Cover Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control mb-2"
                      onChange={e => {
                        const file = e.target.files[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => setFormData(prev => ({ ...prev, img: reader.result }))
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                    <small className="text-muted d-block mb-1">Or enter image filename/URL:</small>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="gal-travel.jpg or dest-bali.jpg or https://..."
                      value={formData.img}
                      onChange={e => setFormData({ ...formData, img: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Publication Status</label>
                    <select
                      className="form-select"
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Published">Published (Live on Public Website)</option>
                      <option value="Draft">Draft (Hidden from Public Website)</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Article Content / Excerpt</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      required
                      placeholder="Write the summary or full article text here..."
                      value={formData.excerpt}
                      onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn text-white" style={{ background: '#0EA5E9', fontWeight: 600 }}>
                    <i className="fas fa-save me-1"></i> {editingId ? 'Save Changes' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
