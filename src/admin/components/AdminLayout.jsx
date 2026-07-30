import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import '../admin.css'

export default function AdminLayout() {
  const { logoutAdmin, clearAllData } = useAdmin()
  const navigate = useNavigate()

  const handleLogout = () => { logoutAdmin(); navigate('/admin/login') }

  return (
    <div className="admin-wrapper">
      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-icon"><i className="fas fa-shield-alt"></i></div>
          <div className="admin-brand-text">
            Wander<span>Lux</span>
            <small style={{ fontSize: '0.65rem', color: '#0EA5E9', display: 'block' }}>ADMIN PORTAL</small>
          </div>
        </div>

        <ul className="admin-menu">
          <li className="admin-menu-section">Main Management</li>
          <li className="admin-menu-item">
            <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-chart-pie"></i> Overview Dashboard
            </NavLink>
          </li>
          <li className="admin-menu-item">
            <NavLink to="/admin/tours" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-route"></i> Tour Packages
            </NavLink>
          </li>
          <li className="admin-menu-item">
            <NavLink to="/admin/destinations" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-map-marked-alt"></i> Destinations
            </NavLink>
          </li>
          <li className="admin-menu-item">
            <NavLink to="/admin/categories" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-tags"></i> Tour Categories
            </NavLink>
          </li>
          <li className="admin-menu-item">
            <NavLink to="/admin/bookings" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-calendar-check"></i> Bookings Lifecycle
            </NavLink>
          </li>
          <li className="admin-menu-item">
            <NavLink to="/admin/customers" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-user-shield"></i> Customer CRM
            </NavLink>
          </li>
          <li className="admin-menu-section mt-3">Website Link</li>
          <li className="admin-menu-item">
            <Link to="/" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-external-link-alt"></i> View Public Website
            </Link>
          </li>
        </ul>

        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', color: '#64748B' }}>
          <i className="fas fa-circle text-success me-1" style={{ fontSize: '0.6rem' }}></i> System Online v2.4
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-search-wrap">
            <i className="fas fa-search"></i>
            <input type="text" className="admin-search-input" placeholder="Search tours, bookings, customers..." />
          </div>
          <div className="admin-profile">
            <button className="btn btn-sm btn-outline-danger px-3 me-2" style={{ borderRadius: '8px', fontWeight: 500 }}
              onClick={() => { if (window.confirm('Clear all demo data? This will give you a completely clean workspace.')) clearAllData() }}
              title="Clear all demo data">
              <i className="fas fa-trash-alt me-1"></i> Clear Demo Data
            </button>
            <Link to="/admin/tours" className="btn btn-sm text-white px-3" style={{ background: '#0EA5E9', borderRadius: '8px', fontWeight: 500 }}>
              <i className="fas fa-plus me-1"></i> New Package
            </Link>
            <div className="d-flex align-items-center gap-2 ms-3">
              <div className="admin-avatar">SA</div>
              <div className="text-start d-none d-md-block" style={{ fontSize: '0.85rem' }}>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>Soman Ashraf</div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Administrator</div>
              </div>
              <button className="btn btn-sm btn-outline-danger ms-2" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-1"></i> Logout
              </button>
            </div>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
