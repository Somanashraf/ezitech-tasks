import React, { useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import { useNavigate, Link } from 'react-router-dom'

export default function AdminLogin() {
  const { loginAdmin } = useAdmin()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@wanderlux.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = loginAdmin(email, password)
    if (result.success) navigate('/admin')
    else setError(result.message)
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', fontFamily: "'Inter', sans-serif" }}>
      <div className="card border-0 shadow-lg p-4" style={{ maxWidth: '440px', width: '100%', borderRadius: '16px', background: '#FFFFFF' }}>
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center mb-3"
            style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', borderRadius: '14px', color: '#fff', fontSize: '1.6rem' }}>
            <i className="fas fa-user-shield"></i>
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0F172A' }}>WanderLux Admin Portal</h3>
          <p className="text-muted" style={{ fontSize: '0.88rem' }}>Secure portal access for agency administrators.</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2" style={{ fontSize: '0.85rem' }}>
            <i className="fas fa-exclamation-circle me-1"></i>{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: '#334155' }}>Administrator Email</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0"><i className="fas fa-envelope text-muted"></i></span>
              <input type="email" className="form-control bg-light border-start-0" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: '#334155' }}>Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0"><i className="fas fa-lock text-muted"></i></span>
              <input type="password" className="form-control bg-light border-start-0" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn w-100 text-white py-2 mb-3"
            style={{ background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', fontWeight: 600, borderRadius: '8px', fontSize: '0.95rem' }}>
            <i className="fas fa-sign-in-alt me-2"></i>Sign In to Dashboard
          </button>
        </form>

        <div className="p-3 bg-light rounded text-center mb-3" style={{ fontSize: '0.8rem', color: '#64748B' }}>
          <strong>Default Admin Demo Credentials:</strong><br />
          Email: <code style={{ color: '#0EA5E9' }}>admin@wanderlux.com</code><br />
          Password: <code style={{ color: '#0EA5E9' }}>admin123</code>
        </div>

        <div className="text-center">
          <Link to="/" style={{ fontSize: '0.85rem', color: '#0EA5E9', textDecoration: 'none', fontWeight: 500 }}>
            <i className="fas fa-arrow-left me-1"></i>Back to Main Public Website
          </Link>
        </div>
      </div>
    </div>
  )
}
