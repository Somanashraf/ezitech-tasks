import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/packages', label: 'Packages' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, logout, isAdmin } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const handleLogout = () => {
    logout()
    setUserDropdownOpen(false)
    navigate('/')
  }

  return (
    <nav
      className={`navbar navbar-custom navbar-expand-lg${scrolled ? ' scrolled' : ''}`}
      id="mainNavbar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className="brand-icon" aria-hidden="true">
            <i className="fas fa-globe-americas"></i>
          </div>
          <span className="brand-text">Wander<span>Lux</span></span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`}>
          {/* CENTER: Navigation Links */}
          <ul className="navbar-nav mx-auto align-items-lg-center my-2 my-lg-0">
            {navLinks.map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <Link
                  className={`nav-link${location.pathname === to ? ' active' : ''}`}
                  to={to}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT: Action Buttons */}
          <div className="nav-actions d-flex flex-column flex-lg-row align-items-lg-center gap-2 mt-2 mt-lg-0">
            {!currentUser ? (
              <Link className="nav-link nav-login-btn" to="/login">
                <i className="fas fa-sign-in-alt me-1"></i>Login
              </Link>
            ) : (
              <div className="user-dropdown">
                <button
                  className="nav-link nav-user-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                  aria-label="User menu"
                >
                  <div className="user-avatar">
                    <i className="fas fa-user-check"></i>
                  </div>
                  <span className="user-name">{currentUser.name}</span>
                  <span className={`user-role ${currentUser.role}`}>
                    {currentUser.role}
                  </span>
                  <i className={`fas fa-chevron-${userDropdownOpen ? 'up' : 'down'} user-chevron`}></i>
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown-menu">
                    <div className="dropdown-user-header px-3 py-2 border-bottom border-secondary border-opacity-25 mb-1">
                      <div className="fw-bold text-white small">{currentUser.name}</div>
                      <div className="text-white-50" style={{ fontSize: '0.75rem' }}>{currentUser.email || 'Admin Account'}</div>
                    </div>
                    {isAdmin && (
                      <Link to="/admin" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                        <i className="fas fa-chart-line text-accent"></i>
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <Link to="/contact" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                      <i className="fas fa-headset text-info"></i>
                      <span>Support & Help</span>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            <Link className="nav-link nav-book-btn" to="/contact">
              <i className="fas fa-paper-plane me-1"></i>Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

