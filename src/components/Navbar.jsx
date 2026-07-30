import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/packages', label: 'Packages' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blog', label: 'Blog' },
  { to: '/faq', label: 'FAQ' },
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
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
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
            
            {/* Login / User Profile */}
            {!currentUser ? (
              <li className="nav-item">
                <Link className="nav-link nav-login-btn" to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i>Login
                </Link>
              </li>
            ) : (
              <li className="nav-item user-dropdown">
                <button
                  className="nav-link nav-user-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <div className="user-avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <span className="user-name">{currentUser.name}</span>
                  <span className={`user-role ${currentUser.role}`}>
                    {currentUser.role}
                  </span>
                  <i className={`fas fa-chevron-${userDropdownOpen ? 'up' : 'down'} ms-1`}></i>
                </button>
                
                {userDropdownOpen && (
                  <div className="user-dropdown-menu">
                    {isAdmin && (
                      <Link to="/admin" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                        <i className="fas fa-tachometer-alt"></i>
                        Admin Dashboard
                      </Link>
                    )}
                    <Link to="/my-bookings" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                      <i className="fas fa-suitcase"></i>
                      My Bookings
                    </Link>
                    <Link to="/contact" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                      <i className="fas fa-headset"></i>
                      Support
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
            
            {/* Book Now */}
            <li className="nav-item">
              <Link className="nav-link nav-book-btn" to="/contact">
                <i className="fas fa-paper-plane me-1"></i>Book Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
