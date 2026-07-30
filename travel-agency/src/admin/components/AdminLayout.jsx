import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import '../admin.css'

export default function AdminLayout() {
  const { logoutAdmin, clearAllData } = useAdmin()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Automatically close mobile sidebar on navigation
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const handleLogout = () => { logoutAdmin(); navigate('/admin/login') }
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className={`admin-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* ── Overlay Backdrop for Mobile ── */}
      <div 
        className={`admin-backdrop ${sidebarOpen ? 'show' : ''}`} 
        onClick={closeSidebar} 
      />

      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-brand justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="admin-brand-icon"><i className="fas fa-shield-alt"></i></div>
            <div className="admin-brand-text">
              Wander<span>Lux</span>
              <small style={{ fontSize: '0.65rem', color: '#0EA5E9', display: 'block' }}>ADMIN PORTAL</small>
            </div>
          </div>
          <button 
            className="admin-sidebar-close-btn d-lg-none" 
            onClick={closeSidebar}
            aria-label="Close Sidebar"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <ul className="admin-menu">
          <li className="admin-menu-section">Main Management</li>
          <li className="admin-menu-item">
            <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
              <i className="fas fa-chart-pie"></i> Overview Dashboard
            </NavLink>
          </li>
          <li className="admin-menu-item">
            <NavLink to="/admin/tours" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
              <i className="fas fa-route"></i> Tour Packages
            </NavLink>
          </li>
          <li className="admin-menu-item">
            <NavLink to="/admin/destinations" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
              <i className="fas fa-map-marked-alt"></i> Destinations
            </NavLink>
          </li>
          <li className="admin-menu-item">
            <NavLink to="/admin/categories" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
              <i className="fas fa-tags"></i> Tour Categories
            </NavLink>
          </li>
          <li className="admin-menu-item">
            <NavLink to="/admin/bookings" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
              <i className="fas fa-calendar-check"></i> Bookings Lifecycle
            </NavLink>
          </li>
          <li className="admin-menu-item">
            <NavLink to="/admin/customers" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
              <i className="fas fa-user-shield"></i> Customer CRM
            </NavLink>
          </li>
          <li className="admin-menu-section mt-3">Website Link</li>
          <li className="admin-menu-item">
            <Link to="/" target="_blank" rel="noopener noreferrer" onClick={closeSidebar}>
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
          <div className="d-flex align-items-center gap-2">
            <button 
              className="admin-hamburger-btn d-lg-none me-2" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Sidebar Menu"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="admin-search-wrap">
              <i className="fas fa-search"></i>
              <input type="text" className="admin-search-input" placeholder="Search tours, bookings..." />
            </div>
          </div>

          <div className="admin-profile">
            <button 
              className="btn btn-sm btn-outline-danger px-2 px-sm-3" 
              style={{ borderRadius: '8px', fontWeight: 500 }}
              onClick={() => { if (window.confirm('Clear all demo data? This will give you a completely clean workspace.')) clearAllData() }}
              title="Clear all demo data"
            >
              <i className="fas fa-trash-alt me-1"></i> <span className="d-none d-sm-inline">Clear Demo Data</span><span className="d-inline d-sm-none">Clear</span>
            </button>
            <Link to="/admin/tours" className="btn btn-sm text-white px-2 px-sm-3" style={{ background: '#0EA5E9', borderRadius: '8px', fontWeight: 500 }}>
              <i className="fas fa-plus me-1"></i> <span className="d-none d-sm-inline">New Package</span><span className="d-inline d-sm-none">New</span>
            </Link>
            <div className="d-flex align-items-center gap-2 ms-1 ms-sm-2">
              <div className="admin-avatar">SA</div>
              <div className="text-start d-none d-md-block" style={{ fontSize: '0.85rem' }}>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>Soman Ashraf</div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Administrator</div>
              </div>
              <button className="btn btn-sm btn-outline-danger ms-1 ms-sm-2 p-1 px-2" onClick={handleLogout} title="Logout">
                <i className="fas fa-sign-out-alt"></i> <span className="d-none d-md-inline ms-1">Logout</span>
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

